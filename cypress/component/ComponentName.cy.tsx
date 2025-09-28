import { mount } from "cypress/react";
import { Button } from "@radix-ui/themes";

// Fake hook factory
const createUseAuth0 = (loginWithRedirect: any) => () => ({
  loginWithRedirect,
});

// Wrapper component that mimics your real LoginButton
const MockedLoginButton = ({ loginWithRedirect }: { loginWithRedirect: any }) => {
  const useAuth0 = createUseAuth0(loginWithRedirect);

  return <Button onClick={() => useAuth0().loginWithRedirect()}>Log In</Button>;
};

describe("<LoginButton />", () => {
  it("calls loginWithRedirect when clicked", () => {
    const loginWithRedirect = cy.stub().as("loginWithRedirect");

    mount(<MockedLoginButton loginWithRedirect={loginWithRedirect} />);

    cy.contains("Log In").click();

    cy.get("@loginWithRedirect").should("have.been.calledOnce");
  });
});
