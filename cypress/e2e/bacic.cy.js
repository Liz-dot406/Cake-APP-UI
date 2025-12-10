describe('UI Navigation', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
    })


    it("Should visit multimple pages", () => {
        cy.visit('/')
        cy.location("pathname").should("equal", "/")
        
        cy.get('h1').contains("Welcome to CakeApp")
        
        cy.visit('/about')
        cy.location("pathname").should("equal", "/about")
        
        cy.get('h1').contains("About Bakers House")
        
        cy.visit('/register')
        
        cy.get('h1').contains("Create Your Account")
        
        cy.visit('/login')
        
        cy.get('h1').contains("Welcome Back")
    })
});