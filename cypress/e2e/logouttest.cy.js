const email = "unit.test@stud.noroff.no";
const password = "unittest1";

describe('Logout test', () => {
    it("should allow the user to log out", () => {
      cy.visit("/index.html");
      cy.wait(1000);
      cy.get("#registerModal").contains("Login").click();
      cy.get("#loginForm").should("be.visible");
      cy.wait(1000);
      cy.get("#loginEmail").type(email);
      cy.get("#loginPassword").type(password);
      cy.get("button[type=submit]").contains("Login").click();
      cy.wait(2000);
      cy.get("header button[type=button]").contains("Logout").click();
      cy.wait(1000);
      cy.clearLocalStorage();
      cy.window().its("localStorage").should("be.empty");
    });
  })