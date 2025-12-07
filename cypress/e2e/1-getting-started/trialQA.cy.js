describe ('Scenario Login',() => {
    it('TC-001 - Akses Login dengan username dan password valid', () =>{
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user').should('have.value', 'standard_user')  // assertion
        cy.get('[data-test="password"]').type ('secret_sauce')
        cy.get('.btn_action').should('be.visible') //assertion
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', 'inventory')  // assertion
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        
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