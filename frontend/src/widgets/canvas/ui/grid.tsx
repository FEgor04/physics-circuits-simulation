import { schemeHeight, schemeWidth } from "../lib";
import {
  useOnSelectElement,
  useSelectedElement,
  useTransformVirtualToCanvas,
} from "./context";

export function CanvasGrid() {
  const selected = useSelectedElement();
  const onSelect = useOnSelectElement();
  const coords = new Array(schemeWidth)
    .fill(0)
    .flatMap((_, x) =>
      new Array(schemeHeight).fill(0).map((_, y) => ({ x: x - 10, y: y - 10 })),
    );
  const transform = useTransformVirtualToCanvas();
  return (
    <>
      {coords.map(({ x, y }) => (
        <CanvasDot
          x={transform({ x, y }).x}
          y={transform({ x, y }).y}
          key={x * schemeWidth + y}
          isSelected={
            selected?.type == "point" &&
            selected.point.x == x &&
            selected.point.y == y
          }
          onSelect={() => {
            console.log("Select point at", x, y);
            onSelect({
              type: "point",
              point: {
                x,
                y,
              },
            });
          }}
          data-testid={`canvas-dot-${x}-${y}`}
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
  "data-testid": testId,
}: {
  x: number;
  y: number;
  isSelected: boolean;
  onSelect: () => void;
  "data-testid"?: string;
}) {
  return (
    <circle
      cx={x}
      cy={y}
      r={5}
      onClick={() => onSelect()}
      fill={isSelected ? "#ff0000" : "black"}
      className="cursor-pointer"
      data-testid={testId}
    />
  );
}
