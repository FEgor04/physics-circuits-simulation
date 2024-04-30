import { ElectricalComponent } from "@/shared/simulation";
import { useEffect, useRef, useState } from "react";

type Props = {
  components: Array<ElectricalComponent>;
};

/**
 * Ширина и высота сетки компонентов
 * Измеряется в количетсве точек, доступных для установки компонентов
 **/
const schemeWidth = 20;
const schemeHeight = 20;

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

function CanvasDots({ width, height }: { width: number; height: number }) {
  const coefficientX = width / schemeWidth;
  const coefficientY = height / schemeHeight;
  const offsetX = coefficientX / 2;
  const offsetY = coefficientY / 2;
  console.log(coefficientX, coefficientY);
  const coords = new Array(schemeWidth)
    .fill(0)
    .flatMap((_, x) =>
      new Array(schemeHeight).fill(0).map((_, y) => ({ x, y })),
    );
  return (
    <>
      {coords.map(({ x, y }) => (
        <circle
          cx={x * coefficientX + offsetX}
          cy={y * coefficientY + offsetY}
          r={5}
        />
      ))}
    </>
  );
}
