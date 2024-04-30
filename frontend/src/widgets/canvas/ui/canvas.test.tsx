import { render } from "@testing-library/react";
import { describe, test as it } from "vitest";
import { ElectricalComponent } from "@/shared/simulation";
import { Canvas } from "./canvas";

describe("adding new wire", () => {
  it("adds new wire if you select two dots", () => {
    const schema: Array<ElectricalComponent> = [];
    render(
      <Canvas
        components={schema}
        onAddComponent={(newComponent) => schema.push(newComponent)}
      />,
    );
  });
});
