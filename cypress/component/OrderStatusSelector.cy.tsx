import { mount } from "cypress/react";
import { Theme } from "@radix-ui/themes";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";

describe("OrderStatusSelector Component", () => {
  const mountWithTheme = (onChange = cy.stub().as("onChange")) => {
    mount(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );
    return onChange;
  };

  it("renders with default value 'new'", () => {
    mountWithTheme();
    cy.get('[role="combobox"]').should("contain.text", "New");
  });

  it("allows selecting 'Processed' and calls onChange", () => {
    mountWithTheme();

    cy.get('[role="combobox"]').click();
    cy.contains("Processed").click();

    cy.get('[role="combobox"]').should("contain.text", "Processed");
    cy.get("@onChange").should("have.been.calledWith", "processed");
  });

  it("allows selecting 'Fulfilled' and calls onChange", () => {
    const onChange = mountWithTheme();

    cy.get('[role="combobox"]').click();
    cy.contains("Fulfilled").click();

    cy.get('[role="combobox"]').should("contain.text", "Fulfilled");
    cy.get("@onChange").should("have.been.calledWith", "fulfilled");
  });
});
