import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CanvasPanel } from "@/widgets/canvas";
import { ComponentChooseBar } from "@/widgets/component-choose-bar";
import { ComponentSettingsBar } from "@/widgets/component-settings-bar";
import { ComponentValuesBar } from "@/widgets/component-values-bar";
import { StateButton } from "@/widgets/state-button";
import { AddComponentContextProvider } from "@/features/add-component";
import { DeleteComponentProvider } from "@/features/delete-component";
import { SelectComponentProvider, SelectComponentState } from "@/features/select-component";
import { UpdateComponentProvider } from "@/features/update-component";
import { Scheme } from "@/entities/scheme";
import { schemaErrors } from "@/shared/simulation/errors";
import { ResizableHandle, ResizablePanelGroup } from "@/shared/ui/resizable.tsx";
import { useSimulationState } from "../model/state";

type Props = {
  mode: "simulation" | "editing";
  setMode: (mode: "simulation" | "editing") => void;
  scheme: Scheme;
};

export function Simulation({ mode, setMode, scheme }: Props) {
  const {
    components,
    onAddComponent,
    onUpdateComponent,
    onUpdateComponentCoords,
    onDeleteComponent,
    simulator,
    errors,
  } = useSimulationState(scheme.components);
  const [selected, setSelected] = useState<SelectComponentState["selected"]>(undefined);
  const selectedComponent = useMemo(() => {
    if (selected?.type == "component") {
      return components.find((it) => it.id == selected.id);
    }
    return undefined;
  }, [selected, components]);

  const selectedComponentMeasurements = useMemo(() => {
    if (
      selectedComponent == undefined ||
      (selectedComponent._type != "ampermeter" && selectedComponent._type != "voltmeter")
    ) {
      return undefined;
    }
    const measurements = simulator.getMeasurementsForComponent(selectedComponent.id);
    if (selectedComponent._type == "ampermeter") {
      return measurements.currency;
    }
    return measurements.voltage;
  }, [selectedComponent, simulator]);

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
            <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
              <ResizablePanelGroup direction="horizontal">
                {mode == "editing" ? (
                  <ComponentChooseBar />
                ) : (
                  (selectedComponent?._type == "ampermeter" || selectedComponent?._type == "voltmeter") &&
                  selectedComponentMeasurements !== undefined && (
                    <ComponentValuesBar type={selectedComponent._type} measurements={selectedComponentMeasurements} />
                  )
                )}
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
                onChange={() => {
                  if (mode == "editing" && errors != undefined) {
                    toast.error(`Ошибка! ${schemaErrors[errors]}`);
                    return;
                  }
                  setMode(mode == "simulation" ? "editing" : "simulation");
                }}
              />
            </UpdateComponentProvider>
          </AddComponentContextProvider>
        </DeleteComponentProvider>
      </SelectComponentProvider>
    </div>
  );
}
