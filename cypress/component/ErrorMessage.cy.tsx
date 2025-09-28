import { mount } from "cypress/react";
import ErrorMessage from "../../src/components/ErrorMessage";
import { FieldError } from "react-hook-form";

describe("ErrorMessage Component", () => {
  it("renders nothing when error is undefined", () => {
    mount(<ErrorMessage error={undefined} />);
    cy.get("[role='alert']").should("not.exist");
  });

  it("renders the error message when error is provided", () => {
    const mockError: FieldError = {
      type: "required",
      message: "This field is required",
      ref: { name: "username" } as any,
    };

    mount(<ErrorMessage error={mockError} />);

    cy.get("[role='alert']")
      .should("exist")
      .and("have.attr", "data-for", "username")
      .and("contain.text", "This field is required");
  });

  it("renders with correct color styling (red)", () => {
    const mockError: FieldError = {
      type: "pattern",
      message: "Invalid format",
      ref: { name: "email" } as any,
    };

    mount(<ErrorMessage error={mockError} />);

    cy.get("[role='alert']")
      .should("exist")
      .and("have.attr", "data-for", "email")
      .and("contain.text", "Invalid format");
  });
});
