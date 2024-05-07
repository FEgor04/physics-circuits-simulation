import { DndContext } from "@dnd-kit/core";

export function CanvasDndContext({ children }: React.PropsWithChildren) {
  return <DndContext>{children}</DndContext>;
}
