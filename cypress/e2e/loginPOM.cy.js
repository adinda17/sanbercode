import LoginPage from "../support/PageObjects/LoginPage";
import LoginData from "../fixtures/loginData.json";

describe('OrangeHRM Login Test Using POM', () => {

  beforeEach(() => {
    LoginPage.visit();
  });

  // TC-LG-001
  it('Login valid', () => {
    LoginPage.inputUsername(LoginData.validUsername);
    LoginPage.inputPassword(LoginData.validPassword);
    LoginPage.clickLogin();
    LoginPage.validateDashboard();
  });

  // TC-LG-002
  it('Password salah', () => {
    LoginPage.inputUsername(LoginData.validUsername);
    LoginPage.inputPassword(LoginData.wrongPassword);
    LoginPage.clickLogin();
    LoginPage.validateErrorMessage('Invalid credentials');
  });

  // TC-LG-003
  it('Username salah', () => {
    LoginPage.inputUsername(LoginData.wrongUsername);
    LoginPage.inputPassword(LoginData.validPassword);
    LoginPage.clickLogin();
    LoginPage.validateErrorMessage('Invalid credentials');
  });

  // TC-LG-004
  it('Username kosong', () => {
    LoginPage.inputPassword(LoginData.validPassword);
    LoginPage.clickLogin();
    LoginPage.validateRequired();
  });

  // TC-LG-005
  it('Password kosong', () => {
    LoginPage.inputUsername(LoginData.validUsername);
    LoginPage.clickLogin();
    LoginPage.validateRequired();
  });

  // TC-LG-006
  it('Kedua field kosong', () => {
    LoginPage.clickLogin();
    cy.get('.oxd-input-field-error-message').should('have.length', 2);
  });

  // TC-LG-007
  it('Password salah kapital', () => {
    LoginPage.inputUsername(LoginData.validUsername);
    LoginPage.inputPassword(LoginData.capitalPassword);
    LoginPage.clickLogin();
    LoginPage.validateErrorMessage('Invalid credentials');
  });

  // TC-LG-008
  it('Username salah kapitalisasi (fallback)', () => {
    LoginPage.inputUsername(LoginData.lowerUsername);
    LoginPage.inputPassword(LoginData.validPassword);
    LoginPage.clickLogin();

    cy.get('body').then($body => {
      if ($body.find('.oxd-alert-content-text').length > 0) {
        LoginPage.validateErrorMessage('Invalid credentials');
      } else {
        LoginPage.validateDashboard();
      }
    });
  });

});
