import { test, expect } from '../../src/fixtures/test.fixture';
import loginData from '../../src/utils/loginTestData.json';

test.describe('Network Interception & Mocking', () => {
    test('should modify backend response on the fly to simulate high balance', async ({ page, loginPage }) => {
        const validUser = loginData.find((user: any) => user.expectedToPass === true);

        if (!validUser) {
            throw new Error('Valid user data not found in loginTestData.json');
        }

        const MOCKED_BALANCE = 999999999;

        await page.route('**/login', async (route) => {
            const response = await route.fetch();
            const json = await response.json();

            if (json.user) {
                json.user.balance = MOCKED_BALANCE;
            }

            await route.fulfill({ response, json });
        });

        await loginPage.goto();
        await loginPage.loginAs(validUser.username, validUser.password);

        const userBalanceDisplay = page.locator('[data-test="sidenav-user-balance"]');
        const expectedBalanceText = `$${(MOCKED_BALANCE / 100).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

        await expect(userBalanceDisplay).toContainText(expectedBalanceText);
    });
});