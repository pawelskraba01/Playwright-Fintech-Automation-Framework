import { test, expect } from '@playwright/test';

test.describe('Backend API Tests', () => {
    const API_URL = 'http://localhost:3001';

    test('should authenticate user via API and return correct user object', async ({ request }) => {
        const response = await request.post(`${API_URL}/login`, {
            data: {
                username: 'Heath93',
                password: 's3cret',
            },
        });

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');

        const responseBody = await response.json();
        expect(responseBody.user).toBeDefined();
        expect(responseBody.user.username).toBe('Heath93');
        expect(responseBody.user.balance).toBeGreaterThanOrEqual(0);
    });
});