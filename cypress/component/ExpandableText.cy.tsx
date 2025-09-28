import { mount } from "cypress/react";
import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableText Component", () => {
  const shortText = "This is a short text.";
  const longText = "A".repeat(300); // 300 characters, > 255

  it("renders full text when text is short enough", () => {
    mount(<ExpandableText text={shortText} />);
    cy.get("article").should("contain.text", shortText);
    cy.get("button").should("not.exist");
  });

  it("renders truncated text when text exceeds limit", () => {
    mount(<ExpandableText text={longText} />);
    cy.get("article").should("contain.text", longText.substring(0, 255));
    cy.get("article").should("contain.text", "...");
    cy.get("button").should("contain.text", "Show More");
  });

  it("expands to show full text when 'Show More' is clicked", () => {
    mount(<ExpandableText text={longText} />);
    cy.contains("Show More").click();
    cy.get("article").should("contain.text", longText);
    cy.get("button").should("contain.text", "Show Less");
  });

  it("collapses back to truncated text when 'Show Less' is clicked", () => {
    mount(<ExpandableText text={longText} />);
    cy.contains("Show More").click();
    cy.contains("Show Less").click();
    cy.get("article").should("contain.text", longText.substring(0, 255));
    cy.get("article").should("contain.text", "...");
    cy.get("button").should("contain.text", "Show More");
  });
});
