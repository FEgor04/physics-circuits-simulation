import { render, screen } from "@testing-library/react";
import { describe, expect, test as it, vi } from "vitest";
import { Simulation } from "../ui";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("simulation page", () => {
  it("should render canvas & addComponent menu in editing mode", () => {
    render(<Simulation mode="editing" setMode={console.log} />);
    expect(screen.queryByTestId("components-choose-bar")).not.toBeNull();
    expect(screen.queryByTestId("components-canvas")).not.toBeNull();
  });

  it("should not render addComponent menu in simulatino mode", () => {
    render(<Simulation mode="simulation" setMode={console.log} />);
    expect(screen.queryByTestId("components-choose-bar")).toBeNull();
    expect(screen.queryByTestId("components-canvas")).not.toBeNull();
  });
});
