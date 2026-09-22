import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { previewDocument } from '../../src/core/preview.js';
import AxeBuilder from '@axe-core/playwright';
const json = async path => JSON.parse(await readFile(`public/${path}`, 'utf8'));
const manifest = await json('content/manifest.json');
const ref = await json(manifest.reference);
const entries = (await Promise.all(ref.files.map(json))).flat();
const lessons = manifest.sections.flatMap(s => s.tracks.flatMap(t => t.lessons.map(l => ({...l,route:`#/${s.id}/${t.id}/${l.id}`}))));

test('all lessons, all levels and content requests work in a nested production build', async ({page}) => {
  test.setTimeout(120000);
  const errors=[], failed=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
  for(const lesson of lessons){
    await page.goto(lesson.route);
    await expect(page.getByRole('heading',{level:1})).toHaveText(lesson.title);
    await expect(page.locator('.visual-content')).not.toBeEmpty();
    await expect(page.locator('.reading-step').first()).toBeVisible();
  }
  expect(errors).toEqual([]);expect(failed).toEqual([]);
});

test('every lesson and reference example executes without startup JavaScript errors', async ({page}) => {
  test.setTimeout(180000);
  await page.goto('#/html/basic/intro');
  const examples=[];
  for(const lesson of lessons){
    const data=await Promise.all(['index.html','style.css','script.js'].map(file=>readFile(`public/${lesson.example}/${file}`,'utf8')));
    examples.push({id:lesson.id,files:Object.fromEntries(['html','css','js'].map((key,i)=>[key,data[i]]))});
  }
  examples.push(...entries.filter(e=>e.files).map(e=>({id:e.id,files:e.files})));
  await page.evaluate(()=>{
    document.body.replaceChildren(); const frame=document.createElement('iframe');frame.id='test-preview';frame.sandbox='allow-scripts';document.body.append(frame);
    window.__messages=[];window.addEventListener('message',e=>{if(e.source===frame.contentWindow)window.__messages.push(e.data);});
  });
  const failures=[];
  for(const example of examples){
    const token=example.id;const doc=previewDocument(example.files,token);
    await page.evaluate(doc=>{window.__messages=[];document.querySelector('iframe').srcdoc=doc;},doc);
    await expect.poll(()=>page.evaluate(token=>window.__messages.some(m=>m.token===token && (m.type==='ready'||m.type==='error')),token),{message:example.id,timeout:5000}).toBe(true);
    const errors=await page.evaluate(token=>window.__messages.filter(m=>m.token===token&&m.type==='error'),token);
    if(errors.length)failures.push({id:example.id,errors:errors.map(e=>e.text)});
  }
  expect(failures).toEqual([]);
});

test('representative accessibility across sections, dialog and editor',async({page})=>{
  test.setTimeout(90000);
  for(const route of ['#/css/basic/css-spacing','#/javascript/basic/js-functions','#/combined/advanced/project-tasks','#/reference/css-class-selector']){
    await page.goto(route);await expect(page.getByRole('heading',{level:1})).toBeVisible();
    const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(results.violations,route).toEqual([]);
  }
  await page.goto('#/html/basic/document');await page.locator('[data-term]').first().click();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');await page.getByRole('button',{name:/Prøv selv i/}).click();
  await expect(page.locator('.cm-editor').first()).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
});

test('miniapps respond, persist edits and keep code isolated',async({page})=>{
  await page.goto('#/combined/basic/project-profile');
  const demo=page.frameLocator('iframe[title="Visuelt kodeeksempel"]');
  await demo.getByRole('button',{name:'Vis mitt tips'}).click();await expect(demo.locator('#tips')).toBeVisible();
  await expect(demo.getByRole('button')).toHaveAttribute('aria-expanded','true');
  await page.goto('#/combined/intermediate/project-filter');
  await demo.getByRole('searchbox').fill('tur');await expect(demo.locator('article:visible')).toHaveCount(1);
  await page.goto('#/combined/advanced/project-tasks');
  await demo.getByRole('textbox').fill('Lær HTML');await demo.getByRole('button',{name:'Legg til',exact:true}).click();await expect(demo.locator('li')).toHaveCount(1);
  await demo.getByRole('button',{name:'Fullfør Lær HTML'}).click();await expect(demo.locator('li')).toHaveCount(0);
  await page.getByRole('button',{name:/Prøv selv i/}).click();
  await page.getByRole('tab',{name:'JavaScript',exact:true}).click();
  await page.getByRole('textbox',{name:'JavaScript-kode',exact:true}).fill('try { parent.document.body.textContent = "Ikke tillatt"; } catch { document.body.textContent = "Isolert"; }');
  await page.getByRole('button',{name:'Kjør kode',exact:true}).click();
  await expect(page.frameLocator('iframe[title^="Resultat:"]').locator('body')).toHaveText('Isolert');
  await expect(page.getByRole('heading',{level:1})).toHaveText('En liten oppgaveapp');
  await page.reload();await page.getByRole('button',{name:/Prøv selv i/}).click();await page.getByRole('tab',{name:'JavaScript',exact:true}).click();
  await expect(page.getByRole('textbox',{name:'JavaScript-kode',exact:true})).toContainText('parent.document');
});
