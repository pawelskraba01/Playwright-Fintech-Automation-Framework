import { test as setup, expect } from '@playwright/test';
import loginData from '../../src/utils/loginTestData.json';
import { LoginPage } from '../../src/pages/login.page';

const authFile = 'playwright-.auth/user.json';

setup('authenticate and save state', async ({ page }) => {
    const validUser = loginData.find((user: any) => user.expectedToPass === true);
    if (!validUser) {
        throw new Error('Valid user data not found in loginTestData.json');
    }

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginAs(validUser.username, validUser.password);

    await expect(page).toHaveURL(`${process.env.BASE_URL}/`);

    await page.context().storageState({ path: authFile });
});