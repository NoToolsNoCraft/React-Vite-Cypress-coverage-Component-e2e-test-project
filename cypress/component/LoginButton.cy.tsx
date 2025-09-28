import { mount } from "cypress/react";
import LoginButton from "../../src/components/LoginButton"; // adjust path
import { Auth0Context } from "@auth0/auth0-react";

describe("<LoginButton />", () => {
  it("renders and calls loginWithRedirect on click", () => {
    const loginWithRedirectSpy = cy.stub().as("loginWithRedirectSpy");

    const auth0ContextValue = {
      isAuthenticated: false,
      loginWithRedirect: loginWithRedirectSpy,
      logout: cy.stub(),
      user: null,
    };

    mount(
      <Auth0Context.Provider value={auth0ContextValue as any}>
        <LoginButton />
      </Auth0Context.Provider>
    );

    // assert button renders
    cy.contains("Log In").should("exist");

    // click button
    cy.contains("Log In").click();

    // assert loginWithRedirect was called once
    cy.get("@loginWithRedirectSpy").should("have.been.calledOnce");
  });
});
