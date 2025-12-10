class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
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

export default new LoginPage();
