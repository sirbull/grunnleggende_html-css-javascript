import { el } from './dom.js';

const names = { html: 'HTML', css: 'CSS', js: 'JavaScript' };
let count = 0;

// Linjer i HTML-koden som svarer til stegets markering. Bare enkle velgere (tagg, #id, .klasse)
// oversettes; resultatfanen markerer uansett de samme elementene med den ekte velgeren.
function matcher(language, selector = '') {
  if (language !== 'html' || !selector) return null;
  const value = selector.trim();
  const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (/^[a-z][a-z0-9-]*$/i.test(value)) return new RegExp(`<${escape(value)}[\\s>/]`, 'i');
  if (/^#[\w-]+$/.test(value)) return new RegExp(`id=["']${escape(value.slice(1))}["']`);
  if (/^\.[\w-]+$/.test(value)) return new RegExp(`class=["'][^"']*\\b${escape(value.slice(1))}\\b`);
  return null;
}
function codeBlock(language, source, selector) {
  const pattern = matcher(language, selector);
  const code = el('code', { class: `language-${language}` });
  source.replace(/\n$/, '').split('\n').forEach((line, i, lines) => {
    code.append(pattern?.test(line) ? el('mark', { class: 'code-mark' }, line) : line, i < lines.length - 1 ? '\n' : '');
  });
  return el('pre', { tabindex: '0', 'aria-label': `${names[language]}-kode` }, code);
}

// Kode først, resultatet én fane unna. Én fane per språk eksempelet faktisk bruker, så en
// eventuell ekstra forklaring (DOM-tre, boksmodell, programflyt) som egen fane til slutt.
// Resultat og forklaring monteres først når de blir vist.
export function mountExample({ files, primary, step, mountResult, extra, onWorkshop }) {
  const id = `example-${++count}`;
  const languages = ['html', 'css', 'js'].filter(language => (files[language] || '').trim());
  const start = languages.includes(primary) ? primary : languages[0] || 'result';
  const tabs = {}, panes = {}, mounted = {};
  for (const language of languages) {
    // Kort synlig navn; skjermlesere hører «HTML-kode», som skiller fanen fra kodeverkstedets «HTML».
    tabs[language] = el('button', { type: 'button', role: 'tab', 'aria-label': `${names[language]}-kode` }, names[language]);
    panes[language] = el('div', { class: 'example-pane' }, codeBlock(language, files[language], step.highlight));
  }
  tabs.result = el('button', { type: 'button', role: 'tab' }, 'Resultat');
  panes.result = el('div', { class: 'example-pane example-result' });
  if (extra) {
    tabs.extra = el('button', { type: 'button', role: 'tab' }, extra.label);
    panes.extra = el('div', { class: 'example-pane example-extra' });
  }
  const order = Object.keys(tabs);
  for (const key of order) {
    Object.assign(tabs[key], { id: `${id}-${key}-tab`, onclick: () => select(key) });
    tabs[key].setAttribute('aria-controls', `${id}-${key}`);
    Object.assign(panes[key], { id: `${id}-${key}` });
    panes[key].setAttribute('role', 'tabpanel'); panes[key].setAttribute('aria-labelledby', `${id}-${key}-tab`);
  }
  let active = start;
  function select(key, focus = false) {
    active = key;
    for (const name of order) { tabs[name].setAttribute('aria-selected', String(name === key)); tabs[name].tabIndex = name === key ? 0 : -1; panes[name].hidden = name !== key; }
    if (key === 'result' && !mounted.result) { mounted.result = mountResult(panes.result, { files }); mounted.result.update(step); }
    if (key === 'extra' && !mounted.extra) { mounted.extra = extra.mount(panes.extra, { files, preview: false }); mounted.extra.update(step); }
    if (focus) tabs[key].focus();
  }
  const tablist = el('div', { class: 'example-tabs', role: 'tablist', 'aria-label': 'Vis kode eller resultat' }, order.map(key => tabs[key]));
  tablist.onkeydown = event => {
    const index = order.indexOf(active);
    const next = { ArrowRight: order[(index + 1) % order.length], ArrowLeft: order[(index + order.length - 1) % order.length], Home: order[0], End: order.at(-1) }[event.key];
    if (next) { event.preventDefault(); select(next, true); }
  };
  const element = el('div', { class: 'example no-speech' },
    el('div', { class: 'example-bar' }, tablist, el('button', { type: 'button', class: 'example-try', onclick: event => onWorkshop(event.currentTarget) }, 'Prøv selv', el('span', { class: 'sr-only' }, ' i kodeverkstedet'), el('span', { 'aria-hidden': 'true' }, ' ↗'))),
    order.map(key => panes[key]));
  select(start);
  return { element, destroy() { Object.values(mounted).forEach(visual => visual.destroy()); } };
}
