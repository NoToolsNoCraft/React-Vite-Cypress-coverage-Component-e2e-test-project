import { mount } from "cypress/react";
import Onboarding from "../../src/components/Onboarding";


describe("Onboarding Component", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it("shows welcome message for new users", () => {
    mount(<Onboarding />);

    cy.contains("Welcome to our app!").should("exist");
    cy.contains("Complete the tutorial to get started.").should("exist");
    cy.contains("Mark Tutorial as Completed").should("exist");
  });

 it("marks tutorial as completed when button clicked", () => {
  mount(<Onboarding />);

  cy.contains("Mark Tutorial as Completed").click();

  cy.contains("Welcome back!").should("exist");
  cy.contains("You've already completed the tutorial.").should("exist");

  cy.window().then((win) => {
    expect(win.localStorage.getItem("tutorialCompleted")).to.equal("true");
  });
});


  it("shows completed state if tutorial already completed in localStorage", () => {
    localStorage.setItem("tutorialCompleted", "true");

    mount(<Onboarding />);

    cy.contains("Welcome back!").should("exist");
    cy.contains("You've already completed the tutorial.").should("exist");
    cy.contains("Mark Tutorial as Completed").should("not.exist");
  });
});
