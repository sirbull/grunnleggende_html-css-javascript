import { test, expect } from '@playwright/test';
import { currentLesson, lessonTitle, tryButton, showResult } from './helpers.js';

test('every step has a visual beside the text, on alternating sides', async ({ page }) => {
  await page.goto('#/html/basic/html-headings');
  const steps = currentLesson(page).locator('.reading-step');
  await expect(steps).toHaveCount(4);
  for (let i = 0; i < 4; i++) await expect(steps.nth(i).locator('.step-visual')).toHaveCount(1);
  const side = async i => steps.nth(i).evaluate(step => step.querySelector('.step-text').getBoundingClientRect().left < step.querySelector('.step-visual').getBoundingClientRect().left ? 'text-left' : 'text-right');
  expect([await side(0), await side(1)]).toEqual(['text-left', 'text-right']);
  // Alle steg viser koden først, med linjene steget handler om markert. Resultatet er én fane unna.
  for (let i = 0; i < 4; i++) await expect(steps.nth(i).getByRole('tab', { name: 'HTML-kode' })).toHaveAttribute('aria-selected', 'true');
  await expect(steps.nth(0).locator('.code-mark')).toHaveText(['<h1>Filmer jeg liker</h1>']);
  await expect(steps.nth(0).locator('.step-visual iframe')).toHaveCount(0);
  await expect(steps.nth(2).locator('.step-visual .example pre')).toContainText('<h2>');
  await page.setViewportSize({ width: 800, height: 900 });
  // På smal skjerm står teksten alltid over illustrasjonen.
  expect(await steps.nth(1).evaluate(step => step.querySelector('.step-text').getBoundingClientRect().top < step.querySelector('.step-visual').getBoundingClientRect().top)).toBe(true);
});

test('lessons with an extra explanation get it as its own tab, without a second preview', async ({ page }) => {
  await page.goto('#/javascript/basic/js-if');
  const example = currentLesson(page).locator('.reading-step').first().locator('.example');
  await expect(example.getByRole('tab', { name: 'JavaScript-kode' })).toHaveAttribute('aria-selected', 'true');
  await example.getByRole('tab', { name: 'Programflyt' }).click();
  await expect(example.locator('.example-extra .trace-list li')).not.toHaveCount(0);
  await expect(example.locator('.example-extra iframe')).toHaveCount(0);
});

test('focus mode blurs everything but what is read now, ignores hover and follows clicks', async ({ page }) => {
  await page.goto('#/css/intermediate/css-flex');
  const toggle = page.getByRole('button', { name: 'Fokusmodus', exact: true });
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  const steps = currentLesson(page).locator('.reading-step');
  const style = locator => locator.evaluate(node => ({ filter: getComputedStyle(node).filter, opacity: Number(getComputedStyle(node).opacity) }));
  await expect(steps.first()).toHaveClass(/active/);
  // Musepekeren over et senere steg skjerper det ikke.
  await steps.nth(2).hover();
  await expect.poll(async () => (await style(steps.nth(2))).opacity).toBeLessThan(.3);
  expect((await style(steps.nth(2))).filter).toContain('blur');
  // Slutten av leksjonen og neste leksjonshode er også dempet.
  await expect.poll(async () => (await style(currentLesson(page).locator('.lesson-footer'))).opacity).toBeLessThan(.5);
  await expect.poll(async () => (await style(page.locator('#lesson-intermediate-css-grid .lesson-header'))).opacity).toBeLessThan(.5);
  // Klikk i steget gjør det aktivt og skarpt.
  await steps.nth(2).locator('.step-text').click({ position: { x: 20, y: 20 } });
  await expect(steps.nth(2)).toHaveClass(/active/);
  await expect.poll(async () => (await style(steps.nth(2))).opacity).toBe(1);
  await expect.poll(async () => (await style(currentLesson(page).locator('.lesson-footer'))).opacity).toBe(1);
  await toggle.click();
  await expect.poll(async () => (await style(steps.first())).opacity).toBe(1);
});

test('arrow keys stop on the heading of a new lesson before its text', async ({ page }) => {
  await page.goto('#/html/basic/html-images');
  await expect(lessonTitle(page)).toHaveText('Bilder og alternativ tekst');
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('.reading-step.active')).toHaveAttribute('id', 'step-html-links-practice');
  await page.keyboard.press('ArrowDown');
  const header = page.locator('#lesson-basic-html-images .lesson-header');
  await expect(header).toBeInViewport();
  await expect.poll(() => header.evaluate(h => h.getBoundingClientRect().top)).toBeLessThan(150);
  await expect(page.locator('.reading-step.active')).toHaveAttribute('id', 'step-html-images-concept');
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('.reading-step.active')).toHaveAttribute('id', 'step-html-images-concept');
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('.reading-step.active')).toHaveAttribute('id', 'step-html-images-mechanism');
});

test('arrow keys keep moving between steps after tabbing to a button, and Tab continues from the new step', async ({ page }) => {
  await page.goto('#/html/basic/html-headings');
  const mechanismStep = page.locator('#step-html-headings-mechanism');
  await mechanismStep.getByRole('button', { name: /Prøv selv i/ }).focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('.reading-step.active')).toHaveAttribute('id', 'step-html-headings-practice');
  await expect(page.locator('#step-html-headings-practice')).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('.reading-step.active')).toHaveAttribute('id', 'step-html-headings-mechanism');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.activeElement.closest('.reading-step')?.id)).toBe('step-html-headings-mechanism');
  // Pil ned/opp i en fane bytter også lesesteg; venstre/høyre bytter mellom kode og resultat.
  await mechanismStep.getByRole('tab', { name: 'HTML-kode' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(mechanismStep.getByRole('tab', { name: 'Resultat' })).toHaveAttribute('aria-selected', 'true');
  await expect(mechanismStep.locator('.example-result .dom-tree')).toHaveCount(0);
  await expect(mechanismStep.locator('.example-result iframe')).toHaveCount(1);
});

test('links in the preview never load the learning site inside the frame', async ({ page }) => {
  await page.goto('#/html/basic/html-links');
  const demo = await showResult(page);
  await demo.getByRole('link', { name: 'Gå til tipsene' }).click();
  await expect(demo.locator('webverksted-melding')).toContainText('hopper til #tips');
  await expect(demo.locator('h2#tips')).toBeVisible();
  await expect(demo.locator('.site-header')).toHaveCount(0);
  await tryButton(page).click();
  await page.getByRole('textbox', { name: 'HTML-kode', exact: true }).fill('<a href="om.html">Om meg</a> <a href="https://example.com">Ekstern</a> <a href="#finnes-ikke">Mangler</a>');
  const preview = page.frameLocator('iframe[title^="Resultat:"]');
  await preview.getByRole('link', { name: 'Om meg' }).click();
  await expect(preview.locator('webverksted-melding')).toContainText('«om.html». Den siden finnes ikke ennå');
  await preview.getByRole('link', { name: 'Ekstern' }).click();
  await expect(preview.locator('webverksted-melding')).toContainText('Eksterne nettsider åpnes ikke');
  await preview.getByRole('link', { name: 'Mangler' }).click();
  await expect(preview.locator('webverksted-melding')).toContainText('id="finnes-ikke"');
  await expect(page.locator('.console-output')).toContainText('Lenke:');
  await expect(preview.getByRole('link', { name: 'Om meg' })).toBeVisible();
});
