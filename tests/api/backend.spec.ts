import { test, expect } from '@playwright/test';
import loginData from '../../src/utils/loginTestData.json';

test.describe('Backend API Tests', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('should authenticate user via API and return correct user object', async ({ request }) => {
        const validUser = loginData.find((user: any) => user.expectedToPass === true);
        if (!validUser) throw new Error('Valid user data not found');

        const API_URL = process.env.API_URL;

        const response = await request.post(`${API_URL}/login`, {
            data: {
                username: validUser.username,
                password: validUser.password,
            },
        });

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(responseBody.user.username).toBe(validUser.username);
    });
});