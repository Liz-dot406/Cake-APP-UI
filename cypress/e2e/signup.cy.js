
describe("registration  tests", () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it('should register a user', () => {
        cy.getDataTest('h1').contains("Account Registration")

       
        cy.intercept('POST', '/users', {
            statusCode: 201,
            body: {
                message: 'User registered successfully',
                user: {
                    id: 123,
                    name: 'AdminTester',
                    email: 'admin@teach2give.com',
                    phonenumber: "0700188811",
                    role: 'customer',
                }
            }
        }).as('signup')


        
        cy.getDataTest('signup-name').as('nameInput')
        cy.get('@nameInput').type('AdminTester')


        cy.getDataTest('signup-email').as('emailInput')
        cy.get('@emailInput')
            .should('have.attr', 'type', 'email')
            .type('admin@teach2give.com')

        cy.getDataTest('signup-phonenumber').as('PhonenumberInput')
        cy.get('@PhonenumberInput').type('070011111')


        cy.getDataTest('signup-password').as('passwordInput')
        cy.get('@passwordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        cy.getDataTest('signup-confirmpassword').as('confirmPasswordInput')
        cy.get('@confirmPasswordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        
        cy.getDataTest('signup-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .should('not.be.disabled')
            .click()
            .pause()

    })

   
})