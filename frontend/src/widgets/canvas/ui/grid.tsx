import { schemeHeight, schemeWidth } from "../lib";
import { useSelectedElement, useTransformVirtualToCanvas } from "./context";

export function CanvasGrid() {
  const selected = useSelectedElement();
  const coords = new Array(schemeWidth)
    .fill(0)
    .flatMap((_, x) =>
      new Array(schemeHeight).fill(0).map((_, y) => ({ x: x - 10, y: y - 10 })),
    );
  console.log(selected);
  return (
    <>
      {coords.map(({ x, y }) => (
        <CanvasDot
          x={x}
          y={y}
          isSelected={
            selected?.type == "point" &&
            selected.point.x == x &&
            selected.point.y == y
          }
          onSelect={console.log}
        />
      ))}
    </>
  );
}

function CanvasDot({
  x,
  y,
  isSelected,
  onSelect,
}: {
  x: number;
  y: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const transform = useTransformVirtualToCanvas();
  const point = transform({ x, y });
  return (
    <circle
      cx={point.x}
      cy={point.y}
      r={5}
      onClick={() => onSelect()}
      fill={isSelected ? "#ff0000" : "black"}
      className="cursor-pointer"
    />
  );
}
