import { mount } from "cypress/react";
import Greet from "../../src/components/Greet";

describe("Greet Component", () => {
  it("renders greeting when name is provided", () => {
    mount(<Greet name="Petar" />);
    cy.get("h1").should("contain.text", "Hello Petar");
    cy.get("button").should("not.exist");
  });

  it("renders Login button when name is empty", () => {
    mount(<Greet name="" />);
    cy.get("button").should("exist").and("contain.text", "Login");
    cy.get("h1").should("not.exist");
  });
});
