import './styles/main.css';
import { el, configureSite, setPageTitle } from './core/dom.js';
import { getFile } from './core/content.js';
import { parseRoute, findLesson, firstRoute, routePath } from './core/router.js';
import { configureStorage, read } from './core/storage.js';
import { createGlossary } from './core/glossary.js';
import { renderSection } from './core/section.js';
import { renderReference, configureCategories } from './core/reference.js';
import { createSpeech } from './core/speech.js';

const main = document.querySelector('#main');
let view = null, controller, initial = true, manifest, entries;
const speech = createSpeech();
document.querySelector('.skip-link').onclick = event => { event.preventDefault(); main.focus(); main.scrollIntoView({ block: 'start' }); };
function errorView(error) {
  const heading = el('h1', { tabindex: '-1' }, 'Vi fant ikke innholdet');
  main.replaceChildren(el('div', { class: 'error-page' }, heading, el('p', {}, error.message), el('a', { class: 'button', href: manifest ? firstRoute(manifest) : '#/' }, 'Til første leksjon'), el('button', { onclick: () => location.reload() }, 'Prøv igjen')));
  heading.focus(); setPageTitle('Innhold ikke tilgjengelig');
}
function sectionStart(section) {
  const saved = read(`last:${section.id}`, null);
  if (saved && findLesson(manifest, parseRoute(saved))?.section === section) return saved;
  return routePath(section.id, section.tracks[0].id, section.tracks[0].lessons[0].id);
}
async function navigate() {
  const route = parseRoute(location.hash);
  if (route.kind === 'home') {
    const saved = read('last-route', null);
    const next = saved && findLesson(manifest, parseRoute(saved)) ? saved : firstRoute(manifest);
    history.replaceState(null, '', next); return navigate();
  }
  document.querySelector('#main-nav').replaceChildren(...manifest.sections.map(section =>
    el('a', { href: route.section === section.id ? routePath(section.id, section.tracks[0].id, section.tracks[0].lessons[0].id) : sectionStart(section), 'aria-current': route.section === section.id ? 'page' : null }, section.title)
  ), el('a', { href: '#/reference', 'aria-current': route.kind === 'reference' ? 'page' : null }, 'Ordliste / Cheat sheet'));
  // Hele seksjonen er allerede på siden: en ny leksjon i samme seksjon er bare et hopp nedover.
  const found = route.kind === 'lesson' ? findLesson(manifest, route) : null;
  if (found && view?.section === found.section.id && view.goTo(found.lesson.id, found.track.id, { focus: true })) return;

  controller?.abort(); view?.destroy(); view = null; controller = new AbortController();
  const localController = controller;
  const options = { entries, signal: localController.signal, focus: !initial };
  main.setAttribute('aria-busy', 'true');
  try {
    let next;
    if (route.kind === 'reference') {
      const cleanup = await renderReference(main, route, options);
      next = { section: null, destroy: cleanup || (() => {}) };
      if (route.id) window.scrollTo(0, 0);
    } else {
      if (!found) throw new Error('Denne lenken peker til en leksjon som ikke finnes. Velg en seksjon i menyen.');
      const position = manifest.sections.indexOf(found.section), following = manifest.sections[position + 1];
      next = await renderSection(main, found.section, { ...options, speech, next: following ? { title: following.title, href: sectionStart(following) } : null });
      if (next && !localController.signal.aborted) next.goTo(found.lesson.id, found.track.id, { focus: !initial, initial: true });
    }
    if (localController.signal.aborted) { next?.destroy(); return; }
    view = next; initial = false;
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
    window.addEventListener('pagehide', () => { controller?.abort(); view?.destroy(); view = null; });
    await navigate();
  } catch (error) { errorView(error); }
}
boot();
