import { readFile, access } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { parseSteps } from '../src/core/content.js';
const root = resolve('public');
function file(path) { const absolute = resolve(root, path); if (relative(root, absolute).startsWith('..')) throw new Error(`Utenfor public: ${path}`); return absolute; }
const json = async path => JSON.parse(await readFile(file(path), 'utf8'));
const manifest = await json('content/manifest.json');
const reference = await json(manifest.reference);
const entries = (await Promise.all(reference.files.map(json))).flat();
const categories = reference.categories || {};
if (!Object.keys(categories).length) throw new Error('Referansemanifestet mangler categories.');
const ids = new Set();
for (const entry of entries) {
  if (ids.has(entry.id)) throw new Error(`Duplisert oppføring ${entry.id}`); ids.add(entry.id);
  for (const key of ['id','title','sortTitle','category','type','short','syntax','explanation','when','mistakes']) if (!entry[key]) throw new Error(`${entry.id}: mangler ${key}`);
  if (!entry.example && !['html','css','js'].every(k => typeof entry.files?.[k] === 'string')) throw new Error(`${entry.id}: mangler kjørbart eksempel`);
  if (!categories[entry.category]) throw new Error(`${entry.id}: ukjent kategori ${entry.category}`);
}
for (const entry of entries) for (const related of entry.related || []) if (!ids.has(related)) throw new Error(`Ukjent relatert oppføring ${related}`);
let count = 0; const lessonIds = new Set();
for (const section of manifest.sections) for (const track of section.tracks) for (const lesson of track.lessons) {
  if (lessonIds.has(lesson.id)) throw new Error(`Duplisert leksjons-ID ${lesson.id}`); lessonIds.add(lesson.id);
  const source = await readFile(file(lesson.content), 'utf8');
  const steps = parseSteps(source);
  for (const step of steps) {
    if (!/^## /m.test(step.markdown)) throw new Error(`${lesson.id}/${step.id}: mangler overskrift`);
    for (const match of step.markdown.matchAll(/\[\[([a-z0-9-]+)/g)) if (!ids.has(match[1])) throw new Error(`${lesson.id}: ukjent fagord ${match[1]}`);
  }
  await Promise.all(['index.html','style.css','script.js'].map(name => access(file(`${lesson.example}/${name}`))));
  count++;
}
console.log(`Innhold OK: ${count} leksjoner, ${entries.length} referanseoppføringer.`);
