import { schemeHeight, schemeWidth } from "../lib";
import { useTransformVirtualToCanvas } from "./context";

export function CanvasGrid() {
  const transform = useTransformVirtualToCanvas();
  const coords = new Array(schemeWidth)
    .fill(0)
    .flatMap((_, x) =>
      new Array(schemeHeight).fill(0).map((_, y) => ({ x: x - 10, y: y - 10 })),
    )
    .map((point) => transform(point));
  return (
    <>
      {coords.map(({ x, y }) => (
        <circle cx={x} cy={y} r={5} />
      ))}
    </>
  );
}
