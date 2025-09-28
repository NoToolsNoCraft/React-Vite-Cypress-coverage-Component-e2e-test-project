// CategoryList.test.tsx
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import CategoryList from "../../src/components/CategoryList";
import { fetchCategories } from "../../src/store/categorySlice";

// Mock fetchCategories
vi.mock("../../src/store/categorySlice", () => ({
  fetchCategories: vi.fn(() => ({ type: "FETCH_CATEGORIES" })),
}));

// Fully mock Redux hooks so no Provider is needed
const mockDispatch = vi.fn();
const mockSelector = vi.fn();

vi.mock("../../src/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => mockSelector(selector),
}));

describe("CategoryList", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockSelector.mockReset();
  });

  it("dispatches fetchCategories on mount", () => {
    // Provide the state slices for categories, loading, error
    mockSelector.mockReturnValueOnce([]) // categories
                .mockReturnValueOnce(false) // loading
                .mockReturnValueOnce(null); // error

    render(<CategoryList />);
    expect(mockDispatch).toHaveBeenCalledWith(fetchCategories());
  });

  it("renders loading state", () => {
    mockSelector.mockReturnValueOnce([]) // categories
                .mockReturnValueOnce(true) // loading
                .mockReturnValueOnce(null); // error

    render(<CategoryList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders categories list", () => {
    const categories = [
      { id: 1, name: "Category A" },
      { id: 2, name: "Category B" },
    ];

    mockSelector.mockReturnValueOnce(categories) // categories
                .mockReturnValueOnce(false)     // loading
                .mockReturnValueOnce(null);     // error

    render(<CategoryList />);
    expect(screen.getByText(/category list/i)).toBeInTheDocument();
    expect(screen.getByText("Category A")).toBeInTheDocument();
    expect(screen.getByText("Category B")).toBeInTheDocument();
  });

  it("renders error state", () => {
    mockSelector.mockReturnValueOnce([])         // categories
                .mockReturnValueOnce(false)      // loading
                .mockReturnValueOnce("Network Error"); // error

    render(<CategoryList />);
    expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
  });
});