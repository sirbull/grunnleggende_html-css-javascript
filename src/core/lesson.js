import { el, announce, setPageTitle } from './dom.js';
import { getFile, getExample, parseSteps, includeExample } from './content.js';
import { markdownFragment } from './markdown.js';
import { routePath } from './router.js';
import { createReading } from './reading.js';
import { mountSpeech } from './speech.js';
import { loadVisualization } from '../visualizations/registry.js';
import { read, write } from './storage.js';

export async function renderLesson(main, context, { entries, signal, focus }) {
  const { section, track, lesson, index } = context;
  const [source, files, mountVisual] = await Promise.all([getFile(lesson.content, signal), getExample(lesson.example, signal), loadVisualization(lesson.visualization)]);
  if (signal.aborted) return () => {};
  const stepData = parseSteps(source);
  let reading, visual, playground, opening = false;
  const title = el('h1', { tabindex: '-1' }, lesson.title);
  const sidebar = el('aside', { class: 'sidebar', 'aria-label': 'Kursnavigasjon' });
  const selector = el('select', { id: 'track-select' }, section.tracks.map(t => el('option', { value: t.id }, t.title)));
  selector.value = track.id;
  selector.onchange = () => { const next = section.tracks.find(t => t.id === selector.value); location.hash = routePath(section.id, next.id, next.lessons[0].id); };
  const done = read('completed', []);
  const completed = Array.isArray(done) ? done : [];
  const list = el('ol', { class: 'lesson-list' }, track.lessons.map((item, i) => el('li', {}, el('a', { href: routePath(section.id, track.id, item.id), 'aria-current': item.id === lesson.id ? 'page' : null }, el('span', { class: 'lesson-number', 'aria-hidden': 'true' }, completed.includes(item.id) ? '✓' : String(i + 1).padStart(2, '0')), el('span', {}, item.title, completed.includes(item.id) ? el('span', { class: 'sr-only' }, ', fullført') : null)))));
  const details = el('details', { open: innerWidth > 950 ? true : null }, el('summary', {}, `${section.title} · ${track.title}`), el('label', { for: 'track-select' }, 'Velg nivå'), selector, el('nav', { 'aria-label': 'Leksjoner' }, list));
  sidebar.append(details, el('div', { class: 'sidebar-note' }, el('p', {}, 'Du lærer best når du prøver selv.'), el('p', {}, 'Les forklaringen, se eksempelet og gjør koden til din egen.'), el('a', { href: '#/reference' }, 'Slå opp et fagord →')));
  const toolbar = el('div', { class: 'reading-toolbar', 'aria-label': 'Leseverktøy' });
  const article = el('article', { class: 'article', tabindex: '0', 'aria-label': `Les ${lesson.title}. Bruk pil opp og ned for å bytte lesesteg.` });
  article.classList.toggle('focus-mode', read('focus', false) === true);
  const focusButton = el('button', { 'aria-pressed': String(article.classList.contains('focus-mode')), onclick: () => {
    const enabled = !article.classList.contains('focus-mode'); article.classList.toggle('focus-mode', enabled); focusButton.setAttribute('aria-pressed', String(enabled)); write('focus', enabled);
  } }, 'Fokusmodus');
  toolbar.append(focusButton);
  const speech = mountSpeech(toolbar, () => reading);
  stepData.forEach((step, i) => {
    const element = el('section', { class: 'reading-step', id: `step-${step.id}`, 'data-step': step.id }, el('span', { class: 'step-label' }, `Steg ${String(i + 1).padStart(2, '0')} / ${String(stepData.length).padStart(2, '0')}`));
    element.append(markdownFragment(includeExample(step.markdown, files), entries)); article.append(element);
  });
  const visualHost = el('div', { class: 'visual-content', tabindex: '0', 'aria-label': 'Visuelt eksempel og forklaring' });
  const count = el('span');
  const workshopHost = el('section', { hidden: true, 'aria-label': 'Kodeverksted' });
  const openWorkshop = el('button', { class: 'primary', onclick: async () => {
    if (opening || playground) { workshopHost.scrollIntoView({ block: 'start' }); return; }
    opening = true; openWorkshop.disabled = true; workshopHost.hidden = false; workshopHost.textContent = 'Åpner kodeverksted …';
    try {
      const { mountPlayground } = await import('./playground.js');
      if (signal.aborted) return;
      playground = await mountPlayground(workshopHost, { id: lesson.id, files, title: lesson.title, signal, onClose: () => { playground?.destroy(); playground = null; workshopHost.hidden = true; openWorkshop.focus(); } });
      if (!signal.aborted) workshopHost.scrollIntoView({ block: 'start' });
    } catch { workshopHost.textContent = 'Kodeverkstedet kunne ikke åpnes. Prøv igjen.'; }
    finally { opening = false; openWorkshop.disabled = false; }
  } }, 'Prøv selv i kodeverkstedet ↗');
  const panel = el('aside', { class: 'visual-panel', 'aria-label': 'Visuell forklaring' }, el('div', { class: 'panel-heading' }, el('h2', {}, 'SE DET I PRAKSIS'), count), visualHost,
    el('div', { class: 'workshop-launch' }, openWorkshop, el('p', {}, 'Endre koden. Se hva som skjer.')));
  const previous = el('button', { onclick: () => reading.go(reading.active - 1) }, '↑ Forrige steg');
  const next = el('button', { onclick: () => reading.go(reading.active + 1) }, 'Neste steg ↓');
  const complete = el('button', { 'aria-pressed': String(completed.includes(lesson.id)), onclick: () => {
    const saved = read('completed', []); const progress = new Set(Array.isArray(saved) ? saved : []);
    if (progress.has(lesson.id)) progress.delete(lesson.id); else progress.add(lesson.id);
    write('completed', [...progress]); complete.setAttribute('aria-pressed', String(progress.has(lesson.id))); complete.textContent = progress.has(lesson.id) ? '✓ Fullført' : 'Marker som fullført'; announce(progress.has(lesson.id) ? 'Leksjonen er markert som fullført.' : 'Fullføringsmerket er fjernet.');
  } }, completed.includes(lesson.id) ? '✓ Fullført' : 'Marker som fullført');
  const bottom = el('nav', { class: 'lesson-bottom', 'aria-label': 'Videre i kurset' }, index > 0 ? el('a', { href: routePath(section.id, track.id, track.lessons[index - 1].id), class: 'button' }, '← Forrige leksjon') : null, complete,
    index < track.lessons.length - 1 ? el('a', { href: routePath(section.id, track.id, track.lessons[index + 1].id), class: 'button primary' }, 'Neste leksjon →') : el('a', { href: '#/reference', class: 'button' }, 'Utforsk ordlisten →'));
  const body = el('div', { class: 'course-body' }, el('p', { class: 'eyebrow' }, `${section.title} / ${track.title}`), title, el('p', { class: 'lesson-intro' }, lesson.description),
    el('div', { class: 'meta-row' }, el('span', {}, `Leksjon ${index + 1} av ${track.lessons.length}`), el('span', {}, `${lesson.minutes || 5} min + egen øving`), el('span', {}, 'Les · se · prøv')),
    toolbar, el('div', { class: 'lesson-grid' }, article, panel), el('div', { class: 'step-controls' }, previous, next), workshopHost, bottom);
  main.replaceChildren(el('div', { class: 'course-shell' }, sidebar, body));
  visual = mountVisual(visualHost, { files });
  reading = createReading(article, i => { visual.update(stepData[i]); count.textContent = `${i + 1} / ${stepData.length}`; previous.disabled = i === 0; next.disabled = i === stepData.length - 1; });
  if (focus) title.focus();
  setPageTitle(lesson.title);
  write('last-route', location.hash); write(`track:${section.id}`, track.id);
  return () => { reading.destroy(); visual.destroy(); speech.destroy(); playground?.destroy(); };
}
