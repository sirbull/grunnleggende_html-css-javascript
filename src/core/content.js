import MarkdownIt from 'markdown-it';
const markdown = new MarkdownIt({ html: false, linkify: false, typographer: false });
export const renderMarkdown = source => markdown.render(source);

export function parseSteps(source) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const steps = []; let current = null; let fence = null;
  for (const line of lines) {
    const codeFence = line.match(/^\s*(`{3,}|~{3,})/);
    if (codeFence) {
      if (!fence) fence = codeFence[1][0];
      else if (codeFence[1][0] === fence) fence = null;
    }
    if (!fence && line.startsWith(':::step ')) {
      if (current) throw new Error('Et lesesteg mangler avsluttende :::.');
      let metadata;
      try { metadata = JSON.parse(line.slice(8)); } catch { throw new Error('Ugyldige JSON-metadata i lesesteg.'); }
      if (!/^[a-z0-9-]+$/.test(metadata.id || '')) throw new Error('Lesesteg trenger en gyldig id.');
      if (steps.some(s => s.id === metadata.id)) throw new Error(`Duplisert steg: ${metadata.id}`);
      current = { ...metadata, lines: [] };
    } else if (!fence && line.trim() === ':::') {
      if (!current) throw new Error('Avslutning uten lesesteg.');
      const { lines: body, ...meta } = current;
      steps.push({ ...meta, markdown: body.join('\n').trim() }); current = null;
    } else if (current) current.lines.push(line);
    else if (line.trim()) throw new Error('Artikkeltekst må ligge i et lesesteg.');
  }
  if (current) throw new Error('Siste lesesteg mangler avsluttende :::.');
  if (!steps.length) throw new Error('Leksjonen har ingen lesesteg.');
  return steps;
}

export function includeExample(source, files) {
  return source.replace(/^:::example (html|css|js)$/gm, (_, language) => {
    const code = files[language] || '';
    const fence = '`'.repeat(Math.max(3, ...(code.match(/`+/g) || []).map(s => s.length + 1)));
    return `${fence}${language === 'js' ? 'javascript' : language}\n${code}\n${fence}`;
  });
}

export async function getFile(path, signal, json = false) {
  const url = new URL(path, document.baseURI);
  const base = new URL('.', document.baseURI);
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) throw new Error('Innholdsfilen må ligge i prosjektmappen.');
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Kunne ikke hente ${path} (${response.status}).`);
  return json ? response.json() : response.text();
}
export async function getExample(path, signal) {
  const values = await Promise.all(['index.html', 'style.css', 'script.js'].map(file => getFile(`${path}/${file}`, signal)));
  return Object.fromEntries(['html', 'css', 'js'].map((key, i) => [key, values[i]]));
}
