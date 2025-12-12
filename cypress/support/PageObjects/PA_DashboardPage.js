class PA_DashboardPage {

  clickDirectoryMenu() {
    cy.contains('Directory').click()
  }

  searchName(name, fullName = null) {
    // Ketik nama di input
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 }).clear().type(name)

    if (fullName) {
      // Tunggu dropdown muncul dan pilih full name
      cy.get('.oxd-autocomplete-dropdown', { timeout: 10000 })
        .should('be.visible')
        .contains('Peter Mac Anderson').click()
    }

    // Klik Search
    cy.contains('button', 'Search').click()
  }

  assertResultExists() {
    cy.get('div.orangehrm-directory-card', { timeout: 10000 }).should('be.visible')

  }

  assertResultNotFound() {
    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message')
      .should('contain.text', 'Invalid')

  }


  assertDirectoryUI() {
    cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 }).should('be.visible')
    cy.contains('Search').should('be.visible')
    cy.contains('Reset').should('be.visible')
  }

  resetSearch() {
    // Intercept request Reset
    cy.intercept('GET', '**/directory/employees?*').as('resetRequest')

    // Klik Reset
    cy.contains('button', 'Reset').click()

    // Tunggu request selesai
    cy.wait('@resetRequest', { timeout: 10000 }).its('response.statusCode').should('eq', 200)
  }
  
}

export default new PA_DashboardPage()
