import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Authentication flow', () => {
    test('should login successfully with valid credentials', async ({ page, loginPage }) => {
        await loginPage.goto('http://localhost:3000/signin');
        await loginPage.loginAs('Heath93', 's3cret');
        await expect(page).toHaveURL('http://localhost:3000/');
        await expect(page.locator('[data-test="sidenav-signout"]')).toBeVisible();
    });
});