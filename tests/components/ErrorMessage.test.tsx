// ErrorMessage.test.tsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorMessage from "../../src/components/ErrorMessage";
import type { FieldError } from "react-hook-form";

describe("ErrorMessage", () => {
  it("renders nothing when error is undefined", () => {
    const { container } = render(<ErrorMessage error={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the error message when error is provided", () => {
    const error: FieldError = {
      type: "required",
      message: "This field is required",
      ref: { name: "username" } as any, // mock ref object
    };

    render(<ErrorMessage error={error} />);
    
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("This field is required");
    expect(alert).toHaveAttribute("data-for", "username");
  });
});
