import { el, setupDialog } from './dom.js';
export function createGlossary(entries) {
  const dialog = document.querySelector('#glossary-dialog');
  const control = setupDialog(dialog);
  const handler = event => {
    const trigger = event.target.closest('[data-term]');
    const entry = trigger && entries.find(e => e.id === trigger.dataset.term);
    if (!entry) return;
    dialog.replaceChildren(el('div', { class: 'dialog-heading' }, el('h2', { id: 'glossary-title' }, entry.title), el('button', { 'data-close': '', 'aria-label': 'Lukk ordforklaring' }, '×')),
      entry.english ? el('p', { class: 'eyebrow', lang: 'en' }, entry.english) : null,
      el('p', {}, entry.short), el('pre', { tabindex: '0', 'aria-label': 'Kodeeksempel' }, el('code', {}, entry.syntax)),
      el('a', { href: `#/reference/${entry.id}`, onclick: () => control.close() }, 'Les mer i ordlisten →'));
    control.open(trigger);
  };
  document.addEventListener('click', handler);
  return { destroy() { document.removeEventListener('click', handler); } };
}
