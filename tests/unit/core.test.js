import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSteps, renderMarkdown, markExamples, EXAMPLE_TOKEN } from '../../src/core/content.js';
import { parseRoute, findLesson } from '../../src/core/router.js';
import { searchEntries } from '../../src/core/reference-search.js';

test('step metadata, fences and duplicate ids', () => {
  const source = ':::step {"id":"one","highlight":"h1"}\n## Hei\n```html\n:::step literal\n```\n:::';
  assert.equal(parseSteps(source)[0].highlight, 'h1');
  assert.throws(() => parseSteps(source + '\n' + source), /Duplisert/);
  assert.throws(() => parseSteps(':::step {"id":"x"}\nmissing'), /avsluttende/);
  assert.throws(() => parseSteps('tekst uten steg'), /lesesteg/);
});
test('raw HTML is inert and shared examples preserve code', () => {
  assert.match(renderMarkdown('<script>alert(1)</script>'), /&lt;script&gt;/);
  const lines = markExamples('Tekst\n:::example js\n:::example cs').split('\n');
  assert.equal(lines[1].match(EXAMPLE_TOKEN)[1], 'js');
  assert.equal(lines[2], ':::example cs');
});
test('hash routes and missing content', () => {
  assert.deepEqual(parseRoute('#/html/basic/intro'), { kind: 'lesson', section: 'html', track: 'basic', lesson: 'intro' });
  assert.equal(parseRoute('#/reference/css-class?q=.h2').id, 'css-class');
  assert.equal(parseRoute('#/%bad').kind, 'missing');
  assert.equal(findLesson({ sections: [] }, parseRoute('#/a/b/c')), null);
});
test('search distinguishes punctuation and natural phrases', () => {
  const entries = [
    { id: 'type', title: 'Element', sortTitle: 'Element', category: 'css', displayCode: 'h2', short: 'Overskrift', aliases: ['<h2>'] },
    { id: 'class', title: 'Klasse', sortTitle: 'Class', category: 'css', displayCode: '.h2', aliases: ['class inni class'], short: 'En klasse velger et kort inni en gruppe' },
  ];
  assert.equal(searchEntries(entries, '.h2')[0].id, 'class');
  assert.equal(searchEntries(entries, '<h2>')[0].id, 'type');
  assert.equal(searchEntries(entries, 'class inni class')[0].id, 'class');
  assert.equal(searchEntries(entries, '', 'html').length, 0);
});
