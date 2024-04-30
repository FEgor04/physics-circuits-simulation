import { useCallback, useEffect, useRef, useState } from "react";
import { ElectricalComponent } from "@/shared/simulation";
import { CanvasContext, CanvasState } from "./context";
import { GenericRenderer } from "./generic-renderer";
import { CanvasGrid } from "./grid";

type Props = {
  components: Array<ElectricalComponent>;
  onAddComponent: (component: ElectricalComponent) => void;
};

export function Canvas({ components, onAddComponent }: Props) {
  const canvasRef = useRef<SVGSVGElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState | undefined>(
    undefined,
  );

  const onSelectComponent = useCallback(
    (selected: CanvasState["selected"]): void => {
      if (canvasState?.selected?.type == "point" && selected?.type == "point") {
        onAddComponent({
          _type: "wire",
          a: canvasState.selected.point,
          b: selected.point,
        });
        return onSelectComponent(undefined);
      }
      setCanvasState((prev) => ({ ...prev!, selected }));
    },
    [canvasState?.selected, onAddComponent],
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
        onSelect: onSelectComponent,
      }));
    }
  }, [canvasRef, onSelectComponent]);

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
