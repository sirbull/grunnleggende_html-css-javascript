import { el, announce } from './dom.js';
import { mountPreview } from './preview.js';
import { read, write, remove } from './storage.js';

export async function mountPlayground(host, { id, files, title, onClose, signal }) {
  const { mountEditor } = await import('./editor.js');
  if (signal?.aborted || !host.isConnected) return { destroy() {} };
  const key = `code:${id}`;
  const stored = read(key, null);
  let current = stored && ['html','css','js'].every(k => typeof stored[k] === 'string') ? { ...stored } : { ...files };
  let timer, active = 'html', disposed = false;
  const views = {}, panes = {}, tabs = {};
  const output = el('pre', { class: 'console-output', 'aria-label': 'Konsoll og feil' }, 'Konsollen er klar.');
  const frame = el('iframe', { class: 'preview-frame', title: `Resultat: ${title}`, sandbox: 'allow-scripts' });
  const preview = mountPreview(frame, message => {
    if (output.textContent === 'Konsollen er klar.') output.textContent = '';
    output.textContent += `${message.type === 'error' ? 'Feil: ' : ''}${message.text}\n`;
    if (message.type === 'error') notice.textContent = 'Koden inneholder en feil. Se konsollen under resultatet.';
  });
  const notice = el('p', { class: 'workshop-help', role: 'status' }, stored ? 'Dine lokale kodeendringer er hentet.' : 'Endringer lagres automatisk i denne nettleseren.');
  const auto = el('input', { type: 'checkbox', checked: true });
  const all = el('input', { type: 'checkbox' });
  function run() { if (disposed) return; clearTimeout(timer); output.textContent = 'Konsollen er klar.'; notice.textContent = 'Koden er kjørt.'; preview.run(current); }
  function select(language, focus = false) {
    active = language;
    for (const key of Object.keys(tabs)) {
      tabs[key].setAttribute('aria-selected', String(key === active));
      tabs[key].tabIndex = key === active ? 0 : -1;
      panes[key].hidden = !all.checked && key !== active;
      if (!panes[key].hidden) views[key]?.requestMeasure();
    }
    if (focus) tabs[language].focus();
  }
  const editors = el('div', { class: 'editors' });
  const tablist = el('div', { class: 'editor-tabs', role: 'tablist', 'aria-label': 'Kodespråk' });
  const uid = `editor-${crypto.randomUUID()}`;
  for (const language of ['html', 'css', 'js']) {
    const name = language === 'js' ? 'JavaScript' : language.toUpperCase();
    tabs[language] = el('button', { id: `${uid}-${language}-tab`, role: 'tab', 'aria-controls': `${uid}-${language}`, onclick: () => select(language) }, name);
    panes[language] = el('section', { class: 'editor-pane', id: `${uid}-${language}`, role: 'tabpanel', 'aria-labelledby': `${uid}-${language}-tab` }, el('h3', {}, name));
    tablist.append(tabs[language]); editors.append(panes[language]);
  }
  tablist.onkeydown = event => {
    const order = ['html', 'css', 'js']; let next;
    if (event.key === 'ArrowRight') next = order[(order.indexOf(active) + 1) % 3];
    if (event.key === 'ArrowLeft') next = order[(order.indexOf(active) + 2) % 3];
    if (event.key === 'Home') next = 'html'; if (event.key === 'End') next = 'js';
    if (next) { event.preventDefault(); select(next, true); }
  };
  const heading = el('h2', { tabindex: '-1' }, 'Ditt kodeverksted');
  const reset = el('button', { onclick: () => {
    current = { ...files }; remove(key);
    for (const language of Object.keys(views)) views[language].dispatch({ changes: { from: 0, to: views[language].state.doc.length, insert: files[language] } });
    remove(key); run(); notice.textContent = 'Originalkoden er gjenopprettet.';
  } }, 'Tilbakestill kode');
  host.classList.add('workshop');
  host.replaceChildren(el('div', { class: 'workshop-top' }, heading, el('button', { onclick: onClose }, 'Lukk verksted')),
    el('p', { id: 'editor-help', class: 'workshop-help' }, 'Skriv kode og se resultatet. Tab flytter deg ut av editoren. Ctrl+Z angrer.'),
    el('label', {}, all, 'Vis alle tre språk'), tablist,
    el('div', { class: 'editor-grid' }, editors, el('div', { class: 'workshop-output' }, el('h3', {}, 'RESULTAT I NETTLESEREN'), frame, output)),
    el('div', { class: 'workshop-actions' }, el('button', { class: 'primary', onclick: run }, 'Kjør kode'), el('button', { onclick: () => { auto.checked = false; clearTimeout(timer); preview.stop(); notice.textContent = 'Forhåndsvisningen er stoppet.'; } }, 'Stopp visning'), reset, el('label', {}, auto, 'Auto-oppdatering')), notice);
  for (const language of ['html','css','js']) {
    views[language] = mountEditor(panes[language], language, current[language], code => {
      current[language] = code;
      const saved = write(key, current);
      notice.textContent = saved ? 'Lagret i nettleseren.' : 'Nettleseren tillater ikke lagring. Koden beholdes mens verkstedet er åpent.';
      clearTimeout(timer); if (auto.checked) timer = setTimeout(run, 350);
    });
  }
  all.onchange = () => { tablist.hidden = all.checked; select(active); };
  auto.onchange = () => { clearTimeout(timer); if (auto.checked) run(); };
  select(active); run(); heading.focus(); announce('Kodeverkstedet er åpnet.');
  return { destroy() { disposed = true; clearTimeout(timer); preview.destroy(); Object.values(views).forEach(v => v.destroy()); host.replaceChildren(); host.classList.remove('workshop'); } };
}
