describe ('Scenario Login',() => {
    it('TC-001 - Akses Login dengan username dan password valid', () =>{
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummary');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('admin').should('have.value', 'admin')  // assertion
        cy.get('[name="password"]').type ('admin123')
        cy.get('[type="submit"]').click()
        cy.wait('@actionsummary').its('response.statusCode').should('eq', 200);
    })

    // it('TC-002 - Akses Login dengan username dan password invalid', () =>{
    //     cy.visit('https://www.saucedemo.com/')
    //     cy.get('[data-test="username"]').type('standard')
    //     cy.get('[data-test="password"]').type ('secret')
    //     cy.get('.btn_action').should('be.visible') //assertion
    //     cy.get('[data-test="login-button"]').click()
    //     cy.get('[data-test="error"]').should('contain', 'Epic sadface')
    // })
})