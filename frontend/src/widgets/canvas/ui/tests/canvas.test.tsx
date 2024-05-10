import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test as it, vi } from "vitest";
import { SelectComponentProvider } from "@/features/select-component";
import { Canvas } from "../canvas";
import { beforeEach } from "node:test";

describe("canvas", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("select dot after click", async () => {
    const onSelect = vi.fn().mockImplementation(console.log);
    render(
      <SelectComponentProvider selected={undefined} onSelect={onSelect}>
        <Canvas
          components={[]}
          onAddComponent={console.log}
          onUpdateComponent={console.log}
          onUpdateComponentCoords={console.log}
          canvasSize={100}
        />
      </SelectComponentProvider>,
    );

    await userEvent.click(screen.getByTestId("dot-1-1"));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it("renders selected dot with data-selected = true", async () => {
    const onSelect = vi.fn().mockImplementation(console.log);
    render(
      <SelectComponentProvider selected={{ type: "point", point: { x: 1, y: 1 } }} onSelect={onSelect}>
        <Canvas
          components={[]}
          onAddComponent={console.log}
          onUpdateComponent={console.log}
          onUpdateComponentCoords={console.log}
          canvasSize={100}
        />
      </SelectComponentProvider>,
    );

    expect(screen.getByTestId("dot-1-1-visual").getAttribute("data-selected")).toBe("true");
  });

  // Will be faced in issue BIPKI-67
  it("selects resistor after click", async () => {
    const onSelect = vi.fn().mockImplementation(console.log);
    render(
      <SelectComponentProvider selected={undefined} onSelect={onSelect}>
        <Canvas
          components={[{ _type: "resistor", resistance: 1, a: { x: 1, y: 1 }, b: { x: 2, y: 2 }, id: 0 }]}
          onAddComponent={console.log}
          onUpdateComponent={console.log}
          onUpdateComponentCoords={console.log}
          canvasSize={100}
        />
      </SelectComponentProvider>,
    );

    const resistor = screen.getByTestId("resistor-0");
    await userEvent.click(resistor);
    expect(onSelect).toHaveBeenCalledOnce();
    expect(resistor.getAttribute("data-selected")).toBe("true");
  });
});
