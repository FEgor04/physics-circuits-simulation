import { useMemo, useState } from "react";
import { CanvasPanel } from "@/widgets/canvas";
import { ComponentChooseBar } from "@/widgets/component-choose-bar";
import { ComponentSettingsBar } from "@/widgets/component-settings-bar";
import { ComponentValuesBar } from "@/widgets/component-values-bar";
import { StateButton } from "@/widgets/state-button";
import { AddComponentContextProvider } from "@/features/add-component";
import { DeleteComponentProvider } from "@/features/delete-component";
import { SelectComponentProvider, SelectComponentState } from "@/features/select-component";
import { ResizableHandle, ResizablePanelGroup } from "@/shared/ui/resizable.tsx";
import { useSimulationState } from "../model/state";

type Props = {
  mode: "simulation" | "editing";
  setMode: (mode: "simulation" | "editing") => void;
};

export function Simulation({ mode, setMode }: Props) {
  const { components, onAddComponent, onUpdateComponent, onUpdateComponentCoords, onDeleteComponent } =
    useSimulationState([
      {
        id: 1,
        _type: "resistor",
        a: { x: 0, y: 0 },
        b: { x: 1, y: 0 },
        resistance: 500,
      },
    ]);
  const [selected, setSelected] = useState<SelectComponentState["selected"]>(undefined);
  const selectedComponent = useMemo(() => {
    if (selected?.type == "component") {
      return components.find((it) => it.id == selected.id);
    }
    return undefined;
  }, [selected, components]);

  return (
    <div className="h-screen">
      <SelectComponentProvider
        selected={selected}
        onSelect={(selected) => {
          setSelected((oldSelected) => {
            console.log("New selected is", selected);
            if (selected?.type == "point" && oldSelected?.type == "point") {
              onAddComponent({ _type: "wire", a: oldSelected.point, b: selected.point });
              return undefined;
            }
            return selected;
          });
        }}
      >
        <DeleteComponentProvider onDeleteComponent={onDeleteComponent}>
          <AddComponentContextProvider onAddComponent={(c) => onAddComponent(c).id}>
            <ResizablePanelGroup direction="horizontal">
              {mode == "editing" ? <ComponentChooseBar /> : <ComponentValuesBar />}
              <ResizableHandle />
              <CanvasPanel
                components={components}
                onAddComponent={onAddComponent}
                onUpdateComponent={onUpdateComponent}
                onUpdateComponentCoords={onUpdateComponentCoords}
              />
              {mode == "editing" ? (
                <>
                  <ResizableHandle />
                  <ComponentSettingsBar selectedComponent={selectedComponent} />
                </>
              ) : (
                <></>
              )}
            </ResizablePanelGroup>
            <StateButton
              isSimulation={mode == "simulation"}
              onChange={() => setMode(mode == "editing" ? "simulation" : "editing")}
            />
          </AddComponentContextProvider>
        </DeleteComponentProvider>
      </SelectComponentProvider>
    </div>
  );
}
