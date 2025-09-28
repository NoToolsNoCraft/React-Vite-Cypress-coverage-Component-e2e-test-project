// Greet.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest"; // 👈 this is the important line
import Greet from "../../src/components/Greet";

describe("Greet component", () => {
  it("renders greeting when name is provided", () => {
    render(<Greet name="Petar" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hello Petar");
  });

  it("renders login button when name is empty", () => {
    render(<Greet name="" />);
    expect(screen.getByRole("button")).toHaveTextContent("Login");
  });
});
