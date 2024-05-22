import "react";
import { DndContext, DragEndEvent, Modifier, MouseSensor, TouchSensor, useSensor } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { getEventCoordinates } from "@dnd-kit/utilities";
import type { OmitBetter } from "@/shared/lib/types";
import { ElectricalComponent, Point } from "@/shared/simulation/types";
import { context as AddComponentContext, State } from "./context";

type Props = React.PropsWithChildren<State>;

function getCoordsFromEvent(event: DragEndEvent): Point {
  return {
    x: getEventCoordinates(event.activatorEvent)!.x + event.delta.x,
    y: getEventCoordinates(event.activatorEvent)!.y + event.delta.y,
  };
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
  const gridSize = 48; // Fuck this shit idk how to provide same grid size everywhere
  // But this provider will be used only in full opened canvas
  const snapToGrid: Modifier = ({ activatorEvent, over, draggingNodeRect, transform }) => {
    if (!over) return transform;
    if (!draggingNodeRect) return transform;
    if (!activatorEvent) return transform;

    const activatorCoordinates = getEventCoordinates(activatorEvent);

    if (!activatorCoordinates) return transform;

    const mouseX = activatorCoordinates.x + transform.x;
    const mouseY = activatorCoordinates.y + transform.y;
    const canvasCentreX = Math.floor(over.rect.left + over.rect.width / 2);
    const canvasCentreY = Math.floor(over.rect.top + over.rect.height / 2);
    const elementWidth = draggingNodeRect.width;
    const elementHeight = draggingNodeRect.height;
    let mouseDeltaX = (mouseX - canvasCentreX) % gridSize;
    let mouseDeltaY = (Math.floor(mouseY - elementHeight / 2) - canvasCentreY) % gridSize;
    if (mouseDeltaX > 0) {
      mouseDeltaX -= elementWidth;
    }
    if (mouseDeltaY > 0) {
      mouseDeltaY -= elementHeight;
    }

    return {
      ...transform,
      x: transform.x - mouseDeltaX - Math.ceil(elementWidth / 2),
      y: transform.y - mouseDeltaY - Math.ceil(elementHeight / 2),
    };
  };

  return (
    <AddComponentContext.Provider value={props}>
      <DndContext
        sensors={[mouseSensor, touchSensor]}
        autoScroll={false}
        modifiers={[snapToGrid, snapCenterToCursor]}
        onDragEnd={(e) => {
          const over = e.over;
          if (!over) {
            return;
          }
          const { x, y } = getCoordsFromEvent(e)!;
          const rect = over.rect;
          const zoom = gridSize;

          const xCanvas = x - rect.left;
          const yCanvas = y - rect.top;
          const canvasWidth = rect.width;
          const canvasHeight = rect.height;

          const xVirtual = Math.floor((xCanvas - canvasWidth / 2) / zoom);
          const yVirtual = Math.floor((canvasHeight / 2 - yCanvas) / zoom);

          const data = e.active.data.current as OmitBetter<ElectricalComponent, "a" | "b" | "plus" | "minus">;
          const newComponent = componentAtCoords(data, { x: xVirtual, y: yVirtual });
          props.onAddComponent(newComponent);
        }}
      >
        {children}
      </DndContext>
    </AddComponentContext.Provider>
  );
};
