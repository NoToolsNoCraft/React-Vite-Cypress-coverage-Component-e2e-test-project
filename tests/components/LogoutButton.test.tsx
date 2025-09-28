// LogoutButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import LogoutButton from "../../src/components/LogoutButton";

// Create a mock function for logout
const logout = vi.fn();

// Mock the useAuth0 hook
vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    logout,
  }),
}));

describe("LogoutButton", () => {
  beforeEach(() => {
    logout.mockClear(); // reset mock before each test
  });

  it("renders the button with 'Log Out' text", () => {
    render(<LogoutButton />);
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });

  it("calls logout with returnTo when clicked", () => {
    render(<LogoutButton />);
    fireEvent.click(screen.getByRole("button", { name: /log out/i }));
    
    expect(logout).toHaveBeenCalledTimes(1);
    expect(logout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });
});
