import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Canvas } from "@/widgets/canvas";
import { ElectricalComponent } from "@/shared/simulation";

export const Route = createFileRoute("/")({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [schema, setSchema] = useState<Array<ElectricalComponent>>([
      {
        _type: "resistor",
        a: { x: 0, y: 0 },
        b: { x: 1, y: 0 },
        resistance: 500,
      },
    ]);
    return (
      <div className="container mx-auto mt-8">
        <Canvas
          components={schema}
          onAddComponent={(newComponent) =>
            setSchema((old) => [...old, newComponent])
          }
        />
      </div>
    );
  },
});
