import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CanvasPanel } from "@/widgets/canvas";
import { ComponentChooseBar } from "@/widgets/component-choose-bar";
import { ComponentSettingsBar } from "@/widgets/component-settings-bar";
import { StateButton } from "@/widgets/state-button";
import { AddComponentContextProvider } from "@/features/add-component";
import { DeleteComponentProvider } from "@/features/delete-component";
import { GetMeasurementProvider } from "@/features/measurment";
import { SelectComponentProvider, SelectComponentState } from "@/features/select-component";
import { UpdateComponentProvider } from "@/features/update-component";
import { GetZoomCoefficientProvider } from "@/features/zoom-provider";
import { Scheme, useUpdateSchemeMutation } from "@/entities/scheme";
import { schemaErrors } from "@/shared/simulation/errors";
import { Button } from "@/shared/ui/button";
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

  const { mutate, isPending } = useUpdateSchemeMutation();

  const [selected, setSelected] = useState<SelectComponentState["selected"]>(undefined);
  const selectedComponent = useMemo(() => {
    if (selected?.type == "component") {
      return components.find((it) => it.id == selected.id);
    }
    return undefined;
  }, [selected, components]);

  const getMeasurementForComponent = (id: number) => {
    if (mode == "editing") return undefined;
    const measurements = simulator.getMeasurementsForComponent(id);
    if (measurements.currency != 0) {
      return measurements.currency;
    }
    return measurements.voltage;
  };

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
        <GetZoomCoefficientProvider zoomCoefficient={48}>
          <DeleteComponentProvider onDeleteComponent={onDeleteComponent}>
            <AddComponentContextProvider onAddComponent={(c) => onAddComponent(c).id}>
              <UpdateComponentProvider onUpdateComponent={onUpdateComponent}>
                <GetMeasurementProvider getCurrentMeasurement={(id: number) => getMeasurementForComponent(id)}>
                  <ResizablePanelGroup direction="horizontal">
                    <div className="space-y-8 border-r-4 bg-white p-4">
                      {mode == "editing" && <ComponentChooseBar />}
                      <Button
                        onClick={() => {
                          mutate({
                            ...scheme,
                            components,
                          });
                        }}
                        disabled={isPending}
                      >
                        {isPending && <RotateCcw className="mr-2 size-4 animate-spin" />}
                        Сохранить
                      </Button>
                    </div>
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
                </GetMeasurementProvider>
              </UpdateComponentProvider>
            </AddComponentContextProvider>
          </DeleteComponentProvider>
        </GetZoomCoefficientProvider>
      </SelectComponentProvider>
    </div>
  );
}
