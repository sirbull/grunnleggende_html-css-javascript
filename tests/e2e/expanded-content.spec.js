import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('JSON has a definition, a working example and a link to the lesson', async ({ page }) => {
  await page.goto('#/reference');
  await page.getByRole('searchbox').fill('JSON');
  await expect(page.locator('.reference-card').first()).toContainText('JavaScript Object Notation');
  await page.locator('.reference-card').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('JSON');
  await expect(page.locator('.reference-detail')).toContainText('JSON er tekst, ikke et JavaScript-objekt');
  await expect(page.getByRole('link', { name: 'JSON.parse()' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'JSON.stringify()' })).toBeVisible();
  await page.getByRole('button', { name: 'Prøv selv', exact: true }).click();
  const preview = page.frameLocator('iframe[title^="Resultat:"]');
  await expect(preview.locator('#resultat')).toHaveText('Skogsturen: 3 km');
  await page.getByRole('link', { name: /Gå til leksjonen/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('JSON og lokal lagring');
  await expect(page.locator('.reading-step')).toHaveCount(6);
  const term = page.locator('[data-term="what-is-json"]');
  await term.click();
  await expect(page.getByRole('dialog')).toContainText('JavaScript Object Notation');
});

test('topic explanations appear for both searches and category filters', async ({page}) => {
  for (const [query, category, phrase] of [
    ['HTML','HTML','HyperText Markup Language'],
    ['CSS','CSS','Cascading Style Sheets'],
    ['JavaScript','JavaScript','programmeringsspråk'],
    ['DOM','DOM / Web API','Document Object Model'],
    ['universell utforming','Tilgjengelighet','ulike forutsetninger'],
  ]) {
    await page.goto('#/reference');
    await page.getByRole('searchbox').fill(query);
    await expect(page.locator('.category-overview')).toContainText(phrase);
    await expect(page.locator('.reference-card').first()).toContainText(phrase);
    await page.getByRole('searchbox').fill('');
    await page.getByRole('button',{name:category,exact:true}).click();
    await expect(page.locator('.category-overview')).toContainText(phrase);
    await page.locator('.category-overview a').click();
    await expect(page.getByRole('heading',{name:'Når bruker jeg dette?'})).toBeVisible();
  }
  await page.goto('#/reference/what-is-javascript');
  await expect(page.locator('.reference-detail')).toContainText('ikke en forkortelse');
  await page.goto('#/reference?category=html');
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('four new beginner cases have working interactions', async ({page}) => {
  const demo=page.frameLocator('iframe[title="Visuelt kodeeksempel"]');
  await page.goto('#/combined/basic/project-counter');
  await expect(page.getByRole('heading',{level:1})).toHaveText('En teller med pluss og minus');
  await demo.getByRole('button',{name:'Én flere'}).click();await expect(demo.locator('output')).toHaveText('1');
  await demo.getByRole('button',{name:'Nullstill'}).click();await expect(demo.getByRole('button',{name:'Én færre'})).toBeDisabled();
  await page.goto('#/combined/basic/project-color');await expect(page.getByRole('heading',{level:1})).toHaveText('En fargevelger for et kort');
  await demo.getByRole('combobox').selectOption('hav');await expect(demo.locator('#kort')).toHaveClass('kort hav');
  await page.goto('#/combined/basic/project-tips');await expect(page.getByRole('heading',{level:1})).toHaveText('Et tips om gangen');
  await demo.getByRole('button',{name:'Forrige tips'}).click();await expect(demo.locator('#posisjon')).toHaveText('Tips 3 av 3');
  await page.goto('#/combined/basic/project-gallery');await expect(page.getByRole('heading',{level:1})).toHaveText('En liten bildevelger');
  await demo.getByRole('combobox').selectOption('2');await expect(demo.getByRole('img')).toHaveAttribute('alt','Tre mørkegrønne grantrær');await expect(demo.locator('figcaption')).toHaveText('Skog');
});

test('four new intermediate cases validate and update their models',async({page})=>{
  const demo=page.frameLocator('iframe[title="Visuelt kodeeksempel"]');
  await page.goto('#/combined/intermediate/project-budget');await expect(page.getByRole('heading',{level:1})).toHaveText('En enkel budsjettkalkulator');
  await demo.getByRole('button',{name:'Beregn'}).click();await expect(demo.locator('#resultat')).toContainText('900');
  await page.goto('#/combined/intermediate/project-menu');await expect(page.getByRole('heading',{level:1})).toHaveText('En tilgjengelig mobilmeny');
  await demo.getByRole('button',{name:'Vis meny'}).click();await demo.getByRole('link',{name:'Rute',exact:true}).click();await expect(demo.locator('nav')).not.toBeVisible();await expect(demo.locator('#rute')).toBeFocused();
  await page.goto('#/combined/intermediate/project-faq');await expect(page.getByRole('heading',{level:1})).toHaveText('Spørsmål og svar med én åpen om gangen');
  await demo.locator('summary').nth(0).click();await demo.locator('summary').nth(1).click();await expect(demo.locator('details[open]')).toHaveCount(1);
  await page.goto('#/combined/intermediate/project-sort');await expect(page.getByRole('heading',{level:1})).toHaveText('Sorter et lite bibliotek');
  await demo.getByRole('combobox').selectOption('sider');await expect(demo.locator('li').first()).toContainText('Årstider');
});

test('four new advanced cases handle state, filters, URLs and modal editing',async({page})=>{
  const demo=page.frameLocator('iframe[title="Visuelt kodeeksempel"]');
  await page.goto('#/combined/advanced/project-cart');await expect(page.getByRole('heading',{level:1})).toHaveText('En handlekurv uten betaling');
  await demo.getByRole('button',{name:'Legg til Notatbok'}).click();await demo.getByRole('button',{name:'Legg til Penn'}).click();await expect(demo.locator('#sum')).toContainText('60');
  await demo.getByRole('button',{name:'Tøm kurven'}).click();await expect(demo.locator('#kurv li')).toHaveCount(0);
  await page.goto('#/combined/advanced/project-pagination');await expect(page.getByRole('heading',{level:1})).toHaveText('Søk, filter og sideinndeling');
  await demo.getByRole('button',{name:'Neste side'}).click();await expect(demo.locator('#status')).toContainText('Side 2 av 3');
  await demo.getByRole('searchbox').fill('ingen slike');await expect(demo.locator('#status')).toContainText('0 treff');await expect(demo.getByRole('button',{name:'Neste side'})).toBeDisabled();
  await page.goto('#/combined/advanced/project-bookmarks');await expect(page.getByRole('heading',{level:1})).toHaveText('En lokal leseliste');
  await demo.getByRole('textbox',{name:'Tittel',exact:true}).fill('Eksempel');await demo.getByRole('textbox',{name:'Nettadresse'}).fill('https://example.com');await demo.getByRole('button',{name:'Lagre lenke'}).click();await expect(demo.getByRole('link',{name:'Eksempel'})).toHaveAttribute('href','https://example.com');
  await page.goto('#/combined/advanced/project-edit-dialog');await expect(page.getByRole('heading',{level:1})).toHaveText('Rediger et kort i en modal dialog');
  await demo.getByRole('button',{name:'Rediger prosjekt',exact:true}).click();await demo.getByRole('textbox',{name:'Prosjektnavn'}).fill('Turguide');await demo.getByRole('button',{name:'Avbryt',exact:true}).click();await expect(demo.locator('#navn')).toHaveText('Filmside');
  await demo.getByRole('button',{name:'Rediger prosjekt',exact:true}).click();await demo.getByRole('textbox',{name:'Prosjektnavn'}).fill('Turguide');await demo.getByRole('button',{name:'Lagre',exact:true}).click();await expect(demo.locator('#navn')).toHaveText('Turguide');await expect(demo.getByRole('button',{name:'Rediger prosjekt',exact:true})).toBeFocused();
});
