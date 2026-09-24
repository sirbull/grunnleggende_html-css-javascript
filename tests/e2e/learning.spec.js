import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('complete lesson, glossary, focus, editor and nested deployment', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('#/html/basic/document');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Oppbygningen av et HTML-dokument');
  await page.locator('.article').focus(); await page.keyboard.press('ArrowDown');
  await expect(page.locator('.reading-step.active')).toHaveAttribute('data-step', 'head');
  const term = page.locator('[data-term=html-element]').first(); await term.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible(); await page.keyboard.press('Escape'); await expect(term).toBeFocused();
  const focusToggle = page.getByRole('button', { name: 'Fokusmodus', exact: true });
  await expect(focusToggle).toHaveAttribute('aria-pressed', 'true');
  await focusToggle.click();
  await page.reload(); await expect(page.getByRole('button', { name: 'Fokusmodus', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: /Prøv selv i/ }).click();
  const editor = page.getByRole('textbox', { name: 'HTML-kode', exact: true });
  await editor.fill('<h1>Min nye side</h1><button>Klikk meg</button>');
  const preview = page.frameLocator('iframe[title^="Resultat:"]');
  await expect(preview.locator('h1')).toHaveText('Min nye side');
  await page.getByRole('tab', { name: 'CSS', exact: true }).click(); await page.getByRole('textbox', { name: 'CSS-kode', exact: true }).fill('h1 { color: rgb(10, 70, 30); }');
  await expect(preview.locator('h1')).toHaveCSS('color', 'rgb(10, 70, 30)');
  await page.getByRole('tab', { name: 'JavaScript', exact: true }).click();
  await page.getByRole('textbox', { name: 'JavaScript-kode', exact: true }).fill('document.querySelector("button").onclick = () => document.querySelector("h1").textContent = "Klikket";');
  await page.getByRole('button', { name: 'Kjør kode', exact: true }).click(); await preview.getByRole('button').click(); await expect(preview.locator('h1')).toHaveText('Klikket');
  await page.getByRole('button', { name: 'Tilbakestill kode' }).click(); await expect(preview.locator('h1')).toHaveText('Min filmside');
  await page.getByRole('button', { name: 'Lukk verksted' }).click(); await expect(page.getByRole('button', { name: /Prøv selv i/ })).toBeFocused();
  expect(errors).toEqual([]);
});

test('reference searches code and natural Norwegian, details and deep links', async ({ page }) => {
  await page.goto('#/reference');
  const search = page.getByRole('searchbox');
  for (const text of ['h2', '.h2', 'class inni class', 'query selector', 'endre tekst javascript']) {
    await search.fill(text); await expect(page.locator('.reference-card').first()).toBeVisible();
  }
  await search.fill('class inni class'); await page.getByRole('button', { name: 'CSS', exact: true }).click();
  await expect(page.locator('.reference-card').first()).toBeVisible();
  await page.locator('.reference-card').first().focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Vanlige feil' })).toBeVisible();
  await page.getByRole('button', { name: 'Prøv selv', exact: true }).click(); await expect(page.locator('.cm-editor').first()).toBeVisible();
  await page.getByRole('button', { name: 'Lukk verksted' }).click();
  await page.getByRole('link', { name: /Tilbake til ordlisten/ }).click(); await expect(search).toHaveValue('class inni class');
  await page.goto('#/reference/css-class-selector'); await expect(page.getByRole('heading', { level: 1 })).toContainText('.h2');
});

test('axe, mobile reflow and reduced motion', async ({ page }) => {
  await page.goto('#/html/basic/document'); await expect(page.locator('.reading-step')).toHaveCount(5);
  let results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(results.violations).toEqual([]);
  await page.setViewportSize({ width: 320, height: 780 }); await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('#/reference'); await expect(page.getByRole('searchbox')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze(); expect(results.violations).toEqual([]);
});

test('speech lifecycle and navigation cleanup using deterministic browser mock', async ({ page }) => {
  await page.addInitScript(() => {
    window.__speech = { calls: [], cancel: 0 };
    Object.defineProperty(window, 'speechSynthesis', { value: { getVoices: () => [{name:'Norsk teststemme',lang:'nb-NO'}], speak: u => window.__speech.calls.push(u.text), cancel: () => window.__speech.cancel++, addEventListener() {}, removeEventListener() {} } });
    window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  });
  await page.goto('#/html/basic/document'); await page.getByRole('button', { name: 'Les høyt', exact: true }).click();
  await page.getByRole('button', { name: 'Pause', exact: true }).click(); await page.getByRole('button', { name: 'Fortsett', exact: true }).click();
  await page.getByRole('combobox', { name: 'Lesehastighet' }).selectOption('1.3');
  await page.getByRole('button', { name: 'Stopp', exact: true }).click();
  await page.getByRole('link', { name: /Forrige leksjon/ }).click();
  expect(await page.evaluate(() => window.__speech.calls.length)).toBeGreaterThan(1);
  expect(await page.evaluate(() => window.__speech.cancel)).toBeGreaterThan(3);
});
