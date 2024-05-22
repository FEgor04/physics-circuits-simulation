import { DndContext, MouseSensor, TouchSensor, useSensor } from "@dnd-kit/core";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { useGetZoomCoefficient } from "@/features/zoom-provider";
import { ElectricalComponentID } from "@/shared/simulation";

type Props = React.PropsWithChildren<{
  onUpdateComponentCoords: (id: ElectricalComponentID, deltaX: number, deltaY: number) => void;
}>;

export function CanvasDndContext({ children, onUpdateComponentCoords }: Props) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const gridSize = useGetZoomCoefficient();
  return (
    <DndContext
      modifiers={[createSnapModifier(gridSize)]}
      sensors={[mouseSensor, touchSensor]}
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
