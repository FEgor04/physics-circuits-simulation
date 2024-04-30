import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test as it } from "vitest";
import { ElectricalComponent } from "@/shared/simulation";
import { Canvas } from "./canvas";

describe("adding new wire", () => {
  it("adds new wire if you select two dots", async () => {
    const schema: Array<ElectricalComponent> = [];
    render(
      <Canvas
        components={schema}
        onAddComponent={(newComponent) => schema.push(newComponent)}
      />,
    );
    const a = { x: 5, y: 5 };
    const b = { x: 6, y: 6 };
    await userEvent.click(screen.getByTestId(`canvas-dot-${a.x}-${a.y}`));
    await userEvent.click(screen.getByTestId(`canvas-dot-${b.x}-${b.y}`));
    expect(schema).toStrictEqual([
      {
        type: "wire",
        a,
        b,
      },
    ]);
  });
});
