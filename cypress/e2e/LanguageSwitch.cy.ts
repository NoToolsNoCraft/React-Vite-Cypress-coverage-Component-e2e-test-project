/// <reference types="cypress" />

describe("Language Switcher", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // adjust to your app URL
  });

  it("shows default language as EN", () => {
    cy.get('[role="combobox"]').should("contain.text", "EN");
  });

  it("switches from EN to ES", () => {
    // Open dropdown
    cy.get('[role="combobox"]').click();

    // Select ES
    cy.get('[role="option"]').contains("ES").click();

    // Verify combobox updated
    cy.get('[role="combobox"]').should("contain.text", "ES");
  });

  it("does not allow selecting FR (negative test)", () => {
    // Open dropdown
    cy.get('[role="combobox"]').click();

    // FR should not exist
    cy.get('[role="option"]').contains("FR").should("not.exist");
  });

  it("toggles back to EN", () => {
    // Open dropdown
    cy.get('[role="combobox"]').click();

    // Select EN
    cy.get('[role="option"]').contains("EN").click();

    // Verify combobox updated
    cy.get('[role="combobox"]').should("contain.text", "EN");
  });
});
