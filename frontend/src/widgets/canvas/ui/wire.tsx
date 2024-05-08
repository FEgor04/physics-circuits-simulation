import { Wire } from "@/shared/simulation";
import { WithID } from "@/shared/simulation/types.ts";
import { SelectedComponent, useOnSelectElement, useTransformVirtualToCanvas } from "./context";

export function WireRenderer({ component }: { component: WithID<Wire> }) {
  const transformer = useTransformVirtualToCanvas();
  const onSelect = useOnSelectElement();
  const selectedComponent: SelectedComponent = {
    type: "component",
    id: component.id,
  };
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
      onClick={() => onSelect(selectedComponent)}
    />
  );
}
