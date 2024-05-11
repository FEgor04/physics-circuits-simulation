import { DndContext, Modifier } from "@dnd-kit/core";
import { ElectricalComponentID } from "@/shared/simulation";
import { useCanvasParams } from "./context";

type Props = React.PropsWithChildren<{
  onUpdateComponentCoords: (id: ElectricalComponentID, deltaX: number, deltaY: number) => void;
}>;

export function CanvasDndContext({ children, onUpdateComponentCoords }: Props) {
  const params = useCanvasParams();
  const gridSizeX = params.width / params.schemeWidth;
  const gridSizeY = params.height / params.schemeHeight;
  const snapToGridModifier: Modifier = (args) => {
    const { transform } = args;
    return {
      ...transform,
      x: Math.ceil(transform.x / gridSizeX) * gridSizeX,
      y: Math.ceil(transform.y / gridSizeY) * gridSizeY,
    };
  };
  return (
    <DndContext
      modifiers={[snapToGridModifier]}
      onDragEnd={(event) => {
        const componentId = event.active.id;
        if (typeof componentId == "string") {
          return;
        }
        const deltaGridX = Math.ceil(event.delta.x / gridSizeX);
        const deltaGridY = Math.ceil(event.delta.y / gridSizeY);
        onUpdateComponentCoords(componentId, deltaGridX, -deltaGridY);
      }}
    >
      {children}
    </DndContext>
  );
}
