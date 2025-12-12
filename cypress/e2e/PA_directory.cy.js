import PA_LoginPage from "../support/PageObjects/PA_LoginPage"
import PA_DashboardPage from "../support/PageObjects/PA_DashboardPage"
import PA_users from "../fixtures/PA_users.json"

describe('PA_Directory Page - 4 Test Case', () => {

  beforeEach(() => {
    // Login
    PA_LoginPage.visit()
    PA_LoginPage.inputUsername(PA_users.validUsername)
    PA_LoginPage.inputPassword(PA_users.validPassword)
    PA_LoginPage.clickLogin()
    cy.url().should('include', 'dashboard')
  })


  it('PA_TC012 - Navigasi ke Menu Directory', () => {
    PA_DashboardPage.clickDirectoryMenu()
    cy.url().should('include', 'directory')
  })


  it('PA_TC013 - Search Employee Valid', () => {
    // Intercept request final empNumber
    cy.intercept('GET', '**/directory/employees?*').as('searchValid')

    PA_DashboardPage.clickDirectoryMenu()
    PA_DashboardPage.searchName('Peter', 'Peter Mac Anderson')

    // Tunggu request final muncul
    cy.wait('@searchValid', { timeout: 15000 })

    // Assert table muncul
    PA_DashboardPage.assertResultExists()
  })


  it('PA_TC014 - Search Employee Tidak Ditemukan', () => {
    cy.intercept('GET', '**/directory/employees?*').as('searchInvalid')

    PA_DashboardPage.clickDirectoryMenu()
    PA_DashboardPage.searchName('Dinda') // nama yang tidak ada

    cy.wait('@searchInvalid', { timeout: 15000 })

    PA_DashboardPage.assertResultNotFound()
  })


  it('PA_TC015 - Directory UI Validation', () => {
    PA_DashboardPage.clickDirectoryMenu()
    PA_DashboardPage.assertDirectoryUI()
  })


  it('PA_TC016 - Reset Button Functionality', () => {
    PA_DashboardPage.clickDirectoryMenu()

    // Ketik nama
    cy.get('input[placeholder="Type for hints..."]').type('Peter')

    // Klik Reset dan assert API response
    PA_DashboardPage.resetSearch()
    })

})
