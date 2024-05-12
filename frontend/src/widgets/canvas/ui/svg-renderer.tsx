import "./style.css";
import { useDraggable } from "@dnd-kit/core";
import { useOnSelectComponent, useSelectedComponent } from "@/features/select-component";
import { ElectricalComponent, ElectricalComponentWithID, Point } from "@/shared/simulation/types.ts";
import { useTransformVirtualToCanvas } from "./context";
import { assertNever } from "@/shared/lib/types";

function getFirstPoint(component: ElectricalComponent): Point {
  if (component._type == "sourceDC" || component._type == "source") {
    return component.plus;
  }
  if (
    component._type == "resistor" ||
    component._type == "wire" ||
    component._type == "voltmeter" ||
    component._type == "ampermeter"
  ) {
    return component.a;
  } else {
    assertNever(component);
  }
}

function getSecondPoint(component: ElectricalComponent): Point {
  if (component._type == "sourceDC" || component._type == "source") {
    return component.minus;
  } else if (
    component._type == "resistor" ||
    component._type == "wire" ||
    component._type == "voltmeter" ||
    component._type == "ampermeter"
  ) {
    return component.b;
  }
  // this `else` statement is used to convince TypeScript that this function alwaysr returns a point
  else {
    assertNever(component);
  }
}

export function SVGRenderer<T extends ElectricalComponentWithID>({ component, src }: { component: T; src: string }) {
  const { setNodeRef, transform, listeners, isDragging, attributes } = useDraggable({
    id: component.id,
  });
  const transformer = useTransformVirtualToCanvas();
  const onSelect = useOnSelectComponent();
  const selectedComponent = useSelectedComponent();
  const isSelected = selectedComponent?.type == "component" && selectedComponent.id == component.id;
  const aTransformed = transformer(getFirstPoint(component));
  const bTransformed = transformer(getSecondPoint(component));
  const componentHeight = 16;
  return (
    <image
      x={aTransformed.x + (transform?.x ?? 0)}
      y={aTransformed.y - componentHeight / 2 + (transform?.y ?? 0)}
      width={bTransformed.x - aTransformed.x}
      height={componentHeight}
      href={src}
      ref={(ref) => setNodeRef(ref as unknown as HTMLElement)}
      {...attributes}
      {...listeners}
      onClick={() => onSelect({ type: "component", id: component.id })}
      data-testid={`${component._type}-${component.id}`}
      data-selected={isSelected}
      data-dragging={isDragging}
      className="filter-primary data-[dragging=true]:opacity-50"
    />
  );
}
