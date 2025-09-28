/// <reference types="cypress" />

describe("Home Page E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // adjust port if needed
  });

  it("renders home page and welcome message", () => {
    // Check the main heading
    cy.contains("Home Page").should("be.visible");

    // Check the welcome span
    cy.contains("Welcome").should("be.visible");
  });

  it("can click Log In button", () => {
    cy.contains("Log In").click();
    // If Auth0 redirects, you might stub it, otherwise just log action
    cy.log("Log In clicked");
  });

  it("can interact with language combobox", () => {
    cy.get('[role="combobox"]').click();
    // You can add more actions like selecting a language
    cy.log("Language combobox clicked");
  });

  it("checks cart badge value", () => {
    cy.get('[role="status"]').should("have.text", "0");
  });
});
