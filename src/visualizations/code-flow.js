import { el } from '../core/dom.js';
import { mountPreview } from '../core/preview.js';
export function mount(host, { files }) {
  const list = el('ol', { class: 'trace-list', 'aria-label': 'Steg i programmet' });
  const frame = el('iframe', { class: 'preview-frame', sandbox: 'allow-scripts', title: 'Resultat av JavaScript-eksempelet' });
  const caption = el('p', { class: 'visual-caption' });
  host.append(list, frame, caption); const preview = mountPreview(frame);
  return { update(step) {
    const trace = step.trace || ['Koden leses fra toppen.', 'Uttrykk beregnes eller en hendelse venter.', 'Resultatet vises på nettsiden.'];
    list.replaceChildren(...trace.map((line, i) => el('li', { class: i === (step.traceActive ?? 0) ? 'current' : '' }, line)));
    preview.run(files, step.highlight); caption.textContent = step.caption || 'Følg verdiene gjennom programmet og prøv eksempelet.';
  }, destroy() { preview.destroy(); } };
}
