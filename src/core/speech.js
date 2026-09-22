import { el } from './dom.js';
import { read, write } from './storage.js';

export function mountSpeech(host, getReading) {
  const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let queue = [], index = 0, generation = 0, state = 'idle', voice = null, utterance;
  const play = el('button', { type: 'button' }, 'Les høyt');
  const pause = el('button', { type: 'button', disabled: true }, 'Pause');
  const stop = el('button', { type: 'button', disabled: true }, 'Stopp');
  const scope = el('select', { 'aria-label': 'Hva skal leses?' }, el('option', { value: 'step' }, 'Aktivt steg'), el('option', { value: 'lesson' }, 'Hele leksjonen'));
  const speed = el('select', { 'aria-label': 'Lesehastighet' }, [0.7, 0.85, 1, 1.15, 1.3, 1.5].map(rate => el('option', { value: rate }, `${String(rate).replace('.', ',')}×`)));
  speed.value = String(read('speech-rate', 1));
  if (!speed.value) speed.value = '1';
  const status = el('p', { class: 'speech-status', role: 'status' });
  const panel = el('div', { class: 'speech-options', hidden: true }, el('label', {}, 'Les', scope), el('label', {}, 'Hastighet', speed), pause, stop, status);
  host.append(play, panel);
  function voices() {
    const all = speechSynthesis.getVoices();
    voice = all.find(v => /^(nb|no)(-|_|$)/i.test(v.lang)) || all.find(v => v.default) || all[0] || null;
  }
  function clearMarks() { getReading()?.steps.forEach(s => s.classList.remove('speaking')); }
  function finish(message = 'Opplesningen er stoppet.') {
    generation++; state = 'idle';
    if (supported) speechSynthesis.cancel();
    clearMarks(); pause.disabled = true; stop.disabled = true; pause.textContent = 'Pause'; play.textContent = 'Les høyt'; status.textContent = message;
  }
  function speak() {
    if (index >= queue.length) { finish('Ferdig lest.'); return; }
    state = 'playing'; const token = ++generation;
    clearMarks(); const item = queue[index];
    getReading().go(item.step, false); getReading().steps[item.step].classList.add('speaking');
    utterance = new SpeechSynthesisUtterance(item.text);
    utterance.lang = voice?.lang || 'nb-NO'; if (voice) utterance.voice = voice;
    utterance.rate = Number(speed.value);
    utterance.onend = () => { if (token === generation && state === 'playing') { index++; speak(); } };
    utterance.onerror = e => { if (token === generation && !['canceled','interrupted'].includes(e.error)) finish('Opplesningen kunne ikke fortsette. Prøv igjen eller velg en annen systemstemme.'); };
    speechSynthesis.speak(utterance);
  }
  play.onclick = () => {
    panel.hidden = false; finish(''); voices();
    const reading = getReading(); queue = [];
    reading.steps.forEach((step, i) => {
      if (scope.value === 'step' && i !== reading.active) return;
      const copy = step.cloneNode(true); copy.querySelectorAll('pre,.step-label,.no-speech').forEach(n => n.remove());
      const text = copy.textContent.replace(/\s+/g, ' ').trim();
      const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
      sentences.filter(s => s.trim()).forEach(text => queue.push({ step: i, text }));
    });
    index = 0; pause.disabled = false; stop.disabled = false;
    status.textContent = voice && /^(nb|no)(-|_|$)/i.test(voice.lang) ? `Leser med ${voice.name}.` : 'Norsk stemme er ikke tilgjengelig. Bruker systemets stemme.';
    play.textContent = 'Start på nytt'; speak();
  };
  pause.onclick = () => {
    if (state === 'playing') { generation++; state = 'paused'; speechSynthesis.cancel(); pause.textContent = 'Fortsett'; status.textContent = 'Pause. Fortsett leser den påbegynte setningen på nytt.'; }
    else if (state === 'paused') { pause.textContent = 'Pause'; status.textContent = 'Leser videre.'; speak(); }
  };
  stop.onclick = () => finish();
  speed.onchange = () => { write('speech-rate', Number(speed.value)); if (state === 'playing') { generation++; speechSynthesis.cancel(); speak(); } };
  scope.onchange = () => finish('Trykk Les høyt for å starte det valgte innholdet.');
  if (!supported) { play.disabled = true; panel.hidden = false; status.textContent = 'Denne nettleseren støtter ikke opplesning.'; scope.disabled = speed.disabled = true; }
  else { voices(); speechSynthesis.addEventListener('voiceschanged', voices); }
  return { destroy() { finish(); if (supported) speechSynthesis.removeEventListener('voiceschanged', voices); } };
}
