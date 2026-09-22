import { el } from '../core/dom.js';
export function mount(host) {
  const padding = el('input', { type: 'range', min: '0', max: '40', value: '16', 'aria-label': 'Padding i piksler' });
  const value = el('output', {}, '16 px');
  const content = el('div', { class: 'content' }, 'Innhold');
  const border = el('div', { class: 'border' }, 'padding', content);
  const box = el('div', { class: 'box-demo' }, 'margin', border);
  const caption = el('p', { class: 'visual-caption' });
  host.append(box, el('label', {}, 'Padding', padding, value), caption);
  padding.oninput = () => { border.style.padding = `${padding.value}px`; value.textContent = `${padding.value} px`; };
  return { update(step) { caption.textContent = step.caption || 'Margin er utenfor kanten. Padding er mellom kanten og innholdet.'; border.style.outline = step.highlight === 'padding' ? '3px solid #174f42' : ''; }, destroy() {} };
}
