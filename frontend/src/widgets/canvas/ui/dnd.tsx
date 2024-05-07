import { DndContext, Modifier } from "@dnd-kit/core";
import { schemeHeight, schemeWidth } from "../lib";
import { useCanvasParams } from "./context";

export function CanvasDndContext({ children }: React.PropsWithChildren) {
  const params = useCanvasParams();
  const gridSizeX = params.width / schemeWidth;
  const gridSizeY = params.height / schemeHeight;
  const snapToGridModifier: Modifier = (args) => {
    const { transform } = args;
    return {
      ...transform,
      x: Math.ceil(transform.x / gridSizeX) * gridSizeX,
      y: Math.ceil(transform.y / gridSizeY) * gridSizeY,
    };
  };
  return <DndContext modifiers={[snapToGridModifier]}>{children}</DndContext>;
}
