import { mount } from "cypress/react";
import CategoryList from "../../src/components/CategoryList";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

describe("CategoryList Component", () => {
  const createMockStore = (initialState: any) =>
    configureStore({
      reducer: {
        category: (state = initialState, action) => state, // fixed
      },
      preloadedState: { category: initialState },
    });

  const mountWithStore = (store: any) => {
    mount(
      <Provider store={store}>
        <CategoryList />
      </Provider>
    );
  };

  it("shows loading state", () => {
    const store = createMockStore({
      list: [],
      loading: true,
      error: null,
    });

    mountWithStore(store);

    cy.contains("Loading...").should("exist");
  });

  it("shows list of categories", () => {
    const store = createMockStore({
      list: [
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
      ],
      loading: false,
      error: null,
    });

    mountWithStore(store);

    cy.contains("Category List").should("exist");
    cy.contains("Category 1").should("exist");
    cy.contains("Category 2").should("exist");
  });

  it("shows error message", () => {
    const store = createMockStore({
      list: [],
      loading: false,
      error: "Failed to load categories",
    });

    mountWithStore(store);

    cy.contains("Error: Failed to load categories").should("exist");
  });
});
