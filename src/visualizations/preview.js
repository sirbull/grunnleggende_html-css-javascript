import { el } from '../core/dom.js';
import { mountPreview } from '../core/preview.js';
export function mount(host, { files }) {
  const frame = el('iframe', { class: 'preview-frame', sandbox: 'allow-scripts', title: 'Visuelt kodeeksempel' });
  const caption = el('p', { class: 'visual-caption' });
  host.append(frame, caption); const preview = mountPreview(frame);
  return { update(step) { preview.run(files, step.highlight || ''); caption.textContent = step.caption || 'Dette er resultatet av eksempelet. Åpne kodeverkstedet for å endre det.'; }, destroy() { preview.destroy(); } };
}
