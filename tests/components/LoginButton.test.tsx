// LoginButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import LoginButton from "../../src/components/LoginButton";

// Create a mock function for loginWithRedirect
const loginWithRedirect = vi.fn();

// Mock the useAuth0 hook
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect,
  }),
}));

describe("LoginButton", () => {
  beforeEach(() => {
    // Clear the mock before each test
    loginWithRedirect.mockClear();
  });

  it("renders the button with 'Log In' text", () => {
    render(<LoginButton />);
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  it("calls loginWithRedirect when clicked", () => {
    render(<LoginButton />);
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
    expect(loginWithRedirect).toHaveBeenCalledTimes(1);
  });
});
