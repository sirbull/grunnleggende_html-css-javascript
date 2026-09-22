export function createReading(article, onChange) {
  const steps = [...article.querySelectorAll('.reading-step')];
  const controller = new AbortController(), options = { signal: controller.signal };
  let active = -1, frame = 0, lockedUntil = 0;
  const visible = new Set();
  function activate(index) {
    const next = Math.max(0, Math.min(steps.length - 1, index));
    if (next === active) return;
    active = next;
    steps.forEach((s, i) => { s.classList.toggle('active', i === active); });
    onChange(active);
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
    activate(steps.indexOf(best.step));
  }
  const observer = new IntersectionObserver(items => {
    items.forEach(i => i.isIntersecting ? visible.add(i.target) : visible.delete(i.target));
    measure();
  }, { threshold: [0, .2, .5, 1] });
  steps.forEach(step => observer.observe(step));
  function go(index, scroll = true) {
    lockedUntil = Date.now() + 900; activate(index);
    if (scroll) steps[active].scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  article.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || !['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    if (e.target.closest('button,a,input,textarea,select,[contenteditable],dialog,[role=slider]')) return;
    e.preventDefault(); go(active + (e.key === 'ArrowDown' ? 1 : -1));
  }, options);
  article.addEventListener('focusin', e => {
    const step = e.target.closest('.reading-step');
    if (step) { lockedUntil = Date.now() + 300; activate(steps.indexOf(step)); }
  }, options);
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; measure(); }); }, { ...options, passive: true });
  ['wheel','touchstart'].forEach(type => window.addEventListener(type, () => { lockedUntil = 0; }, { ...options, passive: true }));
  document.addEventListener('selectionchange', () => article.classList.toggle('selecting', !!window.getSelection()?.toString()), options);
  activate(0);
  return { go, get active() { return active; }, steps, destroy() { observer.disconnect(); controller.abort(); cancelAnimationFrame(frame); } };
}
