import { el, announce, setPageTitle } from './dom.js';
import { searchEntries, normalize } from './reference-search.js';
import { markdownFragment } from './markdown.js';
import { getExample } from './content.js';

export const categories = { all: 'Alle', html: 'HTML', css: 'CSS', javascript: 'JavaScript', dom: 'DOM / Web API', accessibility: 'Tilgjengelighet' };
export function configureCategories(map) {
  if (!map || !Object.keys(map).length) return;
  for (const key of Object.keys(categories)) delete categories[key];
  Object.assign(categories, map);
}
let lastSearchRoute = '#/reference', lastEntry = '';
export async function renderReference(main, route, { entries, signal, focus }) {
  const page = el('div', { class: 'reference-page' });
  if (route.id) {
    const entry = entries.find(e => e.id === route.id);
    if (!entry) throw new Error('Oppføringen finnes ikke. Åpne ordlisten og søk på nytt.');
    lastEntry = entry.id;
    const heading = el('h1', { tabindex: '-1' }, entry.title);
    const workshopHost = el('section', { hidden: true, 'aria-label': 'Kodeverksted' });
    let playground, opening = false;
    const tryButton = el('button', { class: 'primary', onclick: async () => {
      if (playground || opening) return;
      opening = true; tryButton.disabled = true; workshopHost.hidden = false; workshopHost.textContent = 'Åpner kodeverksted …';
      try {
        const [{ mountPlayground }, files] = await Promise.all([import('./playground.js'), entry.example ? getExample(entry.example, signal) : Promise.resolve(entry.files)]);
        if (signal.aborted) return;
        playground = await mountPlayground(workshopHost, { id: `reference-${entry.id}`, files, title: entry.title, signal, onClose: () => { playground?.destroy(); playground = null; workshopHost.hidden = true; tryButton.focus(); } });
        if (!signal.aborted) workshopHost.scrollIntoView({ block: 'start' });
      } catch (error) { if (error.name !== 'AbortError') workshopHost.textContent = 'Eksempelet kunne ikke åpnes. Prøv igjen.'; }
      finally { opening = false; tryButton.disabled = false; }
    } }, 'Prøv selv');
    const copyStatus = el('span', { role: 'status' });
    const copy = el('button', { onclick: async () => { try { await navigator.clipboard.writeText(entry.syntax); copyStatus.textContent = 'Koden er kopiert.'; } catch { copyStatus.textContent = 'Kopiering er ikke tilgjengelig. Marker koden og kopier med Ctrl+C.'; } } }, 'Kopier syntaks');
    const detail = el('article', { class: 'reference-detail' }, el('a', { href: lastSearchRoute }, '← Tilbake til ordlisten'), el('p', { class: 'eyebrow' }, `${categories[entry.category]} / ${entry.type}`), heading,
      el('p', { class: 'lesson-intro' }, entry.short), markdownFragment(entry.explanation, entries), el('h2', {}, 'Syntaks og eksempel'), el('pre', { tabindex: '0', 'aria-label': 'Kodeeksempel' }, el('code', {}, entry.syntax)),
      el('div', { class: 'workshop-actions' }, copy, tryButton, copyStatus), el('h2', {}, 'Når bruker jeg dette?'), el('p', {}, entry.when), el('h2', {}, 'Vanlige feil'), el('p', {}, entry.mistakes), el('h2', {}, 'Se også'),
      el('div', { class: 'related' }, (entry.related || []).map(id => entries.find(e => e.id === id)).filter(Boolean).map(e => el('a', { href: `#/reference/${e.id}` }, e.title))),
      entry.lesson ? el('p', {}, el('a', { href: entry.lesson }, 'Gå til leksjonen →')) : null);
    page.append(detail, workshopHost); main.replaceChildren(page);
    setPageTitle(entry.title, 'Ordliste'); if (focus) heading.focus();
    return () => playground?.destroy();
  }
  let category = categories[route.query.get('category')] ? route.query.get('category') : 'all';
  let letter = route.query.get('letter') || '';
  const heading = el('h1', { tabindex: '-1' }, 'Et oppslagsverk ved siden av koden.');
  const search = el('input', { id: 'reference-search', type: 'search', placeholder: 'Prøv «.h2», «class inni class» eller «endre tekst»', autocomplete: 'off' });
  search.value = route.query.get('q') || '';
  const results = el('ul', { class: 'reference-list' });
  const overview = el('section', { class: 'category-overview', hidden: true, 'aria-label': 'Om emnet' });
  const count = el('p', { role: 'status' });
  const filters = el('div', { class: 'filters', role: 'group', 'aria-label': 'Kategori' });
  const alphabet = el('div', { class: 'alphabet', role: 'group', 'aria-label': 'Alfabetisk indeks' });
  const filterButtons = {}, letterButtons = {};
  for (const [key, name] of Object.entries(categories)) {
    filterButtons[key] = el('button', { onclick: () => { category = key; letter = ''; update(); } }, name); filters.append(filterButtons[key]);
  }
  for (const key of ['', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ']) {
    letterButtons[key] = el('button', { 'aria-label': key ? `Vis oppføringer på ${key}` : 'Vis alle bokstaver', onclick: () => { letter = key; update(); } }, key || 'A–Å'); alphabet.append(letterButtons[key]);
  }
  function update() {
    const found = searchEntries(entries, search.value, category, letter);
    const introduction = category !== 'all'
      ? entries.find(entry => entry.overviewFor === category)
      : entries.find(entry => entry.overviewFor && [entry.title, ...(entry.aliases || [])].some(alias => normalize(alias) === normalize(search.value)));
    overview.hidden = !introduction;
    overview.replaceChildren();
    if (introduction) {
      overview.append(el('p', { class: 'eyebrow' }, 'Begynn med helheten'), el('h2', {}, `Hva er ${introduction.title}?`), el('p', {}, introduction.short),
        el('a', { href: `#/reference/${introduction.id}` }, `Les hele forklaringen om ${introduction.title} →`));
    }
    count.textContent = `${found.length} ${found.length === 1 ? 'treff' : 'treff'}${search.value ? ` for «${search.value}»` : ` i ${categories[category].toLowerCase()}`}`;
    for (const [key, button] of Object.entries(filterButtons)) button.setAttribute('aria-pressed', String(key === category));
    for (const [key, button] of Object.entries(letterButtons)) button.setAttribute('aria-pressed', String(key === letter));
    results.replaceChildren(...found.map(entry => el('li', {}, el('a', { class: 'reference-card', href: `#/reference/${entry.id}`, 'data-entry': entry.id }, el('span', { class: 'category' }, categories[entry.category]), el('h2', {}, entry.title), el('code', {}, entry.displayCode), el('p', {}, entry.short)))));
    if (!found.length) results.append(el('li', {}, 'Ingen treff. Prøv et kortere søk, velg Alle eller fjern bokstavfilteret.'));
    const params = new URLSearchParams(); if (search.value) params.set('q', search.value); if (category !== 'all') params.set('category', category); if (letter) params.set('letter', letter);
    lastSearchRoute = `#/reference${params.size ? `?${params}` : ''}`;
    history.replaceState(null, '', lastSearchRoute);
  }
  search.oninput = update;
  page.append(el('p', { class: 'eyebrow' }, 'Ordliste / Cheat sheet'), heading, el('p', { class: 'lesson-intro' }, 'Fra en glemt tagg til et spørsmål med egne ord. Finn forklaringen, se koden og prøv selv.'),
    el('div', { class: 'reference-controls' }, el('label', { class: 'search-label', for: 'reference-search' }, 'Hva lurer du på?'), search, filters, alphabet), overview, count, results);
  main.replaceChildren(page); update(); setPageTitle('Ordliste / Cheat sheet');
  if (focus) {
    const previous = [...results.querySelectorAll('[data-entry]')].find(a => a.dataset.entry === lastEntry);
    (previous || heading).focus();
  }
  return () => {};
}
