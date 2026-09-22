export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2).toLowerCase(), value);
    else node.setAttribute(key, String(value));
  }
  node.append(...children.flat().filter(x => x !== null && x !== undefined));
  return node;
}
export const announce = text => { document.querySelector('#status').textContent = text; };
let site = document.title;
export const configureSite = title => { site = title; };
export const setPageTitle = (...parts) => { document.title = [...parts.filter(Boolean), site].join(' · '); };
export function setupDialog(dialog) {
  let opener;
  dialog.addEventListener('click', event => {
    if (event.target.closest('[data-close]')) dialog.close();
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    }
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter(node => !node.hasAttribute('disabled') && node.getClientRects().length);
    if (!focusable.length) return;
    const edge = event.shiftKey ? focusable[0] : focusable.at(-1);
    const target = event.shiftKey ? focusable.at(-1) : focusable[0];
    if (document.activeElement === edge || !dialog.contains(document.activeElement)) { event.preventDefault(); target.focus(); }
  });
  dialog.addEventListener('close', () => { if (opener?.isConnected) opener.focus(); });
  return { open(from = document.activeElement) { opener = from; dialog.showModal(); }, close() { dialog.close(); } };
}
