import "./style.css";
import { useDraggable } from "@dnd-kit/core";
import { useGetMeasurement } from "@/features/measurment";
import { useOnSelectComponent, useSelectedComponent } from "@/features/select-component";
import { useGetZoomCoefficient } from "@/features/zoom-provider";
import abstractMeasurer from "@/shared/assets/circuit/voltmeter_template.svg";
import { assertNever } from "@/shared/lib/types";
import { ElectricalComponent, ElectricalComponentWithID, Point } from "@/shared/simulation/types.ts";
import { useTransformVirtualToCanvas } from "./context";

function getFirstPoint(component: ElectricalComponent): Point {
  if (component._type == "sourceDC" || component._type == "source") {
    return component.minus;
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
    return component.plus;
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
  const svgSize = useGetZoomCoefficient();
  const height = component._type == "resistor" ? svgSize / 2 : svgSize;
  const getMeasurement = useGetMeasurement();
  if (
    (component._type == "voltmeter" || component._type == "ampermeter") &&
    getMeasurement(component.id) !== undefined
  ) {
    const measure = getMeasurement(component.id) ?? 0;
    return (
      <svg
        x={aTransformed.x + (transform?.x ?? 0)}
        y={aTransformed.y - height / 2 + (transform?.y ?? 0)}
        width={bTransformed.x - aTransformed.x}
        height={height}
        ref={(ref) => setNodeRef(ref as unknown as HTMLElement)}
        {...attributes}
        {...listeners}
        onClick={() => onSelect({ type: "component", id: component.id })}
        data-testid={`${component._type}-${component.id}`}
        data-selected={isSelected}
        data-dragging={isDragging}
        className="filter-primary data-[dragging=true]:opacity-50"
      >
        <image x={0} y={0} width={svgSize} href={abstractMeasurer} />
        <text
          id="dynamicText"
          x={"50%"}
          y={"50%"}
          fill="black"
          textAnchor={"middle"}
          dominantBaseline={"middle"}
          fontWeight={700}
        >
          {measure != Infinity ? Math.round((measure ?? 0) * 100) / 100 : "Inf"}
        </text>
      </svg>
    );
  }
  return (
    <image
      x={aTransformed.x + (transform?.x ?? 0)}
      y={aTransformed.y - height / 2 + (transform?.y ?? 0)}
      width={bTransformed.x - aTransformed.x}
      height={height}
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
