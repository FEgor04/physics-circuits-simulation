import { useCallback, useEffect, useRef, useState } from "react";
import { ElectricalComponent } from "@/shared/simulation";
import { Point, Wire } from "@/shared/simulation/types";
import { CanvasContext, CanvasState } from "./context";
import { GenericRenderer } from "./generic-renderer";
import { CanvasGrid } from "./grid";

type Props = {
  components: Array<ElectricalComponent>;
  onAddComponent: (component: ElectricalComponent) => void;
  onSelectComponent: (i: ElectricalComponent) => void;
};

function pointsEqual(a: Point, b: Point): boolean {
  return a.x == b.x && a.y == b.y;
}

function wireEqual(a: Wire, b: Wire): boolean {
  return (pointsEqual(a.a, b.a) && pointsEqual(a.b, b.b)) || (pointsEqual(a.a, b.b) && pointsEqual(a.b, b.a));
}

export function Canvas({ components, onAddComponent, onSelectComponent }: Props) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState | undefined>(undefined);

  const onSelectPoint = useCallback(
    (selected: CanvasState["selected"]): void => {
      if (canvasState?.selected?.type == "point" && selected?.type == "point") {
        const newWire: Wire = {
          _type: "wire",
          a: canvasState.selected.point,
          b: selected.point,
        };
        const alreadyExists = components.find((it) => it._type == "wire" && wireEqual(newWire, it));
        if (!alreadyExists) {
          onAddComponent(newWire);
        }
        return onSelectPoint(undefined);
      }
      setCanvasState((prev) => ({ ...prev!, selected }));
    },
    [canvasState?.selected, components, onAddComponent],
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvasParams = {
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
      };
      setCanvasState((prev) => ({
        ...prev!,
        canvasParams,
        onSelect: onSelectPoint,
      }));
    }
  }, [canvasRef, onSelectPoint]);

  return (
    <div className="h-[90vh] w-full">
      <svg ref={canvasRef} className="mx-auto h-full w-full">
        {canvasState && (
          <CanvasContext.Provider value={canvasState}>
            {components.map((it, ind) => (
              <GenericRenderer key={ind} component={it} onClick={() => onSelectComponent(it)} />
            ))}
            <CanvasGrid />
          </CanvasContext.Provider>
        )}
      </svg>
    </div>
  );
}
