import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specific path
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  /**
   * Helper method to wait for network idle (useful for modern SPAs)
   */
  async waitForIdle() {
    await this.page.waitForLoadState('networkidle');
  }
}