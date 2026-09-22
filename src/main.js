import './styles/main.css';
import { el, setupDialog, configureSite, setPageTitle } from './core/dom.js';
import { getFile } from './core/content.js';
import { parseRoute, findLesson, firstRoute, routePath } from './core/router.js';
import { configureStorage, read, clear } from './core/storage.js';
import { createGlossary } from './core/glossary.js';
import { renderLesson } from './core/lesson.js';
import { renderReference, configureCategories } from './core/reference.js';

const main = document.querySelector('#main');
let destroyView = () => {}, controller, initial = true, manifest, entries;
const settings = setupDialog(document.querySelector('#settings-dialog'));
document.querySelector('#settings-button').onclick = () => settings.open();
document.querySelector('#clear-data').onclick = () => {
  const success = clear(); document.querySelector('#clear-status').textContent = success ? 'Lokale innstillinger, fremdrift og kode er slettet.' : 'Nettleseren tillot ikke sletting.';
  if (success) { document.querySelectorAll('.focus-mode').forEach(n => n.classList.remove('focus-mode')); }
};
document.querySelector('.skip-link').onclick = event => { event.preventDefault(); main.focus(); main.scrollIntoView({ block: 'start' }); };
function errorView(error) {
  const heading = el('h1', { tabindex: '-1' }, 'Vi fant ikke innholdet');
  main.replaceChildren(el('div', { class: 'error-page' }, heading, el('p', {}, error.message), el('a', { class: 'button', href: manifest ? firstRoute(manifest) : '#/' }, 'Til første leksjon'), el('button', { onclick: () => location.reload() }, 'Prøv igjen')));
  heading.focus(); setPageTitle('Innhold ikke tilgjengelig');
}
async function navigate() {
  controller?.abort(); destroyView(); destroyView = () => {}; controller = new AbortController();
  const localController = controller;
  const route = parseRoute(location.hash);
  if (route.kind === 'home') {
    const saved = read('last-route', null);
    const next = saved && findLesson(manifest, parseRoute(saved)) ? saved : firstRoute(manifest);
    history.replaceState(null, '', next); return navigate();
  }
  const options = { entries, signal: localController.signal, focus: !initial };
  document.querySelector('#main-nav').replaceChildren(...manifest.sections.map(section => {
    const track = section.tracks.find(t => t.id === (route.section === section.id ? route.track : read(`track:${section.id}`, ''))) || section.tracks[0];
    return el('a', { href: routePath(section.id, track.id, track.lessons[0].id), 'aria-current': route.section === section.id ? 'page' : null }, section.title);
  }), el('a', { href: '#/reference', 'aria-current': route.kind === 'reference' ? 'page' : null }, 'Ordliste / Cheat sheet'));
  main.setAttribute('aria-busy', 'true');
  try {
    let cleanup;
    if (route.kind === 'reference') cleanup = await renderReference(main, route, options);
    else {
      const found = findLesson(manifest, route);
      if (!found) throw new Error('Denne lenken peker til en leksjon som ikke finnes. Velg en seksjon i menyen.');
      cleanup = await renderLesson(main, found, options);
    }
    if (localController.signal.aborted) { cleanup?.(); return; }
    destroyView = cleanup || (() => {}); initial = false;
    if (route.kind !== 'reference' || route.id) window.scrollTo(0, 0);
  } catch (error) { if (error.name !== 'AbortError' && !localController.signal.aborted) errorView(error); }
  finally { if (controller === localController) main.removeAttribute('aria-busy'); }
}
async function boot() {
  try {
    manifest = await getFile('content/manifest.json', undefined, true);
    configureStorage(manifest.id);
    if (manifest.title) configureSite(manifest.title);
    const referenceManifest = await getFile(manifest.reference, undefined, true);
    configureCategories(referenceManifest.categories);
    entries = (await Promise.all(referenceManifest.files.map(file => getFile(file, undefined, true)))).flat();
    createGlossary(entries);
    window.addEventListener('hashchange', navigate);
    window.addEventListener('pagehide', () => { controller?.abort(); destroyView(); });
    await navigate();
  } catch (error) { errorView(error); }
}
boot();
