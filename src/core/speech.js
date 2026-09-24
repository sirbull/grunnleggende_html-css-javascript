import { el, announce } from './dom.js';
import { read, write } from './storage.js';

const NORWEGIAN = /^(nb|no|nn)(-|_|$)/i;
// Edge gir nettsider tilgang til de samme naturlige stemmene som «Les høyt» og Engasjerende leser.
// De heter for eksempel «Microsoft Pernille Online (Natural) - Norwegian (Bokmål, Norway)».
const NATURAL = /natural|neural/i;
const NEARBY = /^(da|sv|en)(-|_|$)/i;
const RATES = [0.7, 0.85, 1, 1.15, 1.3, 1.5, 1.75];
const ICONS = {
  speaker: '<path d="M3 9v6h4l5 4V5L7 9z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  play: '<path d="M8 5v14l11-7z" fill="currentColor"/>',
  pause: '<path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/>',
  previous: '<path d="M6 5h2v14H6zM19 5v14L9 12z" fill="currentColor"/>',
  next: '<path d="M16 5h2v14h-2zM5 5v14l10-7z" fill="currentColor"/>',
  stop: '<path d="M6 6h12v12H6z" fill="currentColor"/>',
};
function icon(name) {
  const span = el('span', { class: 'icon', 'aria-hidden': 'true' });
  span.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" focusable="false">${ICONS[name]}</svg>`;
  return span;
}
const rateLabel = rate => `${String(rate).replace('.', ',')}×`;

// Opplesningen er global: ikonet i toppmenyen åpner innstillingene, og en liten avspiller nede
// til venstre vises bare mens noe leses. Leksjonsvisningen kobler til lesepunktet sitt med attach().
export function createSpeech() {
  const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const button = document.querySelector('#speech-button');
  const panel = document.querySelector('#speech-panel');
  const player = document.querySelector('#speech-player');
  let reading = null, queue = [], index = 0, generation = 0, state = 'idle', voices = [];

  button.prepend(icon('speaker'));
  const voiceSelect = el('select', { id: 'speech-voice' });
  const voiceNote = el('p', { class: 'speech-note' });
  const speedSelect = el('select', { id: 'speech-rate' }, RATES.map(rate => el('option', { value: rate }, rateLabel(rate))));
  const scopeSelect = el('select', { id: 'speech-scope' },
    el('option', { value: 'from' }, 'Fra aktivt steg og videre'), el('option', { value: 'step' }, 'Bare aktivt steg'), el('option', { value: 'lesson' }, 'Hele leksjonen'));
  const start = el('button', { type: 'button', class: 'primary' }, icon('play'), 'Les høyt');
  const panelStatus = el('p', { class: 'speech-status', role: 'status' });
  panel.replaceChildren(
    el('h2', { id: 'speech-panel-title' }, 'Opplesning'),
    el('label', { for: 'speech-voice' }, 'Stemme'), voiceSelect, voiceNote,
    el('label', { for: 'speech-rate' }, 'Hastighet'), speedSelect,
    el('label', { for: 'speech-scope' }, 'Hva skal leses?'), scopeSelect,
    start, panelStatus);

  const nowReading = el('p', { class: 'player-now' });
  const toggle = el('button', { type: 'button', class: 'icon-button', 'aria-label': 'Pause' }, icon('pause'));
  const previous = el('button', { type: 'button', class: 'icon-button', 'aria-label': 'Forrige steg' }, icon('previous'));
  const nextStep = el('button', { type: 'button', class: 'icon-button', 'aria-label': 'Neste steg' }, icon('next'));
  const playerSpeed = el('select', { 'aria-label': 'Lesehastighet' }, RATES.map(rate => el('option', { value: rate }, rateLabel(rate))));
  const stop = el('button', { type: 'button', class: 'icon-button', 'aria-label': 'Stopp opplesning' }, icon('stop'));
  player.replaceChildren(nowReading, el('div', { class: 'player-controls' }, previous, toggle, nextStep, playerSpeed, stop));

  const savedRate = String(read('speech-rate', 1));
  speedSelect.value = playerSpeed.value = RATES.map(String).includes(savedRate) ? savedRate : '1';

  // Panelet ------------------------------------------------------------------------------------
  function openPanel() { panel.hidden = false; button.setAttribute('aria-expanded', 'true'); loadVoices(); }
  function closePanel(focusButton = false) { panel.hidden = true; button.setAttribute('aria-expanded', 'false'); if (focusButton) button.focus(); }
  button.onclick = () => (panel.hidden ? openPanel() : closePanel());
  panel.addEventListener('keydown', event => { if (event.key === 'Escape') { event.stopPropagation(); closePanel(true); } });
  document.addEventListener('click', event => { if (!panel.hidden && !panel.contains(event.target) && !button.contains(event.target)) closePanel(); });
  document.addEventListener('focusin', event => { if (!panel.hidden && !panel.contains(event.target) && !button.contains(event.target)) closePanel(); });

  // Stemmer ------------------------------------------------------------------------------------
  const voice = () => voices.find(v => v.name === voiceSelect.value) || null;
  function loadVoices() {
    if (!supported) return;
    voices = speechSynthesis.getVoices();
    const norwegian = voices.filter(v => NORWEGIAN.test(v.lang));
    const nearby = voices.filter(v => NEARBY.test(v.lang)).sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));
    const others = norwegian.length || nearby.length ? nearby : voices;
    // Naturlige stemmer først, siden de er minst slitsomme å høre på over tid.
    norwegian.sort((a, b) => NATURAL.test(b.name) - NATURAL.test(a.name) || a.name.localeCompare(b.name));
    const option = v => el('option', { value: v.name }, `${v.name}${v.localService === false && !/online/i.test(v.name) ? ' (nettbasert)' : ''}`);
    const previousValue = voiceSelect.value || read('speech-voice', '');
    voiceSelect.replaceChildren(
      norwegian.length ? el('optgroup', { label: 'Norske stemmer' }, norwegian.map(option)) : null,
      others.length ? el('optgroup', { label: norwegian.length ? 'Andre språk' : 'Tilgjengelige stemmer' }, others.map(option)) : null);
    const fallback = norwegian[0] || voices.find(v => v.default) || voices[0];
    voiceSelect.value = voices.some(v => v.name === previousValue) ? previousValue : fallback?.name || '';
    describeVoice(norwegian);
  }
  function describeVoice(norwegian = voices.filter(v => NORWEGIAN.test(v.lang))) {
    const chosen = voice();
    const notes = [];
    if (!voices.length) notes.push('Nettleseren har ikke lastet inn stemmer ennå.');
    else if (!norwegian.length) notes.push('Fant ingen norsk stemme. Teksten leses med en annen stemme.');
    if (chosen && chosen.localService === false) notes.push('Nettbasert stemme: teksten sendes til stemmens leverandør for å bli lest opp.');
    if (voices.length && !voices.some(v => NORWEGIAN.test(v.lang) && NATURAL.test(v.name))) notes.push('Tips: Microsoft Edge har naturlige norske stemmer, merket «Natural».');
    voiceNote.textContent = notes.join(' ');
  }
  voiceSelect.onchange = () => { write('speech-voice', voiceSelect.value); describeVoice(); if (state === 'playing') restartSentence(); };

  // Avspilling ---------------------------------------------------------------------------------
  const lessonOf = step => step.closest('[data-lesson]');
  const lessonTitle = lesson => lesson?.querySelector('.lesson-title')?.textContent || '';
  function buildQueue(scope) {
    const { steps, active } = reading;
    const currentLesson = lessonOf(steps[active]);
    const chosen = steps.map((_, i) => i).filter(i => scope === 'step' ? i === active : scope === 'lesson' ? lessonOf(steps[i]) === currentLesson : i >= active);
    queue = []; let lastLesson = null;
    for (const i of chosen) {
      const lesson = lessonOf(steps[i]);
      // Leksjonstittelen leses når opplesningen går inn i en ny leksjon, slik at skiftet høres.
      if (scope !== 'step' && lesson !== lastLesson && (scope === 'lesson' || lesson?.querySelector('.reading-step') === steps[i])) queue.push({ step: i, text: `${lessonTitle(lesson)}.` });
      lastLesson = lesson;
      const copy = steps[i].cloneNode(true); copy.querySelectorAll('pre,.step-label,.no-speech').forEach(n => n.remove());
      const text = copy.textContent.replace(/\s+/g, ' ').trim();
      (text.match(/[^.!?]+[.!?]*\s*/g) || [text]).filter(s => s.trim()).forEach(sentence => queue.push({ step: i, text: sentence }));
    }
  }
  function clearMarks() { reading?.steps.forEach(s => s.classList.remove('speaking')); }
  function showPlayer(visible) { player.hidden = !visible; document.body.classList.toggle('has-player', visible); }
  function finish(message = 'Opplesningen er stoppet.') {
    const hadFocus = player.contains(document.activeElement);
    generation++; state = 'idle';
    if (supported) speechSynthesis.cancel();
    clearMarks(); showPlayer(false); panelStatus.textContent = message;
    if (message) announce(message);
    if (hadFocus) button.focus();
  }
  function speak() {
    if (index >= queue.length) { finish('Ferdig lest.'); return; }
    state = 'playing'; const token = ++generation;
    const item = queue[index];
    clearMarks(); reading.go(item.step, false); reading.steps[item.step].classList.add('speaking');
    nowReading.textContent = lessonTitle(lessonOf(reading.steps[item.step]));
    const utterance = new SpeechSynthesisUtterance(item.text);
    const chosen = voice();
    utterance.lang = chosen?.lang || 'nb-NO'; if (chosen) utterance.voice = chosen;
    utterance.rate = Number(speedSelect.value);
    utterance.onend = () => { if (token === generation && state === 'playing') { index++; speak(); } };
    utterance.onerror = event => {
      if (token !== generation || ['canceled', 'interrupted'].includes(event.error)) return;
      finish(chosen?.localService === false ? 'Den nettbaserte stemmen svarte ikke. Sjekk nettforbindelsen eller velg en annen stemme.' : 'Opplesningen kunne ikke fortsette. Prøv igjen eller velg en annen stemme.');
    };
    speechSynthesis.speak(utterance);
  }
  function restartSentence() { generation++; speechSynthesis.cancel(); speak(); }
  function setPlaying(playing) {
    toggle.replaceChildren(icon(playing ? 'pause' : 'play'));
    toggle.setAttribute('aria-label', playing ? 'Pause' : 'Fortsett');
  }
  function jump(direction) {
    if (state === 'idle') return;
    const step = queue[Math.min(index, queue.length - 1)].step;
    let target = index;
    if (direction > 0) { while (target < queue.length && queue[target].step === step) target++; }
    else {
      const first = queue.findIndex(item => item.step === step);
      const before = first > 0 ? queue[first - 1].step : null;
      target = before === null ? first : queue.findIndex(item => item.step === before);
    }
    index = target; setPlaying(true);
    generation++; speechSynthesis.cancel(); speak();
  }

  start.onclick = () => {
    if (!reading) return;
    finish(''); loadVoices(); buildQueue(scopeSelect.value); index = 0;
    const chosen = voice();
    panelStatus.textContent = chosen ? `Leser med ${chosen.name}.` : 'Leser med systemets stemme.';
    closePanel(); showPlayer(true); setPlaying(true); speak(); toggle.focus();
  };
  toggle.onclick = () => {
    if (state === 'playing') { generation++; state = 'paused'; speechSynthesis.cancel(); setPlaying(false); announce('Pause. Fortsett leser setningen på nytt.'); }
    else if (state === 'paused') { setPlaying(true); speak(); }
  };
  previous.onclick = () => jump(-1);
  nextStep.onclick = () => jump(1);
  stop.onclick = () => finish();
  function changeRate(value) {
    speedSelect.value = playerSpeed.value = value; write('speech-rate', Number(value));
    if (state === 'playing') restartSentence();
  }
  speedSelect.onchange = () => changeRate(speedSelect.value);
  playerSpeed.onchange = () => changeRate(playerSpeed.value);

  function refresh() {
    start.disabled = !supported || !reading;
    if (!supported) panelStatus.textContent = 'Denne nettleseren støtter ikke opplesning.';
    else if (!reading) panelStatus.textContent = 'Opplesning er tilgjengelig i leksjonene.';
    else if (state === 'idle') panelStatus.textContent = '';
  }
  if (supported) { loadVoices(); speechSynthesis.addEventListener('voiceschanged', loadVoices); }
  else voiceSelect.disabled = speedSelect.disabled = scopeSelect.disabled = true;
  refresh();

  return {
    attach(next) { reading = next; refresh(); },
    detach() { if (state !== 'idle') finish(''); reading = null; refresh(); },
  };
}
