describe("login tests", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should login with valid credentials", () => {
    cy.getDataTest("cake-login-header").should("contain.text", "Welcome Back");

    cy.getDataTest("login-email-input").type("allan@gmail.com");
    cy.getDataTest("login-password-input").type("123456");

    // Intercept the login API
    cy.intercept("POST", "/api/users/login").as("loginRequest");

    cy.getDataTest("login-submit-button").click();

    // Wait for API to finish
    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    // Then check UI
    cy.contains(/Success/i).should("be.visible");
    cy.url().should("include", "/admin/dashboard/todos");
    cy.contains(/Welcome to your Admin dashboard/i).should("be.visible");
  });

  it("should not login with invalid credentials", () => {
    cy.getDataTest("login-email-input").type("bkemboi590@gmail.com");
    cy.getDataTest("login-password-input").type("wrongpassword123");

    cy.intercept("POST", "/api/users/login").as("loginRequest");

    cy.getDataTest("login-submit-button").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 400);

    cy.contains(/Invalid Credentials/i).should("be.visible");
  });
});
