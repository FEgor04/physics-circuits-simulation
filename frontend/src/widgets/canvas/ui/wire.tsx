import { Wire } from "@/shared/simulation";
import { CanvasParams, transformVirtualToCanvas } from "../lib";

export function WireRenderer({
  component,
  params,
}: {
  component: Wire;
  params: CanvasParams;
}) {
  const aTransformed = transformVirtualToCanvas(component.a, params);
  const bTransformed = transformVirtualToCanvas(component.b, params);
  return (
    <line
      x1={aTransformed.x}
      y1={aTransformed.y}
      x2={bTransformed.x}
      y2={bTransformed.y}
      stroke="black"
    />
  );
}
