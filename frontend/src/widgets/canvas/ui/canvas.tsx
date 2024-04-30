import { useEffect, useRef, useState } from "react";
import { ElectricalComponent } from "@/shared/simulation";
import { CanvasContext, CanvasState } from "./context";
import { GenericRenderer } from "./generic-renderer";
import { CanvasGrid } from "./grid";

type Props = {
  components: Array<ElectricalComponent>;
};

export function Canvas({ components }: Props) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState | undefined>(
    undefined,
  );

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasState({
        canvasParams: {
          width: canvasRef.current?.clientWidth,
          height: canvasRef.current?.clientHeight,
        },
        selected: {
          type: "point",
          point: {
            x: 0,
            y: 0,
          },
        },
      });
    }
  }, [canvasRef]);

  return (
    <div className="h-[90vh] w-full">
      <svg ref={canvasRef} className="mx-auto h-full w-full">
        {canvasState && (
          <CanvasContext.Provider value={canvasState}>
            <CanvasGrid />
            {components.map((it, ind) => (
              <GenericRenderer key={ind} component={it} />
            ))}
          </CanvasContext.Provider>
        )}
      </svg>
    </div>
  );
}
