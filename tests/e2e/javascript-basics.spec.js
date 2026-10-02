import { test, expect } from '@playwright/test';
import { currentLesson, lessonTitle, tryButton } from './helpers.js';

test('beginner lessons show JavaScript alone and open the matching workshop tab', async ({ page }) => {
  await page.goto('#/javascript/basic/js-intro');
  const example = currentLesson(page).locator('.example').first();
  await expect(example.getByRole('tab', { name: 'JavaScript-kode' })).toHaveAttribute('aria-selected', 'true');
  await expect(example.getByRole('tab', { name: 'HTML-kode' })).toHaveCount(0);
  await expect(example.getByRole('tab', { name: 'CSS-kode' })).toHaveCount(0);
  await example.getByRole('tab', { name: 'Resultat', exact: true }).click();
  await expect(example.locator('.console-output')).toHaveText('Hei!\n');
  await tryButton(page).click();
  await expect(page.getByRole('tab', { name: 'JavaScript', exact: true })).toHaveAttribute('aria-selected', 'true');
  const editor = page.getByRole('textbox', { name: 'JavaScript-kode', exact: true });
  await editor.fill('console.log("Jeg lærer.");');
  await page.getByRole('button', { name: 'Kjør kode', exact: true }).click();
  await expect(page.locator('.workshop .console-output')).toHaveText('Jeg lærer.\n');
});

test('while exercises count, stop and can skip the block on the first check', async ({ page }) => {
  await page.goto('#/javascript/basic/js-loops');
  await tryButton(page).click();
  const output = page.locator('.workshop .console-output');
  await expect(output).toHaveText('1\n2\n3\nFerdig\n');
  const editor = page.getByRole('textbox', { name: 'JavaScript-kode', exact: true });
  await editor.fill('let teller = 1;\nwhile (teller <= 2) {\n  console.log(teller);\n  teller = teller + 1;\n}\nconsole.log("Ferdig");');
  await page.getByRole('button', { name: 'Kjør kode', exact: true }).click();
  await expect(output).toHaveText('1\n2\nFerdig\n');
  await editor.fill('let teller = 3;\nwhile (teller <= 2) {\n  console.log(teller);\n  teller = teller + 1;\n}\nconsole.log("Ferdig");');
  await page.getByRole('button', { name: 'Kjør kode', exact: true }).click();
  await expect(output).toHaveText('Ferdig\n');
});

test('old bookmarks reach moved lessons and canonical routes', async ({ page }) => {
  for (const [previous, current, title] of [
    ['intermediate/js-loops', 'basic/js-loops', 'Gjenta med while'],
    ['basic/js-dom-text', 'intermediate/js-dom-text', 'Finn et element og endre teksten'],
    ['basic/js-events', 'intermediate/js-events', 'Kjør en funksjon ved et klikk'],
  ]) {
    await page.goto(`#/javascript/${previous}`);
    await expect(lessonTitle(page)).toHaveText(title);
    await expect(page).toHaveURL(new RegExp(`#/javascript/${current}$`));
  }
});
