const behavior = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
// Hvert nytt mål må avbryte en myk scroll som fortsatt pågår. scrollIntoView gjør ingenting når
// målet allerede er der siden står, og da ville en påbegynt scroll fra forrige tastetrykk vinne.
function scrollToElement(node) {
  const margin = parseFloat(getComputedStyle(node).scrollMarginTop) || 0;
  const top = Math.max(0, Math.round(node.getBoundingClientRect().top + scrollY - margin));
  window.scrollTo({ top, behavior: Math.abs(scrollY - top) < 2 ? 'instant' : behavior() });
}

export function createReading(article, onChange) {
  const steps = [...article.querySelectorAll('.reading-step')];
  // Stopp er lesesteg pluss overskrifter som markerer en ny leksjon. Piltastene stopper på begge,
  // slik at leseren ser overskriften før teksten går videre inn i en ny leksjon.
  const stops = [...article.querySelectorAll('.reading-step, .reading-stop')];
  const controller = new AbortController(), options = { signal: controller.signal };
  let active = -1, frame = 0, lockedUntil = 0, heading = null;
  const visible = new Set();
  function activate(index, chosen = false) {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    if (next === active) return;
    active = next;
    steps.forEach((s, i) => { s.classList.toggle('active', i === active); });
    onChange(active, chosen);
  }
  function measure() {
    if (Date.now() < lockedUntil) return;
    const line = Math.min(innerHeight * .32, 250);
    const candidates = visible.size ? [...visible] : steps;
    const best = candidates.reduce((nearest, step) => {
      const rect = step.getBoundingClientRect();
      const distance = rect.top <= line && rect.bottom >= line ? 0 : Math.min(Math.abs(rect.top - line), Math.abs(rect.bottom - line));
      return distance < nearest.distance ? { step, distance } : nearest;
    }, { step: steps[0], distance: Infinity });
    // Overskriftsstoppet holder så lenge lesepunktet fortsatt er ved steget rett under overskriften.
    const index = steps.indexOf(best.step);
    if (index !== active) heading = null;
    activate(index);
  }
  const observer = new IntersectionObserver(items => {
    items.forEach(i => i.isIntersecting ? visible.add(i.target) : visible.delete(i.target));
    measure();
  }, { threshold: [0, .2, .5, 1] });
  steps.forEach(step => observer.observe(step));
  // Når fokus allerede er i teksten (for eksempel etter Tab til en knapp), følger fokus med til
  // det nye steget. Da fortsetter neste Tab derfra, og ikke fra knappen i steget man forlot.
  function focusQuietly(node) {
    if (!node.hasAttribute('tabindex')) node.setAttribute('tabindex', '-1');
    node.focus({ preventScroll: true });
  }
  function go(index, scroll = true, focus = false) {
    if (focus) focusQuietly(steps[Math.max(0, Math.min(steps.length - 1, index))]);
    lockedUntil = Date.now() + 900; heading = null; activate(index, true);
    if (scroll) scrollToElement(steps[active]);
  }
  // Et overskriftsstopp gjør det første steget etter overskriften aktivt, men scroller til
  // overskriften (eller til elementet i data-scroll-to, for eksempel nivåoverskriften over den).
  function stopAt(stop, scroll = true, focus = false) {
    if (focus) focusQuietly(stop.querySelector('[tabindex="-1"]') || stop);
    lockedUntil = Date.now() + 900; heading = stop;
    const first = stops.slice(stops.indexOf(stop) + 1).find(s => s.classList.contains('reading-step'));
    if (first) activate(steps.indexOf(first), true);
    if (scroll) scrollToElement(document.getElementById(stop.dataset.scrollTo || '') || stop);
  }
  function move(direction, focus) {
    const next = stops[stops.indexOf(heading || steps[active]) + direction];
    if (!next) return;
    if (next.classList.contains('reading-step')) go(steps.indexOf(next), true, focus); else stopAt(next, true, focus);
  }
  // Piltastene gjelder hele leksjonssiden, også når fokus står på en knapp eller lenke etter Tab.
  // Bare kontroller som selv bruker pil opp/ned er unntatt. PageUp/PageDown, mellomrom, Home og
  // End røres ikke, slik at vanlig tastaturscrolling fortsatt finnes.
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || !['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    if (e.defaultPrevented || document.querySelector('dialog[open]')) return;
    const target = e.target;
    if (target instanceof Element && target.closest('input,textarea,select,iframe,[contenteditable],[role=slider],[role=listbox],[role=menu],[role=radiogroup],[role=grid],[role=tree],.cm-editor,.workshop,.speech-panel')) return;
    const focusInText = article.contains(document.activeElement) && document.activeElement !== article;
    e.preventDefault(); move(e.key === 'ArrowDown' ? 1 : -1, focusInText);
  }, options);
  article.addEventListener('focusin', e => {
    const step = e.target.closest('.reading-step');
    if (step) { lockedUntil = Date.now() + 300; heading = null; activate(steps.indexOf(step), true); }
  }, options);
  // Klikk i et steg gjør det aktivt, slik at også musebrukere kan velge hva som er skarpt.
  article.addEventListener('click', e => {
    const step = e.target.closest('.reading-step');
    if (step && !step.classList.contains('active') && !window.getSelection()?.toString()) go(steps.indexOf(step), false);
  }, options);
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; measure(); }); }, { ...options, passive: true });
  ['wheel','touchstart'].forEach(type => window.addEventListener(type, () => { lockedUntil = 0; }, { ...options, passive: true }));
  document.addEventListener('selectionchange', () => article.classList.toggle('selecting', !!window.getSelection()?.toString()), options);
  activate(0);
  return { go, stopAt, get active() { return active; }, steps, destroy() { observer.disconnect(); controller.abort(); cancelAnimationFrame(frame); } };
}
