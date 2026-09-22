// Student code only runs inside an opaque-origin iframe, never in the app realm.
export function previewDocument(files, token, highlight = '') {
  const payload = JSON.stringify({ js: files.js, token, highlight }).replace(/</g, '\\u003c');
  const bootstrap = `(() => {
    const data = ${payload};
    let messages = 0;
    const send = (type, text) => { if (messages++ < 60) parent.postMessage({ channel:'webverkstedet-preview', token:data.token, type, text:String(text).slice(0,2000) }, '*'); };
    window.addEventListener('error', e => send('error', e.message + (e.lineno ? ' (linje ' + e.lineno + ')' : '')));
    window.addEventListener('unhandledrejection', e => send('error', e.reason?.message || e.reason));
    const originalLog = console.log.bind(console);
    console.log = (...args) => { originalLog(...args); send('log', args.map(a => { try { return typeof a === 'string' ? a : JSON.stringify(a); } catch { return String(a); } }).join(' ')); };
    // Sandboxed previews cannot access persistent origin storage. The lesson UI explains this memory substitute.
    const memory = new Map();
    try { Object.defineProperty(window, 'localStorage', { value: { getItem:k => memory.has(String(k)) ? memory.get(String(k)) : null, setItem:(k,v) => memory.set(String(k),String(v)), removeItem:k => memory.delete(String(k)), clear:() => memory.clear(), key:i => [...memory.keys()][i] ?? null, get length(){return memory.size;} } }); } catch {}
    if (data.highlight) { try { document.querySelectorAll(data.highlight).forEach(e => { e.style.outline='3px solid #a13e1d'; e.style.outlineOffset='4px'; }); } catch {} }
    const script = document.createElement('script');
    script.type = 'module'; script.textContent = data.js + '\\n//# sourceURL=script.js'; document.body.append(script);
  })();`;
  return `<!doctype html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' blob:; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:; connect-src data:; font-src 'none'; form-action 'none'; base-uri 'none'"><style>body{font-family:system-ui,sans-serif;color:#202c29;padding:20px;line-height:1.6;overflow-wrap:anywhere}*{box-sizing:border-box}button,input,select{font:inherit}button{cursor:pointer}img{max-width:100%} :focus-visible{outline:3px solid #a13e1d;outline-offset:3px}</style><style>${files.css}</style></head><body>${files.html}<script>${bootstrap}</script></body></html>`;
}
export function mountPreview(frame, onMessage = () => {}) {
  let token = '';
  const listener = event => {
    if (event.source !== frame.contentWindow || event.data?.channel !== 'webverkstedet-preview' || event.data.token !== token || !['log','error'].includes(event.data.type)) return;
    onMessage(event.data);
  };
  window.addEventListener('message', listener);
  return {
    run(files, highlight = '') { token = crypto.randomUUID(); frame.srcdoc = previewDocument(files, token, highlight); },
    stop() { token = ''; frame.removeAttribute('srcdoc'); frame.src = 'about:blank'; },
    destroy() { window.removeEventListener('message', listener); frame.removeAttribute('srcdoc'); }
  };
}
