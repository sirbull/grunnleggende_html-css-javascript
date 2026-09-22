import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, relative } from 'node:path';
const root = resolve('dist'), prefix = '/kurs/web/';
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/plain; charset=utf-8','.svg':'image/svg+xml' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!pathname.startsWith(prefix)) { res.writeHead(404); res.end('Bruk /kurs/web/'); return; }
    let location = resolve(root, pathname.slice(prefix.length) || 'index.html');
    if (relative(root, location).startsWith('..')) throw new Error('Outside root');
    if ((await stat(location)).isDirectory()) location = resolve(location, 'index.html');
    res.writeHead(200, { 'Content-Type': types[extname(location)] || 'application/octet-stream', 'Cache-Control':'no-store' }); res.end(await readFile(location));
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(4178, '127.0.0.1', () => console.log('Produksjonsbuild: http://127.0.0.1:4178/kurs/web/'));
