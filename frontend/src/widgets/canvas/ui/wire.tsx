import { Wire } from "@/shared/simulation";
import { useTransformVirtualToCanvas } from "./context";

export function WireRenderer({ component, onClick }: { component: Wire; onClick: () => void }) {
  const transformer = useTransformVirtualToCanvas();
  const aTransformed = transformer(component.a);
  const bTransformed = transformer(component.b);
  return (
    <line
      x1={aTransformed.x}
      y1={aTransformed.y}
      x2={bTransformed.x}
      y2={bTransformed.y}
      stroke="black"
      strokeWidth={"3px"}
      onClick={onClick}
    />
  );
}
