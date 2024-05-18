import "react";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor } from "@dnd-kit/core";
import { Active, Over } from "@dnd-kit/core/dist/store";
import { ClientRect } from "@dnd-kit/core/dist/types";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { getEventCoordinates, Transform } from "@dnd-kit/utilities";
import { getZoomCoefficient } from "@/shared/embed/utility.ts";
import type { OmitBetter } from "@/shared/lib/types";
import { ElectricalComponent, Point } from "@/shared/simulation/types";
import { context as AddComponentContext, State } from "./context";

type Props = React.PropsWithChildren<State>;

// Why there is no such type in library...
type ModifierArgs = {
  activatorEvent: Event | null;
  active: Active | null;
  activeNodeRect: ClientRect | null;
  draggingNodeRect: ClientRect | null;
  containerNodeRect: ClientRect | null;
  over: Over | null;
  overlayNodeRect: ClientRect | null;
  scrollableAncestors: Element[];
  scrollableAncestorRects: ClientRect[];
  transform: Transform;
  windowRect: ClientRect | null;
};

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
  const gridSize = 48;
  function snapToGrid({ activatorEvent, over, draggingNodeRect, transform }: ModifierArgs) {
    if (!over) return transform;
    if (!draggingNodeRect) return transform;
    if (!activatorEvent) return transform;

    const activatorCoordinates = getEventCoordinates(activatorEvent);

    if (!activatorCoordinates) return transform;

    const mouseX = activatorCoordinates.x + transform.x;
    const mouseY = activatorCoordinates.y + transform.y;
    const canvasCentreX = Math.floor(over.rect.left + over.rect.width / 2);
    const canvasCentreY = Math.floor(over.rect.top + over.rect.height / 2);
    const mouseDeltaX = (mouseX - canvasCentreX) % gridSize;
    const mouseDeltaY = (mouseY - canvasCentreY) % gridSize;
    const elementWidth = draggingNodeRect.width;
    const elementHeight = draggingNodeRect.height;

    return {
      ...transform,
      x: transform.x - mouseDeltaX - Math.ceil(elementWidth / 2),
      y: transform.y - mouseDeltaY - elementHeight,
    };
  }

  return (
    <AddComponentContext.Provider value={props}>
      <DndContext
        sensors={[mouseSensor, touchSensor]}
        modifiers={[snapToGrid, snapCenterToCursor]}
        onDragEnd={(e) => {
          const over = e.over;
          if (!over) {
            return;
          }
          const { x, y } = getCoordsFromEvent(e)!;
          const rect = over.rect;
          const zoom = getZoomCoefficient();

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
