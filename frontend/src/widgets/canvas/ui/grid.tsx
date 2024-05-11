import { useOnSelectComponent, useSelectedComponent } from "@/features/select-component";
import { pointsEqual } from "@/shared/simulation/lib";
import { useCanvasParams, useTransformVirtualToCanvas } from "./context";

export function CanvasGrid() {
  const canvasParams = useCanvasParams();
  const selected = useSelectedComponent();
  const onSelect = useOnSelectComponent();
  const xMin = -Math.floor(canvasParams.schemeWidth / 2);
  const yMin = -Math.floor(canvasParams.schemeHeight / 2);
  console.log(xMin, yMin);
  const coords = new Array(canvasParams.schemeWidth)
    .fill(0)
    .flatMap((_, x) => new Array(canvasParams.schemeHeight).fill(0).flatMap((_, y) => ({ x: xMin + x, y: yMin + y })));
  console.log(coords);
  const transform = useTransformVirtualToCanvas();
  return (
    <>
      {coords.map(({ x, y }) => (
        <CanvasDot
          x={transform({ x, y }).x}
          y={transform({ x, y }).y}
          key={x * canvasParams.schemeWidth + y}
          isSelected={selected?.type == "point" && pointsEqual(selected.point, { x, y })}
          onSelect={() => {
            onSelect({
              type: "point",
              point: {
                x,
                y,
              },
            });
          }}
          data-testid={`dot-${x}-${y}`}
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
    <>
      <circle // visible circle
        cx={x}
        cy={y}
        r={isSelected ? 5 : 3}
        fill={isSelected ? "#A81BE4" : "#9A97A3"}
      />
      <circle // invisible clickable circle
        cx={x}
        cy={y}
        r={10}
        onClick={() => onSelect()}
        opacity={0}
        className="cursor-pointer"
        data-testid={testId}
      />
    </>
  );
}
