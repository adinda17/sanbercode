describe('OrangeHRM Login Feature + Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // halaman kadang lambat → beri timeout lebih besar
    cy.get('input[name="username"]', { timeout: 8000 })
      .should('be.visible');
  });

  // TC-LG-001: Login valid
  it('TC-LG-001 - Login valid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginSuccess');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginSuccess');
    cy.url().should('include', '/dashboard');
  });

  // TC-LG-002: Password salah
  it('TC-LG-002 - Password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginFail');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin124');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  // TC-LG-003: Username salah
  it('TC-LG-003 - Username salah', () => {
    cy.intercept('POST', '**/auth/validate').as('validate003');

    cy.get('input[name="username"]').type('Admin1');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@validate003').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  // TC-LG-004: Username kosong
  it('TC-LG-004 - Username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  // TC-LG-005: Password kosong
  it('TC-LG-005 - Password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  // TC-LG-006: Dua-duanya kosong
  it('TC-LG-006 - Kedua field kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2);
  });

  // TC-LG-007: Password salah kapital
  it('TC-LG-007 - Password salah kapitalisasi', () => {
    cy.intercept('POST', '**/auth/validate').as('validate007');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('Admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@validate007');
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  // TC-LG-008: Username salah kapital → fallback validation
  it('TC-LG-008 - Username salah kapital + Validate 302', () => {
    cy.intercept('POST', '**/auth/validate').as('validate008');

    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@validate008').its('response.statusCode').should('eq', 302);

    cy.get('body').then($body => {
      if ($body.find('.oxd-alert-content-text').length > 0) {
        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials');
      } else {
        cy.url().should('include', '/dashboard');
      }
    });
  });

});
