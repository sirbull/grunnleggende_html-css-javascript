import { test, expect } from '@playwright/test';
import { axeViolations, currentLesson, lessonTitle, tryButton } from './helpers.js';

test('complete lesson, glossary, focus, editor and nested deployment', async ({ page }) => {
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('#/html/basic/document');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('HTML');
  await expect(lessonTitle(page)).toHaveText('Oppbygningen av et HTML-dokument');
  await page.locator('.article').focus();
  // Første pil ned går fra leksjonsoverskriften til første steg, neste til steg to.
  await page.keyboard.press('ArrowDown'); await expect(page.locator('.reading-step.active')).toHaveAttribute('data-step', 'skeleton');
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('.reading-step.active')).toHaveAttribute('data-step', 'head');
  const term = currentLesson(page).locator('[data-term=html-element]').first(); await term.focus(); await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible(); await page.keyboard.press('Escape'); await expect(term).toBeFocused();
  const focusToggle = page.getByRole('button', { name: 'Fokusmodus', exact: true });
  await expect(focusToggle).toHaveAttribute('aria-pressed', 'true');
  await focusToggle.click();
  await page.reload(); await expect(page.getByRole('button', { name: 'Fokusmodus', exact: true })).toHaveAttribute('aria-pressed', 'false');
  await tryButton(page).click();
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
  await page.getByRole('button', { name: 'Lukk verksted' }).click(); await expect(tryButton(page)).toBeFocused();
  expect(errors).toEqual([]);
});

test('one long page per section keeps the address and lesson headers in step with reading', async ({ page }) => {
  await page.goto('#/html/basic/intro');
  await expect(page.locator('.lesson')).toHaveCount(14);
  await expect(page.locator('.track-title')).toHaveCount(3);
  await page.locator('#lesson-basic-html-links .reading-step').first().evaluate(step => step.scrollIntoView({ block: 'start' }));
  await page.mouse.wheel(0, 40);
  await expect(page).toHaveURL(/#\/html\/basic\/html-links$/);
  await expect(page).toHaveTitle(/^Lenker som gir mening · HTML/);
  await expect(page.locator('.crumb-lesson')).toContainText('Lenker som gir mening');
  await page.getByRole('button', { name: /Alle leksjoner/ }).click();
  await page.getByRole('link', { name: 'Skjemaer med gode ledetekster' }).click();
  await expect(page.locator('#lesson-nav-dialog')).not.toBeVisible();
  await expect(page).toHaveURL(/#\/html\/intermediate\/html-forms$/);
  await expect(lessonTitle(page)).toHaveText('Skjemaer med gode ledetekster');
  await expect(lessonTitle(page)).toBeFocused();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('HTML');
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
  await page.goto('#/html/basic/document'); await expect(currentLesson(page).locator('.reading-step')).toHaveCount(5);
  expect(await axeViolations(page)).toEqual([]);
  await page.setViewportSize({ width: 320, height: 780 }); await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('#/reference'); await expect(page.getByRole('searchbox')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await axeViolations(page)).toEqual([]);
});

test('speech settings sit in the menu, a small player controls playback and navigation cleans up', async ({ page }) => {
  await page.addInitScript(() => {
    window.__speech = { calls: [], cancel: 0 };
    const voices = [
      { name: 'Microsoft Jon - Norwegian (Bokmål)', lang: 'nb-NO', localService: true },
      { name: 'Microsoft Pernille Online (Natural) - Norwegian (Bokmål, Norway)', lang: 'nb-NO', localService: false },
      { name: 'English voice', lang: 'en-GB', localService: true },
    ];
    Object.defineProperty(window, 'speechSynthesis', { value: { getVoices: () => voices, speak: u => window.__speech.calls.push({ text: u.text, voice: u.voice?.name, rate: u.rate }), cancel: () => window.__speech.cancel++, addEventListener() {}, removeEventListener() {} } });
    window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  });
  await page.goto('#/html/basic/document');
  const player = page.getByRole('region', { name: 'Avspiller for opplesning' });
  await expect(player).toBeHidden();
  const menu = page.getByRole('button', { name: 'Opplesning' });
  await menu.click(); await expect(menu).toHaveAttribute('aria-expanded', 'true');
  // Den naturlige Edge-stemmen velges foran den eldre systemstemmen, og panelet sier at den er nettbasert.
  await expect(page.getByLabel('Stemme')).toHaveValue(/Pernille Online \(Natural\)/);
  await expect(page.locator('#speech-panel')).toContainText('Nettbasert stemme');
  await page.getByLabel('Hva skal leses?').selectOption('lesson');
  await page.getByRole('button', { name: 'Les høyt', exact: true }).click();
  await expect(page.locator('#speech-panel')).toBeHidden(); await expect(player).toBeVisible();
  await expect(player.getByRole('button', { name: 'Pause' })).toBeFocused();
  expect(await page.evaluate(() => window.__speech.calls[0])).toEqual({ text: 'Oppbygningen av et HTML-dokument.', voice: 'Microsoft Pernille Online (Natural) - Norwegian (Bokmål, Norway)', rate: 1 });
  await player.getByRole('button', { name: 'Pause' }).click(); await player.getByRole('button', { name: 'Fortsett' }).click();
  await player.getByRole('button', { name: 'Neste steg' }).click();
  await expect(page.locator('.reading-step.speaking')).toHaveCount(1);
  await player.getByRole('combobox', { name: 'Lesehastighet' }).selectOption('1.3');
  expect(await page.evaluate(() => window.__speech.calls.at(-1).rate)).toBe(1.3);
  await player.getByRole('button', { name: 'Stopp opplesning' }).click();
  await expect(player).toBeHidden(); await expect(menu).toBeFocused();
  await menu.click(); await page.getByRole('button', { name: 'Les høyt', exact: true }).click();
  await expect(player).toBeVisible();
  await page.locator('#main-nav').getByRole('link', { name: 'CSS', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('CSS');
  await expect(player).toBeHidden();
  expect(await page.evaluate(() => window.__speech.calls.length)).toBeGreaterThan(3);
  expect(await page.evaluate(() => window.__speech.cancel)).toBeGreaterThan(3);
});
