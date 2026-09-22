export function routePath(section, track, lesson) { return `#/${section}/${track}/${lesson}`; }
export function parseRoute(hash) {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?');
  let parts;
  try { parts = path.split('/').filter(Boolean).map(decodeURIComponent); } catch { return { kind: 'missing' }; }
  if (!parts.length) return { kind: 'home' };
  if (parts[0] === 'reference' && parts.length <= 2) return { kind: 'reference', id: parts[1], query: new URLSearchParams(query) };
  if (parts.length === 3) return { kind: 'lesson', section: parts[0], track: parts[1], lesson: parts[2] };
  return { kind: 'missing' };
}
export function findLesson(manifest, route) {
  const section = manifest.sections.find(s => s.id === route.section);
  const track = section?.tracks.find(t => t.id === route.track);
  const lesson = track?.lessons.find(l => l.id === route.lesson);
  return lesson ? { section, track, lesson, index: track.lessons.indexOf(lesson) } : null;
}
export function firstRoute(manifest) {
  const s = manifest.sections[0], t = s.tracks[0];
  return routePath(s.id, t.id, t.lessons[0].id);
}
