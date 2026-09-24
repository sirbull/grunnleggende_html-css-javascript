import { el, announce, setPageTitle, setupDialog } from './dom.js';
import { getFile, getExample, parseSteps, markExamples, EXAMPLE_TOKEN } from './content.js';
import { markdownFragment } from './markdown.js';
import { routePath } from './router.js';
import { createReading } from './reading.js';
import { mountExample } from './example.js';
import { loadVisualization } from '../visualizations/registry.js';
import { read, write } from './storage.js';

const pad = n => String(n).padStart(2, '0');

// Leksjonsteksten bruker ## for stegoverskrifter. På seksjonssiden ligger den under h1 (seksjon),
// h2 (nivå) og h3 (leksjon), så alle nivåer flyttes to hakk ned for et sammenhengende hierarki.
function demoteHeadings(fragment) {
  for (const heading of fragment.querySelectorAll('h1,h2,h3,h4')) {
    const next = document.createElement(`h${Math.min(6, Number(heading.tagName[1]) + 2)}`);
    next.append(...heading.childNodes); heading.replaceWith(next);
  }
}

// Dialogen lever utenfor #main og overlever ruteskift, så lytterne settes opp én gang.
let navControl;

// Hele seksjonen (for eksempel HTML) er én lang side. Hver leksjon starter med et tydelig
// leksjonshode, og lesepunktet holder adressefeltet og sidetittelen oppdatert mens man leser.
export async function renderSection(main, section, { entries, signal, next, speech }) {
  const items = section.tracks.flatMap(track => track.lessons.map((lesson, index) => ({ track, lesson, index })));
  // Resultatfanen viser bare resultatet. Koden står allerede i fanen ved siden av, så en ekstra
  // struktur- eller kodevisning under resultatet ville bare gjenta den.
  const [mountResult] = await Promise.all([loadVisualization('preview'), ...items.map(async item => {
    const [source, files, mountVisual] = await Promise.all([getFile(item.lesson.content, signal), getExample(item.lesson.example, signal), loadVisualization(item.lesson.visualization)]);
    Object.assign(item, { steps: parseSteps(source), files, mountVisual });
  })]);
  if (signal.aborted) return null;

  const done = read('completed', []);
  const completed = new Set(Array.isArray(done) ? done : []);
  const examples = [], stepLesson = [];
  let reading, workshop = null, current = -1;

  const heading = el('h1', { tabindex: '-1' }, section.title);
  const article = el('div', { class: 'article', role: 'region', tabindex: '0', 'aria-label': `Les ${section.title}. Bruk pil opp og ned for å bytte lesesteg.` });
  // Ny lagringsnøkkel: fokusmodus ble endret vesentlig 24.09.2026, så alle starter med den på igjen.
  article.classList.toggle('focus-mode', read('focus-mode', true) !== false);
  const focusButton = el('button', { type: 'button', class: 'focus-toggle', 'aria-pressed': String(article.classList.contains('focus-mode')), onclick: () => {
    const enabled = !article.classList.contains('focus-mode'); article.classList.toggle('focus-mode', enabled); focusButton.setAttribute('aria-pressed', String(enabled)); write('focus-mode', enabled);
  } }, 'Fokusmodus');
  // Toppmenyen scroller bort på en lang side. Opplesningsikonet flyttes derfor inn i den faste
  // leksjonslinjen mens seksjonen vises, ellers måtte man scrolle til toppen og miste lesepunktet.
  const headerTools = document.querySelector('#header-tools');
  const speechMenu = document.querySelector('.speech-menu');

  const navDialog = document.querySelector('#lesson-nav-dialog');
  navControl ||= setupDialog(navDialog);
  const crumb = el('span', { class: 'crumb-lesson' });
  const navButton = el('button', { type: 'button', class: 'nav-trigger', 'aria-haspopup': 'dialog', onclick: () => { fillNav(); navControl.open(navButton); } },
    el('span', { 'aria-hidden': 'true' }, '☰'), el('span', { class: 'crumb-label' }, 'Alle leksjoner'), crumb);

  async function openWorkshop(item, opener) {
    if (workshop?.item === item) { item.workshopHost.scrollIntoView({ block: 'start' }); return; }
    closeWorkshop();
    const state = workshop = { item, opener, playground: null };
    const host = item.workshopHost;
    host.hidden = false; host.textContent = 'Åpner kodeverksted …';
    try {
      const { mountPlayground } = await import('./playground.js');
      if (signal.aborted || workshop !== state) return;
      const playground = await mountPlayground(host, { id: item.lesson.id, files: item.files, title: item.lesson.title, signal, onClose: () => closeWorkshop(true) });
      if (workshop !== state) { playground.destroy(); return; }
      state.playground = playground;
      if (!signal.aborted) host.scrollIntoView({ block: 'start' });
    } catch { if (workshop === state) host.textContent = 'Kodeverkstedet kunne ikke åpnes. Prøv igjen.'; }
  }
  function closeWorkshop(returnFocus = false) {
    if (!workshop) return;
    const { item, playground, opener } = workshop; workshop = null;
    playground?.destroy(); item.workshopHost.hidden = true; item.workshopHost.replaceChildren();
    if (returnFocus && opener?.isConnected) opener.focus();
  }

  // Hovedspråket i seksjonen er fanen som vises først når et steg ikke selv peker på et språk.
  const primary = { css: 'css', javascript: 'js' }[section.id] || 'html';
  // Leksjoner med en egen forklaring utover selve resultatet får den som en ekstra fane.
  const extraLabels = { 'html-document': 'DOM-tre', 'box-model': 'Boksmodell', 'code-flow': 'Programflyt' };

  function lessonView(item, lessonIndex) {
    const { track, lesson, index } = item;
    const titleId = `title-${track.id}-${lesson.id}`;
    const title = el('h3', { class: 'lesson-title', id: titleId, tabindex: '-1' }, lesson.title);
    // Leksjonshodet er et stopp for piltastene. Første leksjon i et nivå scroller til nivåoverskriften.
    const header = el('header', { class: 'lesson-header reading-stop', 'data-scroll-to': index === 0 ? `track-${track.id}` : null },
      el('p', { class: 'lesson-file' }, el('span', { class: 'lesson-file-number', 'aria-hidden': 'true' }, pad(index + 1)), el('span', {}, `Leksjon ${index + 1} av ${track.lessons.length} · ${track.title}`)),
      title, el('p', { class: 'lesson-intro' }, lesson.description),
      el('p', { class: 'meta-row' }, el('span', {}, `${lesson.minutes || 5} min + egen øving`), el('span', {}, 'Les · se · prøv')));
    const node = el('article', { class: 'lesson', id: `lesson-${track.id}-${lesson.id}`, 'data-lesson': lesson.id, 'aria-labelledby': titleId }, header);
    item.steps.forEach((step, i) => {
      const text = el('div', { class: 'step-text' }, el('span', { class: 'step-label' }, `Steg ${pad(i + 1)} / ${pad(item.steps.length)}`));
      const fragment = markdownFragment(markExamples(step.markdown), entries);
      demoteHeadings(fragment);
      // Hvert steg har tekst i én kolonne og koden i den andre, med resultatet én fane unna.
      // Et :::example-direktiv i steget bestemmer hvilket språk som vises først.
      const languages = [];
      for (const p of fragment.querySelectorAll('p')) {
        const match = p.textContent.trim().match(EXAMPLE_TOKEN);
        if (match) { languages.push(match[1]); p.remove(); }
      }
      text.append(fragment);
      const extra = extraLabels[item.lesson.visualization] ? { label: extraLabels[item.lesson.visualization], mount: item.mountVisual } : null;
      const example = mountExample({ files: item.files, primary: languages[0] || primary, step, mountResult, extra, onWorkshop: opener => openWorkshop(item, opener) });
      examples.push(example);
      const visual = el('figure', { class: 'step-visual no-speech', 'aria-label': 'Kode og resultat' },
        el('p', { class: 'visual-label', 'aria-hidden': 'true' }, 'Kode og resultat'), example.element);
      // Tekstkolonnen bytter side annethvert steg.
      node.append(el('section', { class: `reading-step${i % 2 ? ' flip' : ''}${i === item.steps.length - 1 ? ' last-step' : ''}`, id: `step-${lesson.id}-${step.id}`, 'data-step': step.id }, text, visual));
      stepLesson.push(lessonIndex);
    });
    const complete = el('button', { type: 'button', 'aria-pressed': String(completed.has(lesson.id)), onclick: () => {
      const saved = read('completed', []); const progress = new Set(Array.isArray(saved) ? saved : []);
      if (progress.has(lesson.id)) progress.delete(lesson.id); else progress.add(lesson.id);
      write('completed', [...progress]); completed.clear(); progress.forEach(id => completed.add(id));
      complete.setAttribute('aria-pressed', String(progress.has(lesson.id))); complete.textContent = progress.has(lesson.id) ? '✓ Fullført' : 'Marker som fullført';
      announce(progress.has(lesson.id) ? 'Leksjonen er markert som fullført.' : 'Fullføringsmerket er fjernet.');
    } }, completed.has(lesson.id) ? '✓ Fullført' : 'Marker som fullført');
    const tryButton = el('button', { type: 'button', class: 'primary', onclick: event => openWorkshop(item, event.currentTarget) }, 'Prøv selv i kodeverkstedet ↗');
    item.workshopHost = el('section', { hidden: true, 'aria-label': `Kodeverksted: ${lesson.title}` });
    node.append(el('footer', { class: 'lesson-footer' }, el('p', {}, `Slutt på «${lesson.title}».`), el('div', { class: 'lesson-actions' }, tryButton, complete)), item.workshopHost);
    item.node = node; item.header = header; item.title = title; item.route = routePath(section.id, track.id, lesson.id);
    return node;
  }

  let lessonIndex = 0;
  section.tracks.forEach((track, t) => {
    const trackId = `track-${track.id}`;
    const trackNode = el('section', { class: 'track', 'aria-labelledby': trackId },
      el('h2', { class: 'track-title', id: trackId }, el('span', { class: 'track-level' }, `Nivå ${t + 1}`), ' ', track.title));
    track.lessons.forEach(() => { trackNode.append(lessonView(items[lessonIndex], lessonIndex)); lessonIndex++; });
    article.append(trackNode);
  });

  function fillNav() {
    navDialog.replaceChildren(
      el('div', { class: 'dialog-heading' }, el('h2', { id: 'lesson-nav-title' }, `${section.title}: alle leksjoner`), el('button', { 'data-close': '', 'aria-label': 'Lukk leksjonslisten' }, '×')),
      el('nav', { 'aria-label': 'Leksjoner' }, section.tracks.flatMap(track => [
        el('h3', { class: 'nav-track' }, track.title),
        el('ol', { class: 'lesson-list' }, items.filter(item => item.track === track).map((item, i) => el('li', {}, el('a', { href: item.route, 'aria-current': items[current] === item ? 'location' : null, onclick: event => {
          navControl.close();
          // Samme adresse gir ingen hashchange. Hopp likevel til starten av leksjonen.
          if (event.currentTarget.getAttribute('href') === location.hash) { event.preventDefault(); goTo(item.lesson.id, item.track.id, { focus: true }); }
        } }, el('span', { class: 'lesson-number', 'aria-hidden': 'true' }, completed.has(item.lesson.id) ? '✓' : pad(i + 1)), el('span', {}, item.lesson.title, completed.has(item.lesson.id) ? el('span', { class: 'sr-only' }, ', fullført') : null)))))
      ])),
      el('p', { class: 'nav-dialog-note' }, el('a', { href: '#/reference', onclick: () => navControl.close() }, 'Slå opp et fagord →')));
  }

  function setCurrent(index) {
    if (index === current) return;
    current = index; const item = items[index];
    items.forEach((other, i) => other.node.classList.toggle('current', i === index));
    crumb.textContent = `${item.track.title} · ${pad(item.index + 1)} ${item.lesson.title}`;
    if (location.hash !== item.route) history.replaceState(null, '', item.route);
    write('last-route', item.route); write(`last:${section.id}`, item.route);
    setPageTitle(item.lesson.title, section.title);
  }
  function goTo(lessonId, trackId, { focus = false, initial = false } = {}) {
    const index = items.findIndex(item => item.lesson.id === lessonId && item.track.id === trackId);
    if (index < 0) return false;
    const item = items[index];
    if (index === 0 && initial) window.scrollTo(0, 0);
    // Hopp fra leksjonslisten er alltid umiddelbare. En myk scroll over en lang side tar tid og
    // monterer alle visualiseringene på veien.
    else item.node.scrollIntoView({ block: 'start', behavior: 'instant' });
    reading.stopAt(item.header, false); setCurrent(index);
    if (focus) item.title.focus({ preventScroll: true });
    return true;
  }

  const nextLink = next ? el('a', { class: 'button primary', href: next.href }, `Videre til ${next.title} →`) : el('a', { class: 'button primary', href: '#/reference' }, 'Utforsk ordlisten →');
  const body = el('div', { class: 'course-body section-page' },
    el('header', { class: 'section-intro' }, el('p', { class: 'eyebrow' }, 'Seksjon'), heading,
      el('p', { class: 'lesson-intro' }, `${items.length} leksjoner på ${section.tracks.length} nivåer, samlet på én side. Scroll eller bruk pil opp og ned. Hver ny leksjon starter med et tydelig leksjonshode.`)),
    el('div', { class: 'lesson-bar' }, navButton, el('div', { class: 'lesson-tools' }, focusButton, speechMenu)),
    article,
    el('nav', { class: 'lesson-bottom', 'aria-label': 'Videre i kurset' }, el('p', {}, `Du har nådd slutten av ${section.title}.`), nextLink));
  main.replaceChildren(el('div', { class: 'course-shell' }, body));

  // Nærmeste lesesteg kan ligge i neste leksjon når man jobber i et høyt kodeverksted nederst i en
  // leksjon. Leksjonen som faktisk dekker lesepunktet vinner derfor over stegets leksjon.
  const lessonAtReadingLine = fallback => {
    const line = Math.min(innerHeight * .32, 250);
    const index = items.findIndex(item => { const rect = item.node.getBoundingClientRect(); return rect.top <= line && rect.bottom >= line; });
    return index < 0 ? fallback : index;
  };
  // Ved piltaster og hopp er steget valgt med vilje, og da gjelder stegets egen leksjon med en gang.
  reading = createReading(article, (i, chosen) => setCurrent(chosen ? stepLesson[i] : lessonAtReadingLine(stepLesson[i])));
  speech.attach(reading);
  return {
    section: section.id,
    goTo,
    focusHeading: () => heading.focus(),
    destroy() { navControl.close(); navDialog.replaceChildren(); speech.detach(); headerTools.append(speechMenu); reading.destroy(); closeWorkshop(); examples.forEach(e => e.destroy()); },
  };
}
