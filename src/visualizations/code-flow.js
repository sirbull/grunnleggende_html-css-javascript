import { el } from '../core/dom.js';
import { mountPreview } from '../core/preview.js';
export function mount(host, { files, preview: showPreview = true }) {
  const list = el('ol', { class: 'trace-list', 'aria-label': 'Steg i programmet' });
  const frame = showPreview && el('iframe', { class: 'preview-frame', sandbox: 'allow-scripts', title: 'Resultat av JavaScript-eksempelet' });
  const caption = el('p', { class: 'visual-caption' });
  host.append(...[list, frame, caption].filter(Boolean)); const preview = frame ? mountPreview(frame) : { run() {}, highlight() {}, destroy() {} }; preview.run(files);
  return { update(step) {
    const trace = step.trace || ['Koden leses fra toppen.', 'Uttrykk beregnes eller en hendelse venter.', 'Resultatet vises på nettsiden.'];
    const selected = Math.max(0, Math.min(trace.length - 1, step.traceActive ?? 0));
    list.replaceChildren(...trace.map((line, i) => el('li', { class: i === selected ? 'current' : '' }, line)));
    preview.highlight(step.highlight); caption.textContent = step.caption || 'Følg verdiene gjennom programmet og prøv eksempelet.';
  }, destroy() { preview.destroy(); } };
}
