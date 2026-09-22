import { el } from '../core/dom.js';
import { mountPreview } from '../core/preview.js';
export function mount(host, { files }) {
  const frame = el('iframe', { class: 'preview-frame', sandbox: 'allow-scripts', title: 'HTML gjengitt i nettleseren' });
  const tree = el('div', { class: 'dom-tree', 'aria-label': 'Forenklet DOM-tre' });
  const caption = el('p', { class: 'visual-caption' });
  host.append(frame, tree, caption);
  const preview = mountPreview(frame);
  const parsed = new DOMParser().parseFromString(files.html, 'text/html');
  function branch(node, highlight, depth = 0) {
    if (depth > 4 || ['SCRIPT','STYLE','META','LINK'].includes(node.tagName)) return null;
    const label = `<${node.tagName.toLowerCase()}>`;
    let matches = false; try { matches = highlight && node.matches(highlight); } catch { /* optional author selector */ }
    const item = el('li', {}, el(matches ? 'mark' : 'span', {}, label));
    const children = [...node.children].map(child => branch(child, highlight, depth + 1)).filter(Boolean);
    if (children.length) item.append(el('ul', {}, children));
    return item;
  }
  return { update(step) { preview.run(files, step.highlight); tree.replaceChildren(el('span', {}, 'DOM · dokumentets struktur'), el('ul', {}, branch(parsed.documentElement, step.highlight))); caption.textContent = step.caption || 'Elementene i koden blir noder i nettleserens DOM-tre.'; }, destroy() { preview.destroy(); } };
}
