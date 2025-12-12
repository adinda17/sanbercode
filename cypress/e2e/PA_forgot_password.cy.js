import PA_LoginPage from "../support/PageObjects/PA_LoginPage"
import PA_ForgotPasswordPage from "../support/PageObjects/PA_ForgotPasswordPage"
import PA_users from "../fixtures/PA_users.json"

describe('PA_Forgot Password Feature - 3 Test Case', () => {

  beforeEach(() => {
    PA_LoginPage.visit()
    PA_LoginPage.clickForgot()
  })

  // -------------------------------
  // TC008 - Navigasi ke Forgot Page
  // -------------------------------
  it('PA_TC008 - Navigasi ke Forgot Password Page', () => {
    
    cy.url().should('include', 'requestPasswordResetCode')

  })

  // -------------------------------
  // TC009 - Reset Password Valid
  // -------------------------------
  it('PA_TC009 - Reset Password Valid', () => {

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('resetAPI')

    PA_ForgotPasswordPage.inputUsername(PA_users.validUsername)
    PA_ForgotPasswordPage.clickReset()

    cy.wait('@resetAPI', { timeout: 15000 })
      .its('response.statusCode')
      .should('eq', 200)

    PA_ForgotPasswordPage.assertResetSuccess()
  })

  // -------------------------------
  // TC010 - Username Kosong
  // -------------------------------
  it('PA_TC010 - Reset Password Username Kosong', () => {
    PA_ForgotPasswordPage.clickReset()
    PA_ForgotPasswordPage.assertResetError()
  })

  // -------------------------------
  // TC011 - Cancel -> Back to Login
  // -------------------------------
  it('PA_TC011 - Back To Login', () => {

    cy.intercept('GET', '**/messages*').as('msgBack')

    PA_ForgotPasswordPage.cancelReset()

    cy.wait('@msgBack', { timeout: 15000 })
  })

})
