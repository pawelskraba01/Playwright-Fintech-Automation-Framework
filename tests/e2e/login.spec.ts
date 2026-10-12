import { test, expect } from '../../src/fixtures/test.fixture';
import loginData from '../../src/utils/loginTestData.json';

test.describe('Data-Driven Login Tests', () => {
    test.use({ storageState: { cookies: [], origins: [] } });
    for (const data of loginData) {
        test(`should attempt login for user: ${data.username}`, async ({ page, loginPage }) => {
            await loginPage.goto();
            await loginPage.loginAs(data.username, data.password);

            if (data.expectedToPass) {
                await expect(page).toHaveURL(`${process.env.BASE_URL}/`);
            } else {
                const errorMessage = page.locator('[data-test="signin-error"]');
                await expect(errorMessage).toBeVisible();
            }
        });
    }
});