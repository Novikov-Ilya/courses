import { Locator, Page } from '@playwright/test';
import { LoginDictionary } from '../types/i18n';

/**
 * Page Object Model representing the Authentication Login View.
 * Encapsulates structural locators and component interaction protocols with strict typing.
 */
export class LoginPage {
  public readonly page: Page;
  private readonly dictionary: LoginDictionary;

  // Strongly typed Playwright locators
  public readonly headingTitle: Locator;
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly submitButton: Locator;
  public readonly registrationLink: Locator;
  public readonly errorFeedbackContainer: Locator;

  constructor(page: Page, dictionary: LoginDictionary) {
    this.page = page;
    this.dictionary = dictionary;

    // Rigid semantic layout anchors mapped across custom React element boundaries
    this.headingTitle = page.getByRole('heading', { name: this.dictionary.loginPageTitle });
    this.emailInput = page.getByRole('textbox', { name: this.dictionary.inputLabelEmail });
    this.passwordInput = page.getByLabel(this.dictionary.inputLabelPassword);
    this.submitButton = page.getByRole('button', { name: this.dictionary.buttonLogin });
    this.registrationLink = page.getByRole('link', { name: this.dictionary.linkRegistration });
    
    // Abstracted reference addressing standard contextual and error typography containers
    this.errorFeedbackContainer = page.locator('.FormErrorStyled, form div, form p');
  }

  /**
   * Orchestrates environment navigation directly to the isolated authentication route.
   */
  public async navigateTo(): Promise<void> {
    await this.page.goto('/login');
  }

  /**
   * High-utility action abstraction managing standard semantic user text entry inputs.
   */
  public async fillCredentials(email?: string, password?: string): Promise<void> {
    if (email !== undefined) {
      await this.emailInput.fill(email);
    }
    if (password !== undefined) {
      await this.passwordInput.fill(password);
    }
  }

  /**
   * Executes explicit interaction clicks targeting the primary submit command interface.
   */
  public async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Combined high-level macro method modeling the entire form dispatch workflow sequentially.
   */
  public async executeLoginWorkflow(email?: string, password?: string): Promise<void> {
    await this.fillCredentials(email, password);
    await this.clickSubmitButton();
  }

  /**
   * Simulates a programmatic shift in user input focus elements to evaluate onBlur reactions.
   */
  public async triggerFieldBlurSequence(sourceField: 'email' | 'password'): Promise<void> {
    if (sourceField === 'email') {
      await this.emailInput.focus();
      await this.passwordInput.focus();
    } else {
      await this.passwordInput.focus();
      await this.emailInput.focus();
    }
  }
}