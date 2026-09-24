import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('keyboard-only path through lesson, dialog, editor and next lesson', async ({page})=>{
  await page.goto('#/html/basic/document');await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Hopp til innhold'})).toBeFocused();
  await page.keyboard.press('Enter');await expect(page.locator('#main')).toBeFocused();
  async function tabTo(selector){
    for(let i=0;i<80;i++){
      if(await page.locator(selector).evaluateAll(nodes=>nodes.includes(document.activeElement)))return;
      await page.keyboard.press('Tab');
    }
    throw new Error(`Tab fant ikke ${selector}`);
  }
  await tabTo('.article');await page.keyboard.press('ArrowDown');await expect(page.locator('.reading-step.active')).toHaveAttribute('data-step','head');
  await tabTo('[data-term]');const term=await page.locator(':focus').getAttribute('data-term');
  await page.keyboard.press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Tab');await page.keyboard.press('Escape');await expect(page.locator(`[data-term="${term}"]`).first()).toBeFocused();
  await tabTo('.workshop-launch button');await page.keyboard.press('Enter');await expect(page.locator('.cm-editor').first()).toBeVisible();
  await tabTo('.cm-content[aria-label="HTML-kode"]');
  await page.keyboard.press('Control+End');await page.keyboard.type('<p>Laget med tastatur.</p>');
  await page.keyboard.press('Tab');await expect(page.locator('.cm-content[aria-label="HTML-kode"]')).not.toBeFocused();
  await tabTo('.lesson-bottom a.primary');await page.keyboard.press('Enter');
  await expect(page.getByRole('heading',{level:1})).toHaveText('Elementer, tagger og attributter');
});

test('dialog traps focus, backdrop closes, and focus mode keeps controls readable', async({page})=>{
  await page.goto('#/html/basic/document');
  const term=page.locator('[data-term]').first();await term.click();
  for(let i=0;i<8;i++){await page.keyboard.press('Tab');expect(await page.locator('#glossary-dialog').evaluate(d=>d.contains(document.activeElement))).toBe(true);}
  await page.mouse.click(3,3);await expect(page.getByRole('dialog')).not.toBeVisible();await expect(term).toBeFocused();
  await expect(page.getByRole('button',{name:'Fokusmodus',exact:true})).toHaveAttribute('aria-pressed','true');
  expect(await page.locator('.reading-step:not(.active)').first().evaluate(s=>getComputedStyle(s).filter)).toContain('blur');
  await term.focus();expect(await term.evaluate(t=>getComputedStyle(t.closest('.reading-step')).filter)).toBe('none');
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
});

test('320px and 200 percent scaling, forced colors and all editor panes',async({page})=>{
  await page.goto('#/html/basic/document');await page.getByRole('button',{name:/Prøv selv i/}).click();
  await page.getByRole('checkbox',{name:'Vis alle tre språk'}).check();
  await expect(page.locator('.editor-pane:visible')).toHaveCount(3);
  await page.setViewportSize({width:320,height:800});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(()=>document.documentElement.style.zoom='2');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.evaluate(()=>document.documentElement.style.zoom='');
  await page.emulateMedia({forcedColors:'active',reducedMotion:'reduce'});
  await expect(page.getByRole('button',{name:'Kjør kode',exact:true})).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
});

test('missing route, missing content and denied storage have usable fallbacks',async({page})=>{
  await page.goto('#/missing/basic/absent');await expect(page.getByRole('heading',{name:'Vi fant ikke innholdet'})).toBeVisible();
  await page.getByRole('link',{name:'Til første leksjon'}).click();await expect(page.getByRole('heading',{level:1})).toHaveText('Hva er HTML?');
  await page.route('**/content/html/basic/document.md',route=>route.fulfill({status:404,body:'missing',headers:{'cache-control':'no-store'}}));
  await page.goto('#/html/basic/document');await expect(page.getByRole('heading',{name:'Vi fant ikke innholdet'})).toBeVisible();
  await page.unroute('**/content/html/basic/document.md');
  await page.getByRole('button',{name:'Prøv igjen',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Oppbygningen av et HTML-dokument');
  await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Blocked','SecurityError');};});
  await page.reload();await page.getByRole('button',{name:/Prøv selv i/}).click();
  await page.getByRole('textbox',{name:'HTML-kode',exact:true}).fill('<h1>Uten lagring</h1>');
  await expect(page.frameLocator('iframe[title^="Resultat:"]').locator('h1')).toHaveText('Uten lagring');
});

test('level preference, alphabet and browser history stay consistent',async({page})=>{
  await page.goto('#/css/basic/css-intro');
  await page.getByRole('button',{name:'Alle leksjoner',exact:true}).click();
  await page.getByRole('combobox',{name:'Velg nivå'}).selectOption('advanced');
  await expect(page.getByRole('heading',{level:1})).toHaveText('Cascade, arv og spesifisitet');
  await expect(page.locator('#lesson-nav-dialog')).not.toBeVisible();
  await page.locator('#main-nav').getByRole('link',{name:'CSS',exact:true}).click();
  await page.getByRole('button',{name:'Alle leksjoner',exact:true}).click();
  await expect(page.getByRole('combobox',{name:'Velg nivå'})).toHaveValue('advanced');
  await page.keyboard.press('Escape');
  await page.goto('#/reference');await page.getByRole('button',{name:'Vis oppføringer på M',exact:true}).click();
  await expect(page.locator('.reference-card').first()).toBeVisible();await expect(page.getByRole('searchbox')).toBeVisible();
  await page.locator('.reference-card').first().click();await page.goBack();
  await expect(page.getByRole('button',{name:'Vis oppføringer på M',exact:true})).toHaveAttribute('aria-pressed','true');
});
