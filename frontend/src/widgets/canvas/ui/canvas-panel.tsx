import React, { useState } from "react";
import { ResizablePanel } from "@/shared/ui/resizable.tsx";
import { Canvas } from "./canvas.tsx";

type Props = React.ComponentProps<typeof Canvas>;

export function CanvasPanel(props: Props) {
  const [canvasSize, setCanvasSize] = useState<number>(65);
  return (
    <ResizablePanel onResize={setCanvasSize} minSize={50} maxSize={90} defaultSize={canvasSize} order={2}>
      <Canvas {...props} />
    </ResizablePanel>
  );
}
