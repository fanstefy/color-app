import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ColorFilter from "../ColorFilter";
import { describe, it, expect, vi } from "vitest";

describe("ColorFilter", () => {
  it("renders input and search icon", () => {
    const setSearchMock = vi.fn();
    render(<ColorFilter setSearch={setSearchMock} />);

    const input = screen.getByPlaceholderText("Search colors...");
    expect(input).toBeInTheDocument();

    const icon = screen.getByTestId("lucide-icon");
    expect(icon).toBeInTheDocument();
  });

  it("focuses input on mount", () => {
    const setSearchMock = vi.fn();
    render(<ColorFilter setSearch={setSearchMock} />);

    const input = screen.getByPlaceholderText("Search colors...");
    expect(document.activeElement).toBe(input);
  });

  it("calls setSearch with debounce when typing", async () => {
    const setSearchMock = vi.fn();
    render(<ColorFilter setSearch={setSearchMock} />);

    const input = screen.getByPlaceholderText("Search colors...");
    fireEvent.change(input, { target: { value: "blue" } });

    await waitFor(
      () => {
        expect(setSearchMock).toHaveBeenCalledWith("blue");
      },
      { timeout: 1000 } 
    );
  });
});
