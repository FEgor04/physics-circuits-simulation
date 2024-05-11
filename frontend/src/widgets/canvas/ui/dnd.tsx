import { DndContext, Modifier, MouseSensor, useSensor } from "@dnd-kit/core";
import { ElectricalComponentID } from "@/shared/simulation";
import { schemeHeight, schemeWidth } from "../lib";
import { useCanvasGrid, useCanvasParams } from "./context";

type Props = React.PropsWithChildren<{
  onUpdateComponentCoords: (id: ElectricalComponentID, deltaX: number, deltaY: number) => void;
}>;

export function CanvasDndContext({ children, onUpdateComponentCoords }: Props) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const gridSize = useCanvasGrid();
  const snapToGridModifier: Modifier = (args) => {
    const { transform } = args;
    return {
      ...transform,
      x: Math.ceil(transform.x / gridSize) * gridSize,
      y: Math.ceil(transform.y / gridSize) * gridSize,
    };
  };
  return (
    <DndContext
      modifiers={[snapToGridModifier]}
      sensors={[mouseSensor]}
      onDragEnd={(event) => {
        const componentId = event.active.id;
        if (typeof componentId == "string") {
          return;
        }
        const deltaGridX = Math.ceil(event.delta.x / gridSize);
        const deltaGridY = Math.ceil(event.delta.y / gridSize);
        onUpdateComponentCoords(componentId, deltaGridX, -deltaGridY);
      }}
    >
      {children}
    </DndContext>
  );
}
