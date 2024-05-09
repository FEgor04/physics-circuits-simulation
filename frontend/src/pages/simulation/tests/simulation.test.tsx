import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test as it, vi } from "vitest";
import { Simulation } from "../ui";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("simulation page", () => {
  it("renders canvas & addComponent menu in editing mode", () => {
    render(<Simulation mode="editing" setMode={console.log} />);
    expect(screen.queryByTestId("components-choose-bar")).not.toBeNull();
    expect(screen.queryByTestId("components-canvas")).not.toBeNull();
  });

  it("does not render addComponent menu in simulatino mode", () => {
    render(<Simulation mode="simulation" setMode={console.log} />);
    expect(screen.queryByTestId("components-choose-bar")).toBeNull();
    expect(screen.queryByTestId("components-canvas")).not.toBeNull();
  });
});
