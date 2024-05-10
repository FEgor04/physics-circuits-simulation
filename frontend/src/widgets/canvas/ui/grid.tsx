import { useOnSelectComponent, useSelectedComponent } from "@/features/select-component";
import { pointsEqual } from "@/shared/simulation/lib";
import { schemeHeight, schemeWidth } from "../lib";
import { useTransformVirtualToCanvas } from "./context";

export function CanvasGrid() {
  const selected = useSelectedComponent();
  const onSelect = useOnSelectComponent();
  const coords = new Array(schemeWidth)
    .fill(0)
    .flatMap((_, x) => new Array(schemeHeight).fill(0).map((_, y) => ({ x: x - 10, y: y - 10 })));
  const transform = useTransformVirtualToCanvas();
  return (
    <>
      {coords.map(({ x, y }) => (
        <CanvasDot
          x={transform({ x, y }).x}
          y={transform({ x, y }).y}
          key={x * schemeWidth + y}
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
        className="fill-[#9A97A3] data-[selected=true]:fill-primary"
        data-selected={isSelected}
        data-testid={`${testId}-visual`}
      />
      <circle // invisible clickable circle
        cx={x}
        cy={y}
        r={10}
        onClick={() => onSelect()}
        opacity={0}
        className="cursor-pointer"
        data-testid={testId}
        data-selected={isSelected}
      />
    </>
  );
}
