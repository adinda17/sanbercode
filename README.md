Cypress Automation - OrangeHRM Demo
1. Deskripsi Project
Project ini adalah automasi testing untuk website OrangeHRM Demo (https://opensource-demo.orangehrmlive.com/) menggunakan Cypress 14.0.2 dengan Page Object Model (POM).

Fokus testing mencakup:
1. Login Page
2. Forgot Password Page
3. Dashboard → Menu Directory

Project menggunakan assertion UI dan intercept API untuk memastikan test stabil dan memvalidasi data backend.

2. Struktur Project
cypress/
├─ e2e/
│   ├─ PA_login.cy.js
│   ├─ PA_forgot_password.cy.js
│   └─ PA_directory.cy.js
├─ support/
│   └─ PageObjects/
│       ├─ PA_LoginPage.js
│       ├─ PA_ForgotPasswordPage.js
│       └─ PA_DashboardPage.js
└─ fixtures/
    └─ PA_users.json
3. Highlight Test Case
Login Page
- Valid login & invalid login
- Intercept request login & assertion URL dashboard
Forgot Password
- Reset password dengan email valid & invalid
- Intercept API & assertion notifikasi di UI
Directory / Dashboard
- Navigasi menu Directory
- Search employee valid & invalid
- Partial search & dropdown validation
- Reset button functionality (assert API success)
- UI validation (input, button, error message)

4. Cara Menjalankan Test
1. Install dependencies:
   npm install

2. Jalankan Cypress Test Runner:
   npx cypress open

3. Jalankan headless mode:
   npx cypress run

4. Pilih file test sesuai modul:
- PA_login.cy.js → Login Page
- PA_forgot_password.cy.js → Forgot Password Page
- PA_directory.cy.js → Directory / Dashboard

5. Keunggulan Project
- Page Object Model → reusable & mudah maintain
- Intercept API → test stabil, validasi backend
- Assertion lengkap → UI, input, message, status code
- Timeout aman → menghindari flaky test
