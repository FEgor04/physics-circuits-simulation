import "react";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor } from "@dnd-kit/core";
import type { OmitBetter } from "@/shared/lib/types";
import { ElectricalComponent, Point } from "@/shared/simulation/types";
import { context as AddComponentContext, State } from "./context";

type Props = React.PropsWithChildren<State>;

function getCoordsFromEvent(event: DragEndEvent): Point {
  if (event.activatorEvent instanceof TouchEvent) {
    return { x: event.delta.x, y: event.delta.y };
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
          const coefficient = Math.min(canvasWidth, canvasHeight) / 21;
          const xCanvas = x - left;
          const yCanvas = y - top;
          const xVirtual = Math.ceil((xCanvas - canvasWidth / 2) / coefficient);
          const yVirtual = Math.ceil((canvasHeight / 2 - yCanvas) / coefficient);
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
