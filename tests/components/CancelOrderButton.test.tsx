// CancelOrderButton.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CancelOrderButton from "../../src/components/CancelOrderButton";

describe("CancelOrderButton", () => {
  it("renders the Cancel Order button", () => {
    render(<CancelOrderButton />);
    expect(screen.getByRole("button", { name: /cancel order/i })).toBeInTheDocument();
  });

  it("opens the dialog when clicked and displays correct content", async () => {
    render(<CancelOrderButton />);
    const user = userEvent.setup();

    // Open dialog
    await user.click(screen.getByRole("button", { name: /cancel order/i }));

    // Check dialog content
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure you want to cancel this order\?/i)).toBeInTheDocument();

    // Check buttons inside dialog
    expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
  });

  it("closes the dialog when 'No' or 'Yes' is clicked", async () => {
    render(<CancelOrderButton />);
    const user = userEvent.setup();

    // Open dialog
    await user.click(screen.getByRole("button", { name: /cancel order/i }));
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();

    // Click "No" and check dialog is closed
    await user.click(screen.getByRole("button", { name: /no/i }));
    expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();

    // Open again
    await user.click(screen.getByRole("button", { name: /cancel order/i }));
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();

    // Click "Yes" and check dialog is closed
    await user.click(screen.getByRole("button", { name: /yes/i }));
    expect(screen.queryByText(/confirm/i)).not.toBeInTheDocument();
  });
});
