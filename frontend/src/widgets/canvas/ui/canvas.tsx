import { useEffect, useRef, useState } from "react";
import { ElectricalComponent } from "@/shared/simulation";
import { CanvasContext } from "./context";
import { GenericRenderer } from "./generic-renderer";
import { CanvasGrid } from "./grid";

type Props = {
  components: Array<ElectricalComponent>;
};

export function Canvas({ components }: Props) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [canvasParams, setCanvasParams] = useState<
    { width: number; height: number } | undefined
  >(undefined);

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasParams({
        width: canvasRef.current?.clientWidth,
        height: canvasRef.current?.clientHeight,
      });
    }
  }, [canvasRef]);

  return (
    <div className="h-[90vh] w-full">
      <svg ref={canvasRef} className="mx-auto h-full w-full">
        {canvasParams && (
          <CanvasContext.Provider value={{ canvasParams: canvasParams }}>
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
