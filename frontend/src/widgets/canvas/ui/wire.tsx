import { useOnSelectComponent, useSelectedComponent } from "@/features/select-component";
import { Wire } from "@/shared/simulation";
import { WithID } from "@/shared/simulation/types.ts";
import { useTransformVirtualToCanvas } from "./context";
import "./style.css";

export function WireRenderer({ component }: { component: WithID<Wire> }) {
  const transformer = useTransformVirtualToCanvas();
  const onSelect = useOnSelectComponent();
  const thisComponent = {
    type: "component",
    id: component.id,
  } as const;
  const selectedComponent = useSelectedComponent();
  const isSelected = selectedComponent?.type == "component" && selectedComponent.id == component.id;
  const { a, b } = component;
  const aTransformed = transformer(component.a);
  const bTransformed = transformer(component.b);
  return (
    <>
      <line
        x1={aTransformed.x}
        y1={aTransformed.y}
        x2={bTransformed.x}
        y2={bTransformed.y}
        stroke="black"
        strokeWidth={"4px"}
        data-selected={isSelected}
        className="filter-primary"
      />
      <line
        x1={aTransformed.x}
        y1={aTransformed.y}
        x2={bTransformed.x}
        y2={bTransformed.y}
        visibility="hidden"
        pointerEvents="all"
        strokeWidth={"30px"}
        onClick={() => onSelect(thisComponent)}
        data-testid={`wire-${a.x}-${a.y}-${b.x}-${b.y}`}
        className="cursor-pointer"
      />
    </>
  );
}