import "react";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor } from "@dnd-kit/core";
import { getZoomCoefficient } from "@/shared/embed/utility.ts";
import type { OmitBetter } from "@/shared/lib/types";
import { ElectricalComponent, Point } from "@/shared/simulation/types";
import { context as AddComponentContext, State } from "./context";

type Props = React.PropsWithChildren<State>;

function getCoordsFromEvent(event: DragEndEvent): Point {
  if (event.activatorEvent instanceof TouchEvent) {
    return {
      x: event.delta.x + event.activatorEvent.touches[0].clientX,
      y: event.delta.y + event.activatorEvent.touches[0].clientY,
    };
  } else if (event.activatorEvent instanceof MouseEvent) {
    return { x: event.delta.x + event.activatorEvent.clientX, y: event.delta.y + event.activatorEvent.clientY };
  }
  throw new Error("Unexpected drag event");
}

function componentAtCoords(
  values: OmitBetter<ElectricalComponent, "a" | "b" | "plus" | "minus">,
  point: Point,
): ElectricalComponent {
  if (values._type == "source" || values._type == "sourceDC") {
    return {
      ...values,
      minus: point,
      plus: { x: point.x + 1, y: point.y },
    };
  }
  return { ...values, a: point, b: { x: point.x + 1, y: point.y } };
}

export const AddComponentContextProvider: React.FC<Props> = ({ children, ...props }) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  return (
    <AddComponentContext.Provider value={props}>
      <DndContext
        sensors={[mouseSensor, touchSensor]}
        onDragEnd={(e) => {
          const over = e.over;
          if (!over) {
            return;
          }
          const { x, y } = getCoordsFromEvent(e);
          const rect = over.rect;
          const canvasWidth = rect.width;
          const canvasHeight = rect.height;
          const top = rect.top;
          const left = rect.left;
          const coefficient = getZoomCoefficient();
          const xCanvas = x - left;
          const yCanvas = y - top;
          const schemeWidth = Math.floor(canvasWidth / coefficient);
          const schemeHeight = Math.floor(canvasHeight / coefficient);
          const xVirtual = Math.floor(xCanvas / coefficient) - Math.floor(schemeWidth / 2);
          const yVirtual = Math.floor(schemeHeight / 2) - Math.floor(yCanvas / coefficient);
          const data = e.active.data.current as OmitBetter<ElectricalComponent, "a" | "b" | "plus" | "minus">;
          const newComponent = componentAtCoords(data, { x: xVirtual, y: yVirtual });
          console.log(newComponent);
          props.onAddComponent(newComponent);
        }}
      >
        {children}
      </DndContext>
    </AddComponentContext.Provider>
  );
};
