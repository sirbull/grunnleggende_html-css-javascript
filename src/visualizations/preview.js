import { el } from '../core/dom.js';
import { mountPreview } from '../core/preview.js';
export function mount(host, { files }) {
  const frame = el('iframe', { class: 'preview-frame', sandbox: 'allow-scripts', title: 'Visuelt kodeeksempel' });
  const caption = el('p', { class: 'visual-caption' });
  host.append(frame, caption);
  // De første JavaScript-leksjonene skriver med console.log før DOM er forklart. Utskriften vises
  // derfor under resultatet, men konsollen lages først når eksempelet faktisk logger noe.
  let lines;
  const preview = mountPreview(frame, message => {
    // Lenkevarsler vises allerede som en melding inne i eksempelet.
    if (message.type === 'notice') return;
    if (!lines) {
      lines = el('pre', { class: 'console-output', tabindex: '0', 'aria-label': 'Konsoll' });
      caption.before(el('div', { class: 'preview-console' }, el('p', { class: 'console-title', 'aria-hidden': 'true' }, 'Konsoll'), lines));
    }
    lines.append(message.type === 'error' ? el('span', { class: 'console-error' }, `Feil: ${message.text}`) : message.text, '\n');
  });
  preview.run(files);
  return { update(step) { preview.highlight(step.highlight || ''); caption.textContent = step.caption || 'Dette er resultatet av eksempelet. Åpne kodeverkstedet for å endre det.'; }, destroy() { preview.destroy(); } };
}
