import { useState } from "react";
import { ElectricalComponent } from "@/shared/simulation";
import { ResizablePanel } from "@/shared/ui/resizable.tsx";
import { Canvas } from "./canvas.tsx";

type Props = {
  components: Array<ElectricalComponent>;
  onAddComponent: (component: ElectricalComponent) => void;
  onSelectComponent: (i: ElectricalComponent) => void;
};

export function CanvasPanel({ components, onAddComponent, onSelectComponent }: Props) {
  const [canvasSize, setCanvasSize] = useState<number>(65);
  return (
    <ResizablePanel onResize={setCanvasSize} minSize={10} maxSize={90} defaultSize={canvasSize} order={2}>
      <Canvas
        components={components}
        onAddComponent={onAddComponent}
        onSelectComponent={onSelectComponent}
        canvasSize={canvasSize}
      />
    </ResizablePanel>
  );
}
