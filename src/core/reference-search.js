export function normalize(value) {
  return String(value).replace(/([a-z])([A-Z])/g, '$1 $2').toLocaleLowerCase('nb').replace(/[<>()[\]{};,]/g, ' ').replace(/\s+/g, ' ').trim();
}
export const compareEntries = (a, b) => a.sortTitle.localeCompare(b.sortTitle, 'nb', { sensitivity: 'base' });
export function searchEntries(entries, query = '', category = 'all', letter = '') {
  const normalized = normalize(query), tokens = normalized.split(' ').filter(Boolean);
  return entries.filter(e => category === 'all' || e.category === category)
    .filter(e => !letter || e.sortTitle.toLocaleUpperCase('nb').startsWith(letter))
    .map(entry => {
      const exact = [entry.title, entry.displayCode, ...(entry.aliases || [])].map(normalize);
      const haystack = normalize([entry.id, entry.title, entry.displayCode, entry.short, entry.explanation, ...(entry.aliases || []), ...(entry.keywords || [])].join(' '));
      const score = !tokens.length ? 1 : exact.includes(normalized) ? 100 : haystack.includes(normalized) ? 60 : tokens.every(t => haystack.includes(t)) ? 20 : 0;
      return { entry, score };
    }).filter(r => r.score > 0).sort((a, b) => b.score - a.score || compareEntries(a.entry, b.entry)).map(r => r.entry);
}
