import "react";
import { DndContext, DragEndEvent, MouseSensor, useSensor } from "@dnd-kit/core";
import { Point } from "@/shared/simulation/types";
import { context as AddComponentContext, State } from "./context";

type Props = React.PropsWithChildren<State>;

function getCoordsFromEvent(event: DragEndEvent): Point {
  return { x: event.delta.x + event.activatorEvent.clientX, y: event.delta.y + event.activatorEvent.clientY };
}

export const AddComponentContextProvider: React.FC<Props> = ({ children, ...props }) => {
  const mouseSensor = useSensor(MouseSensor);
  return (
    <AddComponentContext.Provider value={props}>
      <DndContext
        sensors={[mouseSensor]}
        onDragEnd={(e) => {
          const over = e.over;
          if (!over) {
            return;
          }
          console.log(e);
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
          console.log(xVirtual, yVirtual);
          props.onAddComponent({
            _type: "resistor",
            a: {
              x: xVirtual,
              y: yVirtual,
            },
            b: {
              x: xVirtual + 1,
              y: yVirtual + 1,
            },
            resistance: 10,
          });
        }}
      >
        {children}
      </DndContext>
    </AddComponentContext.Provider>
  );
};
