import CancelOrderButton from "../../src/components/CancelOrderButton";

describe("CancelOrderButton component", () => {
  it("renders the Cancel Order button", () => {
    cy.mount(<CancelOrderButton />);
    cy.contains("Cancel Order").should("exist");
  });

  it("opens the dialog when Cancel Order is clicked", () => {
    cy.mount(<CancelOrderButton />);
    cy.contains("Cancel Order").click();
    cy.contains("Are you sure you want to cancel this order?").should("be.visible");
    cy.contains("No").should("exist");
    cy.contains("Yes").should("exist");
  });

  it("closes the dialog when No is clicked", () => {
    cy.mount(<CancelOrderButton />);
    cy.contains("Cancel Order").click();
    cy.contains("No").click();
    cy.contains("Are you sure you want to cancel this order?").should("not.exist");
  });

  it("closes the dialog when Yes is clicked", () => {
    cy.mount(<CancelOrderButton />);
    cy.contains("Cancel Order").click();
    cy.contains("Yes").click();
    cy.contains("Are you sure you want to cancel this order?").should("not.exist");
  });
});