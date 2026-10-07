import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page); 
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('[data-test="signin-submit"]');
    this.errorMessage = page.locator('[data-test="signin-error"]');
  }

  /**
   * Authenticates a user via the UI login form.
   * 
   * @param username - Registered user's username
   * @param password - User's password
   */
  async loginAs(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.waitForIdle();
  }
}