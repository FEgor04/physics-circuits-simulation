import { useSuspenseQuery } from "@tanstack/react-query";
import { useBlocker } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CanvasPanel } from "@/widgets/canvas";
import { ComponentChooseBar } from "@/widgets/component-choose-bar";
import { ComponentSettingsBar } from "@/widgets/component-settings-bar";
import { RheostatKnob } from "@/widgets/rheostat-knob-bar";
import { StateButton } from "@/widgets/state-button";
import { AddComponentContextProvider } from "@/features/add-component";
import { DeleteComponentProvider } from "@/features/delete-component";
import { GetMeasurementProvider } from "@/features/measurment";
import { SelectComponentProvider, SelectComponentState } from "@/features/select-component";
import { UpdateComponentProvider } from "@/features/update-component";
import { GetZoomCoefficientProvider } from "@/features/zoom-provider";
import { Scheme, getSchemeByIDQueryOptions, useUpdateSchemeMutation } from "@/entities/scheme";
import { schemaErrors } from "@/shared/simulation/errors";
import { AlertDialog } from "@/shared/ui/alert-dialog";
import { PendingButton } from "@/shared/ui/button";
import { ResizableHandle, ResizablePanelGroup } from "@/shared/ui/resizable.tsx";
import { useSimulationState } from "../model/state";
import { SimulationBlockDialog } from "./block";

type Props = {
  mode: "simulation" | "editing";
  setMode: (mode: "simulation" | "editing") => void;
  scheme: Scheme;
};

export function Simulation({ mode, setMode, scheme: initialScheme }: Props) {
  const { data: scheme } = useSuspenseQuery({
    ...getSchemeByIDQueryOptions(initialScheme.id),
    initialData: initialScheme,
  });
  const {
    components,
    onAddComponent,
    onUpdateComponent,
    onUpdateComponentCoords,
    onDeleteComponent,
    simulator,
    errors,
    isDirty,
  } = useSimulationState(scheme.components);

  const { status, proceed, reset } = useBlocker({ condition: isDirty });

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
                      {mode == "editing" ? (
                        <ComponentChooseBar />
                      ) : (
                        selectedComponent?._type == "rheostat" && <RheostatKnob component={selectedComponent} />
                      )}
                      <PendingButton
                        size="icon"
                        className="aspect-square w-full"
                        onClick={() => {
                          const toastId = toast.loading("Сохраняем схему...");
                          mutate(
                            {
                              ...scheme,
                              components,
                            },
                            {
                              onSuccess: () => {
                                toast.success("Схема успешно сохранена", { id: toastId });
                              },
                              onError: (err) => {
                                toast.error("Ошибка! " + err.message, { id: toastId });
                              },
                            },
                          );
                        }}
                        disabled={isPending || !scheme.canEdit}
                        icon={<Save />}
                      />
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
      <AlertDialog open={status == "blocked"}>
        <SimulationBlockDialog proceed={proceed} reset={reset} />
      </AlertDialog>
    </div>
  );
}
