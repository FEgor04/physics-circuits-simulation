import { render } from "@testing-library/react";
import { describe, test as it } from "vitest";
import { ElectricalComponent } from "@/shared/simulation";
import { Canvas } from "./canvas";

describe("adding new wire", () => {
  it.skip("adds new wire if you select two dots", () => {
    let schema: Array<ElectricalComponent> = [];
    render(
      <Canvas
        components={schema}
        onAddComponent={(newComponent) => schema.push(newComponent)}
      />,
    );
  });
});
