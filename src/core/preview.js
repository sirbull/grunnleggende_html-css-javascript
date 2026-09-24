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
    let marked = [];
    function highlight(selector) {
      marked.forEach(([e, outline, offset]) => { e.style.outline = outline; e.style.outlineOffset = offset; }); marked = [];
      if (selector) try { document.querySelectorAll(selector).forEach(e => { marked.push([e, e.style.outline, e.style.outlineOffset]); e.style.outline='3px solid #a13e1d'; e.style.outlineOffset='4px'; }); } catch {}
    }
    highlight(data.highlight);
    // Et srcdoc-dokument løser lenker mot hovedsidens adresse. Uten dette ville href="#tips" laste
    // hele læringssiden inn i forhåndsvisningen. Ankere i eksempelet vises; andre lenker forklares.
    let toast, toastTimer;
    function notify(text) {
      send('notice', 'Lenke: ' + text);
      if (!toast) {
        toast = document.createElement('webverksted-melding'); toast.setAttribute('role', 'status');
        toast.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;display:block;padding:10px 14px;border-radius:8px;background:#172b26;color:#fff;font:14px/1.45 system-ui,sans-serif;box-shadow:0 6px 20px rgb(0 0 0 / .25)';
      }
      toast.textContent = text; document.body.append(toast);
      clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.remove(), 6000);
    }
    function showTarget(target) {
      const previous = [target.style.outline, target.style.outlineOffset];
      target.style.outline = '3px dashed #174f42'; target.style.outlineOffset = '4px';
      setTimeout(() => { target.style.outline = previous[0]; target.style.outlineOffset = previous[1]; }, 2500);
      // Rammen vokser med innholdet, så den scrolles bare når den selv har noe å scrolle.
      if (document.documentElement.scrollHeight > innerHeight + 2) scrollTo({ top: target.getBoundingClientRect().top + scrollY - 12 });
      if (target.hasAttribute('tabindex') || target.matches('a[href],button,input,select,textarea')) target.focus({ preventScroll: true });
    }
    window.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0) return;
      const link = event.target.closest && event.target.closest('a[href], area[href]');
      if (!link) return;
      const href = link.getAttribute('href').trim();
      if (/^javascript:/i.test(href)) return;
      event.preventDefault();
      if (href.startsWith('#')) {
        let id = href.slice(1); try { id = decodeURIComponent(id); } catch {}
        const target = id ? document.getElementById(id) || document.getElementsByName(id)[0] : document.body;
        if (target) { showTarget(target); notify('Lenken hopper til ' + href + ' på samme side. Målet er markert.'); }
        else notify('Lenken peker til ' + href + ', men ingen element i eksempelet har id="' + id + '".');
        return;
      }
      notify(/^(https?:)?\\/\\//i.test(href)
        ? 'Lenken går til ' + href + '. Eksterne nettsider åpnes ikke fra øvingsvinduet.'
        : 'Lenken går til «' + href + '». Den siden finnes ikke ennå. Øvingsvinduet viser bare dette ene eksempelet.');
    });
    window.addEventListener('message', event => { if (event.source === parent && event.data?.token === data.token && event.data?.type === 'highlight') highlight(event.data.selector); });
    window.addEventListener('preview-ready-' + data.token, () => send('ready', ''), { once: true });
    // Rammen melder fra om hoyden sin, slik at verten kan vokse med innholdet i stedet for aa klippe det.
    let lastHeight = 0;
    const sendHeight = () => {
      const height = Math.ceil(document.documentElement.scrollHeight);
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      parent.postMessage({ channel:'webverkstedet-preview', token:data.token, type:'height', value:height }, '*');
    };
    try { new ResizeObserver(sendHeight).observe(document.documentElement); } catch {}
    addEventListener('load', sendHeight);
    setTimeout(sendHeight, 0);
    const script = document.createElement('script');
    script.type = 'module'; script.textContent = data.js + '\\n;dispatchEvent(new Event(' + JSON.stringify('preview-ready-' + data.token) + '));\\n//# sourceURL=script.js'; document.body.append(script);
  })();`;
  return `<!doctype html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' blob:; style-src 'unsafe-inline'; img-src data: blob:; media-src data: blob:; connect-src data:; font-src 'none'; form-action 'none'; base-uri 'none'"><style>body{font-family:system-ui,sans-serif;color:#202c29;padding:20px;line-height:1.6;overflow-wrap:anywhere}*{box-sizing:border-box}button,input,select{font:inherit}button{cursor:pointer}img{max-width:100%} :focus-visible{outline:3px solid #a13e1d;outline-offset:3px}</style><style>${files.css}</style></head><body>${files.html}<script>${bootstrap}</script></body></html>`;
}
const MAX_AUTO_HEIGHT = 1200;
export function mountPreview(frame, onMessage = () => {}) {
  // allow-forms enables native validation and submit events; CSP form-action 'none' still blocks actual submissions.
  frame.setAttribute('sandbox', 'allow-scripts allow-forms');
  let token = '', highlight = '', heightUpdates = 0;
  const updateHighlight = () => frame.contentWindow?.postMessage({ token, type: 'highlight', selector: highlight }, '*');
  const listener = event => {
    if (event.source !== frame.contentWindow || event.data?.channel !== 'webverkstedet-preview' || event.data.token !== token) return;
    if (event.data.type === 'ready') { updateHighlight(); return; }
    if (event.data.type === 'height') { if (heightUpdates++ < 40) frame.style.height = `${Math.min(event.data.value, MAX_AUTO_HEIGHT)}px`; return; }
    if (!['log','error','notice'].includes(event.data.type)) return;
    onMessage(event.data);
  };
  window.addEventListener('message', listener);
  return {
    run(files, selector = '') { highlight = selector; token = crypto.randomUUID(); heightUpdates = 0; frame.style.height = ''; frame.srcdoc = previewDocument(files, token, highlight); },
    highlight(selector = '') { highlight = selector; updateHighlight(); },
    stop() { token = ''; frame.removeAttribute('srcdoc'); frame.src = 'about:blank'; },
    destroy() { window.removeEventListener('message', listener); frame.removeAttribute('srcdoc'); }
  };
}
