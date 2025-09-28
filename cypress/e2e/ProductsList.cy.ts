describe("Products table integrity", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/products");
  });

  it("should display the Products page correctly", () => {
    cy.contains("h1", "Products").should("be.visible");
    cy.get("table").should("exist");
    cy.get("thead th").should("have.length", 3);
  });

  it("should list products in the table", () => {
    cy.get("tbody tr").should("have.length.greaterThan", 0);
    cy.get("tbody tr").first().within(() => {
      cy.get("td").eq(0).find("a").should("have.attr", "href");
      cy.get("td").eq(1).invoke("text").should("match", /\$\d+/);
      cy.contains("Add to Cart").should("exist");
    });
  });

  it("should add a product to the cart", () => {
    cy.get('[role="status"]').invoke("text").then((initialCount) => {
      cy.contains("Add to Cart").first().click();
      cy.get('[role="status"]').should(($badge) => {
        const newCount = parseInt($badge.text());
        expect(newCount).to.be.greaterThan(parseInt(initialCount));
      });
    });
  });

  it("should navigate to all product detail pages", () => {
  cy.get("tbody tr").then(($rows) => {
    const rowCount = $rows.length;

    for (let i = 0; i < rowCount; i++) {
      cy.get("tbody tr").eq(i).find("a").then(($link) => {
        const productName = $link.text();

        // Click into product detail
        cy.wrap($link).click();

        // Verify detail page
        cy.url().should("include", "/products/");
        cy.contains(productName).should("be.visible");

        // Navigate back (except after last product)
        if (i < rowCount - 1) {
          cy.go("back");
        }
      });
    }
  });
});
});