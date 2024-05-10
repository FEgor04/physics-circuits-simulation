import { useDraggable } from "@dnd-kit/core";
import { useOnSelectComponent, useSelectedComponent } from "@/features/select-component";
import resistorSvg from "@/shared/assets/circuit/resistor.svg";
import { Resistor } from "@/shared/simulation";
import { WithID } from "@/shared/simulation/types.ts";
import { useTransformVirtualToCanvas } from "./context";

export function ResistorRenderer({ component }: { component: WithID<Resistor> }) {
  const { setNodeRef, transform, listeners, isDragging, attributes } = useDraggable({
    id: component.id,
  });
  const transformer = useTransformVirtualToCanvas();
  const onSelect = useOnSelectComponent();
  const selectedComponent = useSelectedComponent();
  const isSelected = selectedComponent?.type == "component" && selectedComponent.id == component.id;
  const aTransformed = transformer(component.a);
  const bTransformed = transformer(component.b);
  const resistorHeight = 16;
  return (
    <image
      x={aTransformed.x + (transform?.x ?? 0)}
      y={aTransformed.y - resistorHeight / 2 + (transform?.y ?? 0)}
      width={bTransformed.x - aTransformed.x}
      height={resistorHeight}
      href={resistorSvg}
      ref={(ref) => setNodeRef(ref as unknown as HTMLElement)}
      color={isDragging ? "red" : "black"}
      {...attributes}
      {...listeners}
      onClick={() => onSelect({ type: "component", id: component.id })}
      data-testid={`resistor-${component.id}`}
      data-selected={isSelected}
    />
  );
}
