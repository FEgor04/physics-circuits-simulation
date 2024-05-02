import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test as it } from "vitest";
import { ElectricalComponent, Wire } from "@/shared/simulation";
import { Canvas } from "./canvas";

describe("adding new wire", () => {
  it("adds new wire if you select two dots", async () => {
    const schema: Array<ElectricalComponent> = [];
    render(
      <Canvas
        components={schema}
        onAddComponent={(newComponent) => schema.push(newComponent)}
        onSelectComponent={() => {}}
      />,
    );
    const a = { x: 5, y: 5 };
    const b = { x: 6, y: 6 };
    await userEvent.click(screen.getByTestId(`canvas-dot-${a.x}-${a.y}`));
    await userEvent.click(screen.getByTestId(`canvas-dot-${b.x}-${b.y}`));
    expect(schema).toStrictEqual([
      {
        _type: "wire",
        a,
        b,
      },
    ]);
  });

  it("does not add new wire if you select the same dot twice", async () => {
    const schema: Array<ElectricalComponent> = [];
    render(<Canvas components={schema} onAddComponent={(newComponent) => schema.push(newComponent)} />);
    const a = { x: 5, y: 5 };
    await userEvent.click(screen.getByTestId(`canvas-dot-${a.x}-${a.y}`));
    await userEvent.click(screen.getByTestId(`canvas-dot-${a.x}-${a.y}`));
    expect(schema).toStrictEqual([]);
  });

  it("does not add new wire if it already exists", async () => {
    const initialWire: Wire = {
      _type: "wire",
      a: { x: 5, y: 5 },
      b: { x: 5, y: 6 },
    };
    const schema: Array<ElectricalComponent> = [initialWire];
    render(<Canvas components={schema} onAddComponent={(newComponent) => schema.push(newComponent)} />);
    await userEvent.click(screen.getByTestId(`canvas-dot-${initialWire.a.x}-${initialWire.a.y}`));
    await userEvent.click(screen.getByTestId(`canvas-dot-${initialWire.b.x}-${initialWire.b.y}`));
    expect(schema).toStrictEqual([initialWire]);
  });
});
