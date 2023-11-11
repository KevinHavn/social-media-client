const email = "unit.test@stud.noroff.no";
const incorrectEmail = "unit.test@stud.noroff.com"
const password = "unittest1";
const incorrectPassword = "unit"

describe("Form validation test", () => {
    beforeEach(() => {
        cy.visit("/index.html");
        cy.wait(1000);
        cy.get("#registerModal").contains("Login").click();
        cy.wait(1000);
    });
        
    it("should give the user a clear notification if the E-Mail is invalid or correct", () => {
        cy.get("#loginEmail").type(incorrectEmail);
        cy.get("#loginPassword").type(password);
        cy.get("#loginForm button[type=submit]").contains("Login").click();
        cy.wait(2000);
    });
        
    it("should give the user a clear notification if the E-Mail is invalid or correct", () => {
        cy.get("#loginEmail").type(email);
        cy.get("#loginPassword").type(incorrectPassword);
        cy.get("#loginForm button[type=submit]").contains("Login").click();
        cy.wait(2000);
    });

    it("should give the user a clear notification if the E-Mail and Password are both incorrect", () => {
        cy.get("#loginEmail").type(incorrectEmail);
        cy.get("#loginPassword").type(incorrectPassword);
        cy.get("#loginForm button[type=submit]").contains("Login").click();
        cy.wait(2000);
    });

    it("should give the user a clear notification if any required fields are not submitted", () => {
        cy.get("#loginEmail:invalid").should("exist"); 
        cy.get("#loginPassword:invalid").should("exist"); 
        cy.get("#loginForm button[type=submit]").contains("Login").click();
        cy.wait(2000);
    });
})