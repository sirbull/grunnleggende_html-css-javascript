import DOMPurify from 'dompurify';
import { renderMarkdown } from './content.js';
import { el } from './dom.js';

export function markdownFragment(source, entries = []) {
  const template = document.createElement('template');
  template.innerHTML = DOMPurify.sanitize(renderMarkdown(source));
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
  const texts = []; let node;
  while ((node = walker.nextNode())) if (!node.parentElement?.closest('code, pre, a, button')) texts.push(node);
  for (const text of texts) {
    const pattern = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;
    let match, start = 0; const parts = [];
    while ((match = pattern.exec(text.textContent))) {
      parts.push(text.textContent.slice(start, match.index));
      const entry = entries.find(e => e.id === match[1]);
      parts.push(entry ? el('button', { class: 'term', type: 'button', 'data-term': entry.id, 'aria-haspopup': 'dialog' }, match[2] || entry.title) : (match[2] || match[1]));
      start = pattern.lastIndex;
    }
    if (parts.length) { parts.push(text.textContent.slice(start)); text.replaceWith(...parts); }
  }
  return template.content;
}
