import { test, expect } from '../../src/fixtures/test.fixture';
import loginData from '../../src/utils/loginTestData.json';

test.describe('Data-Driven Login Tests', () => {
    for (const data of loginData) {
        test(`should attempt login for user: ${data.username}`, async ({ page, loginPage }) => {
            await loginPage.goto();
            await loginPage.loginAs(data.username, data.password);

            if (data.expectedToPass) {
                await expect(page).toHaveURL('http://localhost:3000/');
            } else {
                const errorMessage = page.locator('[data-test="signin-error"]');
                await expect(errorMessage).toBeVisible();
            }
        });
    }
});