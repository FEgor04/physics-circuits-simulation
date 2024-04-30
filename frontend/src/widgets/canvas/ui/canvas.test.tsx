import { render } from "@testing-library/react";
import { useState } from "react";
import { describe, test as it } from "vitest";
import { ElectricalComponent } from "@/shared/simulation";
import { Canvas } from "./canvas";

describe("adding new wire", () => {
  it("adds new wire if you select two dots", () => {
    const [schema, setSchema] = useState<Array<ElectricalComponent>>([]);
    render(
      <Canvas
        components={schema}
        onAddComponent={(newComponent) =>
          setSchema((prev) => [...prev, newComponent])
        }
      />,
    );
  });
});
