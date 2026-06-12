import { test, expect } from '@playwright/test';
import { LoginPage } from './pom/login.page';
import { LoginDictionary } from './types/i18n';

// Unified i18n vocabulary conforming strictly to the LoginDictionary type definition
const dictionary: LoginDictionary = {
  loginPageTitle: 'Login',
  inputLabelEmail: 'Email Address',
  inputPlaceholderEmail: 'Enter your email',
  inputNameEmail: 'email',
  inputLabelPassword: 'Password',
  inputPlaceholderPassword: 'Enter your password',
  inputNamePassword: 'password',
  buttonLogin: 'Log In',
  registerIfNoAccount: "Don't have an account?",
  linkRegistration: 'Register here'
};

test.describe('Login Module - TypeScript Page Object Model Verification Suite @login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    // Instantiate Page Object Model infrastructure prior to executing scenarios
    loginPage = new LoginPage(page, dictionary);
    await loginPage.navigateTo();
  });

  /* =========================================================================
     BUSINESS REQUIREMENTS TESTS (BRD COVERAGE)
     ========================================================================= */

  test('REQ-01 & REQ-10: Initial Layout Structural Validity and State Blank Baselines @smoke', async () => {
    await expect(loginPage.headingTitle).toBeVisible();
    await expect(loginPage.emailInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
    await expect(loginPage.emailInput).not.toHaveAttribute('data-error', 'true');
    await expect(loginPage.passwordInput).not.toHaveAttribute('data-error', 'true');
  });

  test('REQ-02: Registration Route Access Pathway Access Verification', async ({ page }) => {
    const contextText = page.getByText(dictionary.registerIfNoAccount, { exact: false });
    await expect(contextText).toBeVisible();
    await expect(loginPage.registrationLink).toBeVisible();
    
    await loginPage.registrationLink.click();
    await expect(page).toHaveURL(/\/registration$/);
  });

  test('REQ-03 & REQ-04: Form Identity Fields Structural Attributes Configuration', async () => {
    await expect(loginPage.emailInput).toHaveAttribute('placeholder', dictionary.inputPlaceholderEmail);
    await expect(loginPage.emailInput).toHaveAttribute('id', dictionary.inputNameEmail);
    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');

    await expect(loginPage.passwordInput).toHaveAttribute('placeholder', dictionary.inputPlaceholderPassword);
    await expect(loginPage.passwordInput).toHaveAttribute('id', dictionary.inputNamePassword);
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('REQ-05 & REQ-12: Client-Side Focus Loss Field-Level Validation Triggers', async () => {
    await loginPage.triggerFieldBlurSequence('email');
    await expect(loginPage.emailInput).toHaveAttribute('data-error', 'true');

    await loginPage.triggerFieldBlurSequence('password');
    await expect(loginPage.passwordInput).toHaveAttribute('data-error', 'true');
  });

  test('REQ-11: Bi-directional Component Active Binding Data Reflections', async () => {
    const testEmail = 'developer@domain.test';
    const testPassword = 'SecureKeystrokes99!';

    await loginPage.fillCredentials(testEmail, testPassword);
    await expect(loginPage.emailInput).toHaveValue(testEmail);
    await expect(loginPage.passwordInput).toHaveValue(testPassword);
  });

  test('REQ-06 & REQ-07 & REQ-09: Post-Successful Authentication Router Target Resolution @smoke', async ({ page }) => {
    await page.route('**/api/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, token: 'mock-session-jwt' })
      });
    });

    await expect(loginPage.submitButton).toHaveAttribute('type', 'submit');
    await loginPage.executeLoginWorkflow('student@academy.com', 'PassingPass77!');
    await expect(page).toHaveURL(/\/courses$/);
  });

  test('REQ-07 & REQ-08: Graceful Failure Responses Presentation Matrix', async ({ page }) => {
    const errorPayloadMessage = 'Invalid credentials or expired account context.';

    await page.route('**/api/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: errorPayloadMessage })
      });
    });

    await loginPage.executeLoginWorkflow('unknown@account.com', 'WrongCredentials!');

    const localErrorMsg = loginPage.errorFeedbackContainer.filter({ hasText: errorPayloadMessage });
    await expect(localErrorMsg).toBeVisible();
    await expect(localErrorMsg).toHaveText(errorPayloadMessage);
    await expect(page).toHaveURL(/\/login$/);
  });

  /* =========================================================================
     DEFENSIVE APP RISK ASSESSMENTS (BUG RISK COVERAGE)
     ========================================================================= */

  test('BUG-01: Resilience Against Malformed API Responses and Gateway Drops', async () => {
    await loginPage.page.route('**/api/login', async (route) => {
      await route.fulfill({
        status: 502,
        contentType: 'text/html',
        body: '<html><body><h1>502 Bad Gateway</h1></body></html>'
      });
    });

    await loginPage.executeLoginWorkflow('user@example.com', 'Password123!');
    await expect(loginPage.headingTitle).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('BUG-02: Race Condition Capture Mitigations Under Rapid Submissions @smoke', async () => {
    let requestCount = 0;

    await loginPage.page.route('**/api/login', async (route) => {
      requestCount++;
      await new Promise(resolve => setTimeout(resolve, 150));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });

    await loginPage.fillCredentials('user@example.com', 'Password123!');
    
    // Fire concurrent duplicate user submission events via the Page Object model
    await Promise.all([
      loginPage.clickSubmitButton(),
      loginPage.clickSubmitButton(),
      loginPage.clickSubmitButton()
    ]);

    expect(requestCount).toBe(1);
  });

  test('BUG-03: Empty Data Submission Client Boundary Interception Validation', async () => {
    let apiCalled = false;
    await loginPage.page.route('**/api/login', async (route) => {
      apiCalled = true;
      await route.abort();
    });

    await loginPage.clickSubmitButton();
    expect(apiCalled).toBe(false);
  });

  test('BUG-04: Cross-Site Scripting (XSS) Error Container Render Sanitization @security', async () => {
    const dangerousPayload = '<script>alert("XSS_EXPLOIT")</script><img src=x onerror=alert(1)>';

    await loginPage.page.route('**/api/login', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: dangerousPayload })
      });
    });

    await loginPage.executeLoginWorkflow('target@victim.io', 'AttackVector99!');

    const scopedXssContainer = loginPage.errorFeedbackContainer.filter({ hasText: 'XSS_EXPLOIT' });
    await expect(scopedXssContainer).toBeVisible();

    const innerHTML = await scopedXssContainer.innerHTML();
    expect(innerHTML).toContain('&lt;script&gt;');
  });

  test('BUG-05: Standard Context Keyboard Submission Mapping Functionality', async () => {
    let formsRouted = false;
    await loginPage.page.route('**/api/login', async (route) => {
      formsRouted = true;
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });

    await loginPage.fillCredentials('accessibility@compliance.org', 'KeyboardDriven123!');
    await loginPage.passwordInput.press('Enter');

    expect(formsRouted).toBe(true);
  });

  test('BUG-06 & BUG-07: Inflight State Mutation Adjustments Under Slow API Flights', async () => {
    await loginPage.page.route('**/api/login', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Unauthorized Session' })
      });
    });

    await loginPage.fillCredentials('stale@closure.net', 'PendingPass44!');
    await loginPage.clickSubmitButton();

    // Mutate state mid-flight to verify consistency
    await loginPage.emailInput.fill('mutated.data@closure.net');
    await loginPage.page.waitForTimeout(250);

    const asyncErrorContainer = loginPage.errorFeedbackContainer.filter({ hasText: 'Unauthorized Session' });
    await expect(asyncErrorContainer).toBeVisible();
    await expect(loginPage.page).toHaveURL(/\/login$/);
  });
});