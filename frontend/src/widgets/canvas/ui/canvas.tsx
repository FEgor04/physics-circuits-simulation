import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { useGetZoomCoefficient } from "@/features/zoom-provider";
import { ElectricalComponent } from "@/shared/simulation";
import { ElectricalComponentID, ElectricalComponentWithID } from "@/shared/simulation/types";
import { CanvasParams } from "../lib";
import { CanvasContext, CanvasState } from "./context";
import { CanvasDndContext } from "./dnd";
import { GenericRenderer } from "./generic-renderer";
import { CanvasGrid } from "./grid";

type Props = {
  components: Array<ElectricalComponentWithID>;
  onAddComponent: (component: ElectricalComponent) => void;
  onUpdateComponent: (component: ElectricalComponentWithID) => void;
  onUpdateComponentCoords: (id: ElectricalComponentID, deltaX: number, deltaY: number) => void;
};

export function Canvas({ components, onUpdateComponentCoords }: Props) {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  const canvasRef = useRef<SVGSVGElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState | undefined>(undefined);
  const zoomCoefficient = useGetZoomCoefficient();
  useEffect(() => {
    // Ratio between width and schemeWidth
    if (canvasRef.current) {
      const canvasParams: CanvasParams = {
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
        schemeWidth: Math.floor(canvasRef.current.clientWidth / zoomCoefficient),
        schemeHeight: Math.floor(canvasRef.current.clientHeight / zoomCoefficient),
        zoomCoefficient: zoomCoefficient,
      };
      setCanvasState({
        canvasParams,
      });
    }
  }, [canvasRef, canvasRef.current?.clientHeight, canvasRef.current?.clientWidth, zoomCoefficient]);

  return (
    <div ref={setNodeRef} className="h-full w-full">
      <svg ref={canvasRef} className="mx-auto h-full w-full" data-testid="components-canvas">
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
    </div>
  );
}
