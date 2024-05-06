import resistorSvg from "@/shared/assets/circuit/resistor.svg";
import { Resistor } from "@/shared/simulation";
import { WithID } from "@/shared/simulation/types.ts";
import { SelectedComponent, useOnSelectElement, useTransformVirtualToCanvas } from "./context";

export function ResistorRenderer({ component }: { component: WithID<Resistor> }) {
  const transformer = useTransformVirtualToCanvas();
  const onSelect = useOnSelectElement();
  const selectedComponent: SelectedComponent = {
    type: "component",
    id: component.id,
  };
  const aTransformed = transformer(component.a);
  const bTransformed = transformer(component.b);
  const resistorHeight = 16;
  return (
    <image
      x={aTransformed.x}
      y={aTransformed.y - resistorHeight / 2}
      width={bTransformed.x - aTransformed.x}
      height={resistorHeight}
      href={resistorSvg}
      onClick={() => onSelect(selectedComponent)}
    />
  );
}
