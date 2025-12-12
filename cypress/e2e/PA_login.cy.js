import PA_LoginPage from "../support/PageObjects/LoginPage";
import PA_users from "../fixtures/loginData.json";

describe('OrangeHRM Login Test Using POM', () => {

  beforeEach(() => {
    PA_LoginPage.visit();
  });

  // TC-LG-001
  it('Login valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginSuccess');

    PA_LoginPage.inputUsername(PA_users.validUsername);
    PA_LoginPage.inputPassword(PA_users.validPassword);
    PA_LoginPage.clickLogin();

    cy.wait('@loginSuccess').its('response.statusCode').should('eq', 302);

    PA_LoginPage.validateDashboard();
  });

  // TC-LG-002
  it('Password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginFail');
    PA_LoginPage.inputUsername(PA_users.validUsername);
    PA_LoginPage.inputPassword(PA_users.wrongPassword);
    PA_LoginPage.clickLogin();
    cy.wait('@loginFail').its('response.statusCode').should('eq', 302);
    PA_LoginPage.validateErrorMessage('Invalid credentials');
  });

  // TC-LG-003
  it('Username salah', () => {
    cy.intercept('POST', '**/auth/validate').as('validate003');
    PA_LoginPage.inputUsername(PA_users.wrongUsername);
    PA_LoginPage.inputPassword(PA_users.validPassword);
    PA_LoginPage.clickLogin();
    cy.wait('@validate003').its('response.statusCode').should('eq', 302);
    PA_LoginPage.validateErrorMessage('Invalid credentials');
  });

  // TC-LG-004
  it('Username kosong', () => {
    PA_LoginPage.inputPassword(PA_users.validPassword);
    PA_LoginPage.clickLogin();
    PA_LoginPage.validateRequired();
  });

  // TC-LG-005
  it('Password kosong', () => {
    PA_LoginPage.inputUsername(PA_users.validUsername);
    PA_LoginPage.clickLogin();
    PA_LoginPage.validateRequired();
  });

  // TC-LG-006
  it('Kedua field kosong', () => {
    PA_LoginPage.clickLogin();
    cy.get('.oxd-input-field-error-message').should('have.length', 2);
  });

  // TC-LG-007
  it('Password salah kapital', () => {
    cy.intercept('POST', '**/auth/validate').as('validate007');
    PA_LoginPage.inputUsername(PA_users.validUsername);
    PA_LoginPage.inputPassword(PA_users.capitalPassword);
    PA_LoginPage.clickLogin();
    cy.wait('@validate007').its('response.statusCode').should('eq', 302);
    PA_LoginPage.validateErrorMessage('Invalid credentials');
  });

  // TC-LG-008
  it('Username salah kapitalisasi (fallback)', () => {
    cy.intercept('POST', '**/auth/validate').as('validate008');
    PA_LoginPage.inputUsername(PA_users.lowerUsername);
    PA_LoginPage.inputPassword(PA_users.validPassword);
    PA_LoginPage.clickLogin();
    cy.wait('@validate008').its('response.statusCode').should('eq', 302);


    cy.get('body').then($body => {
      if ($body.find('.oxd-alert-content-text').length > 0) {
        PA_LoginPage.validateErrorMessage('Invalid credentials');
      } else {
        PA_LoginPage.validateDashboard();
      }
    });
  });

});
