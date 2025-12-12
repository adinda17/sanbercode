class PA_LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]', { timeout: 8000 })
      .should('be.visible');
  }

  inputUsername(username) {
    cy.get('input[name="username"]').type(username), { timeout: 10000 };
  }

  inputPassword(password) {
    cy.get('input[name="password"]').type(password), { timeout: 10000 };
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  clickForgot() {
    cy.contains('Forgot your password?').click()
  }

  assertSuccess() {
    cy.url().should('include', '/dashboard')
  }

  assertError() {
    cy.get('.oxd-alert-content-text').should('be.visible')
  }

  assertLoginUI() {
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.contains('Forgot your password?').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  }

  // Validasi sukses
  validateDashboard() {
    cy.url().should('include', '/dashboard');
  }

  // Validasi error login
  validateErrorMessage(message) {
    cy.get('.oxd-alert-content-text')
      .should('contain', message);
  }

  // Validasi required field
  validateRequired() {
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  }
}

export default new PA_LoginPage();
