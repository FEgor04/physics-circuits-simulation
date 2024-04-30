import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@/widgets/canvas";
import { ElectricalComponent } from "@/shared/simulation";

const sampleSchema: Array<ElectricalComponent> = [
  { _type: "resistor", a: { x: 0, y: 0 }, b: { x: 1, y: 0 }, resistance: 500 },
];

export const Route = createFileRoute("/")({
  component: () => (
    <div className="container mx-auto mt-8 border">
      <Canvas components={sampleSchema} />
    </div>
  ),
});
