
import Label from "../../src/components/Label";

const getLabel = (id: string) => {
  const labels: Record<string, string> = {
    greeting: "Hello World",
    farewell: "Goodbye",
    empty: "",
  };
  return labels[id] ?? "Unknown label";
};

describe("Label component (Cypress)", () => {
  it("renders the correct label for a known labelId", () => {
    cy.mount(<Label labelId="greeting" getLabel={getLabel} />);
    cy.contains("Hello World").should("exist");
  });

  it("renders the correct label for another known labelId", () => {
    cy.mount(<Label labelId="farewell" getLabel={getLabel} />);
    cy.contains("Goodbye").should("exist");
  });

  it("renders empty text for an empty label", () => {
    cy.mount(<Label labelId="empty" getLabel={getLabel} />);
    cy.get("span, span[data-radix-ui-text]").should("be.empty");
  });

  it("renders 'Unknown label' for an unknown labelId", () => {
    cy.mount(<Label labelId="unknown" getLabel={getLabel} />);
    cy.contains("Unknown label").should("exist");
  });
});