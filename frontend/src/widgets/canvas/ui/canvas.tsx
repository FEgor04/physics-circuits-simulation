import { useEffect, useRef, useState } from "react";
import { ElectricalComponent } from "@/shared/simulation";
import { ElectricalComponentID, ElectricalComponentWithID } from "@/shared/simulation/types";
import { CanvasContext, CanvasState } from "./context";
import { CanvasDndContext } from "./dnd";
import { GenericRenderer } from "./generic-renderer";
import { CanvasGrid } from "./grid";

type Props = {
  components: Array<ElectricalComponentWithID>;
  onAddComponent: (component: ElectricalComponent) => void;
  onUpdateComponent: (component: ElectricalComponentWithID) => void;
  onUpdateComponentCoords: (id: ElectricalComponentID, deltaX: number, deltaY: number) => void;
  onSelectComponent: (i: ElectricalComponentWithID) => void;
  canvasSize: number;
};

export function Canvas({ components, canvasSize, onUpdateComponentCoords }: Props) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState | undefined>(undefined);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasParams = {
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
      };
      setCanvasState({
        canvasParams,
      });
    }
  }, [canvasRef, canvasSize]);

  return (
    <svg ref={canvasRef} className="mx-auto h-full w-full">
      {canvasState && (
        <CanvasContext.Provider value={canvasState}>
          <CanvasDndContext onUpdateComponentCoords={onUpdateComponentCoords}>
            {components.map((it, ind) => (
              <GenericRenderer key={ind} component={it} />
            ))}
          </CanvasDndContext>
          <CanvasGrid />
        </CanvasContext.Provider>
      )}
    </svg>
  );
}
