import { mount } from "cypress/react";
import LogoutButton from "../../src/components/LogoutButton"; // adjust path
import { Auth0Context } from "@auth0/auth0-react";

describe("<LogoutButton />", () => {
  it("renders and calls logout on click", () => {
    const logoutSpy = cy.stub().as("logoutSpy");

    // provide a fake Auth0 context
    const auth0ContextValue = {
      isAuthenticated: true,
      logout: logoutSpy,
      loginWithRedirect: cy.stub(),
      user: { name: "Test User" },
    };

    mount(
      <Auth0Context.Provider value={auth0ContextValue as any}>
        <LogoutButton />
      </Auth0Context.Provider>
    );

    // assert button renders
    cy.contains("Log Out").should("exist");

    // click button
    cy.contains("Log Out").click();

    // assert logout called with expected params
    cy.get("@logoutSpy").should("have.been.calledWith", {
      logoutParams: { returnTo: window.location.origin },
    });
  });
});