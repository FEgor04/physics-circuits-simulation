import { useEffect, useRef, useState } from "react";
import { ElectricalComponent } from "@/shared/simulation";
import { schemeHeight, schemeWidth, transformVirtualToCanvas } from "../lib";

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
        {canvasParams && <CanvasDots {...canvasParams} />}
      </svg>
    </div>
  );
}

function CanvasDots(params: { width: number; height: number }) {
  const coords = new Array(schemeWidth)
    .fill(0)
    .flatMap((_, x) =>
      new Array(schemeHeight).fill(0).map((_, y) => ({ x: x - 10, y: y - 10 })),
    )
    .map((point) => transformVirtualToCanvas(point, params));
  return (
    <>
      {coords.map(({ x, y }) => (
        <circle cx={x} cy={y} r={5} />
      ))}
    </>
  );
}
