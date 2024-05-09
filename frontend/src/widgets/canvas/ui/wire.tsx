import { useOnSelectComponent } from "@/features/select-component";
import { Wire } from "@/shared/simulation";
import { WithID } from "@/shared/simulation/types.ts";
import { useTransformVirtualToCanvas } from "./context";

export function WireRenderer({ component }: { component: WithID<Wire> }) {
  const transformer = useTransformVirtualToCanvas();
  const onSelect = useOnSelectComponent();
  const selectedComponent = {
    type: "component",
    id: component.id,
  } as const;
  const { a, b } = component;
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
      data-testid={`wire-${a.x}-${a.y}-${b.x}-${b.y}`}
    />
  );
}
