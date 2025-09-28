import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import Label from "../../src/components/Label";

// Mock useLanguage hook
vi.mock("../../src/hooks/useLanguage", () => ({
  default: () => ({
    getLabel: (id: string) => {
      const labels: Record<string, string> = {
        greeting: "Hello World",
        farewell: "Goodbye",
        empty: "",
      };
      return labels[id] ?? "Unknown label";
    },
  }),
}));

describe("Label component", () => {
  it("renders the correct label for a known labelId", () => {
    render(<Label labelId="greeting" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders the correct label for another known labelId", () => {
    render(<Label labelId="farewell" />);
    expect(screen.getByText("Goodbye")).toBeInTheDocument();
  });

  it("renders empty text for an empty label", () => {
  const { container } = render(<Label labelId="empty" />);
  const textElement = container.querySelector("span");
  expect(textElement).toBeEmptyDOMElement();
  });

  it("renders 'Unknown label' for an unknown labelId", () => {
    render(<Label labelId="unknown" />);
    expect(screen.getByText("Unknown label")).toBeInTheDocument();
  });
});
