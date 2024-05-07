import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CanvasPanel } from "@/widgets/canvas";
import { ComponentChooseBar } from "@/widgets/component-choose-bar";
import { ComponentSettingsBar } from "@/widgets/component-settings-bar";
import { ComponentValuesBar } from "@/widgets/component-values-bar";
import { StateButton } from "@/widgets/state-button";
import { ElectricalComponent, ElectricalComponentWithID } from "@/shared/simulation";
import { ResizableHandle, ResizablePanelGroup } from "@/shared/ui/resizable.tsx";
import { addComponentWithId, updateComponentCoords } from "../lib";

export function Simulation() {
  const [schema, setSchema] = useState<Array<ElectricalComponentWithID>>([
    {
      id: 1,
      _type: "resistor",
      a: { x: 0, y: 0 },
      b: { x: 1, y: 0 },
      resistance: 500,
    },
  ]);
  const [selectedComponent, setSelectedComponent] = useState<ElectricalComponent | null>(null);
  const updateSelectedComponentIndex = (i: ElectricalComponent) => {
    setSelectedComponent(i == selectedComponent ? null : i);
  };

  const route = getRouteApi("/");
  const { state } = route.useSearch();
  const navigate = useNavigate({});

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        {state == "editing" ? <ComponentChooseBar /> : <ComponentValuesBar />}
        <ResizableHandle />
        <CanvasPanel
          components={schema}
          onSelectComponent={updateSelectedComponentIndex}
          onAddComponent={(newComponent) => setSchema((old) => addComponentWithId(old, newComponent))}
          onUpdateComponent={(component) =>
            setSchema((old) => [...old.filter((it) => it.id != component.id), component])
          }
          onUpdateComponentCoords={(id, dx, dy) =>
            setSchema((old) => {
              const oldComponent = old.find((it) => it.id == id)!;
              const newComponent = updateComponentCoords(oldComponent, dx, dy);
              return [...old.filter((it) => it.id != id), newComponent];
            })
          }
        />
        {state == "editing" ? (
          <>
            <ResizableHandle />
            <ComponentSettingsBar selectedComponent={selectedComponent} />
          </>
        ) : (
          <></>
        )}
      </ResizablePanelGroup>
      <StateButton
        isSimulation={state == "simulation"}
        onChange={() => navigate({ search: () => ({ state: state == "simulation" ? "editing" : "simulation" }) })}
      />
    </div>
  );
}