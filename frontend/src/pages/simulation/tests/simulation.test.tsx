import { render, screen } from "@testing-library/react";
import { describe, expect, test as it } from "vitest";
import { Simulation } from "../ui";

describe("simulation page", () => {
  it("should render canvas & addComponent menu in editing mode", () => {
    render(<Simulation mode="editing" setMode={console.log} />);
    expect(screen.getByTestId("components-choose-bar")).not.toBeUndefined();
    expect(screen.getByTestId("components-canvas")).not.toBeUndefined();
  });

  it("should not render addComponent menu in simulatino mode", () => {
    render(<Simulation mode="simulation" setMode={console.log} />);
    expect(screen.getByTestId("components-choose-bar")).toBeUndefined();
    expect(screen.getByTestId("components-canvas")).not.toBeUndefined();
  })
});
