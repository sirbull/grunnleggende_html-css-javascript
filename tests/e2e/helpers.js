import AxeBuilder from '@axe-core/playwright';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

// Fokusmodus demper med vilje tekst som ikke leses nå, og den kan slås av med én knapp.
// Kontrastregelen kjøres derfor uten de nedtonede stegene. Alle andre regler dekker hele siden.
export async function axeViolations(page) {
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    document.querySelectorAll('[data-dimmed]').forEach(node => node.removeAttribute('data-dimmed'));
    document.querySelectorAll('.focus-mode :is(.reading-step, .lesson-header, .lesson-footer, .track-title)').forEach(node => {
      if (Number(getComputedStyle(node).opacity) < 1) node.setAttribute('data-dimmed', '');
    });
  });
  const all = await new AxeBuilder({ page }).withTags(TAGS).disableRules(['color-contrast']).analyze();
  const contrast = await new AxeBuilder({ page }).withRules(['color-contrast']).exclude('[data-dimmed]').analyze();
  return [...all.violations, ...contrast.violations];
}

export const currentLesson = page => page.locator('.lesson.current');
export const lessonTitle = page => currentLesson(page).locator('.lesson-title');
export const tryButton = page => currentLesson(page).getByRole('button', { name: /Prøv selv i/ }).last();

// Resultatet vises først når leseren bytter fra kode til resultat.
export async function showResult(page) {
  await currentLesson(page).getByRole('tab', { name: 'Resultat' }).first().click();
  return page.frameLocator('.lesson.current .example-result:not([hidden]) iframe');
}
