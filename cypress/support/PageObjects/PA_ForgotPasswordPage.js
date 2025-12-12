class PA_ForgotPasswordPage {

  inputUsername(username) {
    cy.get('input[name="username"]', { timeout: 10000 }).type(username)
  }

  clickReset() {
    cy.get('button[type="submit"]').click()
  }

  cancelReset(){
    cy.contains('Cancel').click();
  }

  assertResetSuccess() {
    cy.get('.oxd-text--h6')
    .should('contain', 'Reset Password link sent successfully')
  }

  assertResetError() {
    cy.get('.oxd-input-group').should('contain', 'Required')
  }
}

export default new PA_ForgotPasswordPage()
