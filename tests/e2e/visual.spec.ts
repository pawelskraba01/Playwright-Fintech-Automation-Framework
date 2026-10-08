import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Visual Regression Testing', () => {
    test('login page visual layout should remain unchanged', async ({ page, loginPage }) => {
        await loginPage.goto();

        await expect(page).toHaveScreenshot('login-page.png', {
            maxDiffPixels: 100,
        });
    });
});