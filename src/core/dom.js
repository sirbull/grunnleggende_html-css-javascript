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
export function setupDialog(dialog) {
  let opener;
  dialog.addEventListener('click', event => {
    if (event.target.closest('[data-close]')) dialog.close();
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => { if (opener?.isConnected) opener.focus(); });
  return { open(from = document.activeElement) { opener = from; dialog.showModal(); }, close() { dialog.close(); } };
}
