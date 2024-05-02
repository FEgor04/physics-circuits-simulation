import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Canvas } from "@/widgets/canvas";
import { ComponentChooseBar } from "@/widgets/component-choose-bar";
import { ComponentSettingsBar } from "@/widgets/component-settings-bar";
import { ComponentValuesBar } from "@/widgets/component-values-bar";
import { StateButton } from "@/widgets/state-button";
import { ElectricalComponent } from "@/shared/simulation";

type SimulationState = "simulation" | "editing";

type RootSearch = {
  state: SimulationState;
};

export const Route = createFileRoute("/")({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [schema, setSchema] = useState<Array<ElectricalComponent>>([
      {
        _type: "resistor",
        a: { x: 0, y: 0 },
        b: { x: 1, y: 0 },
        resistance: 500,
      },
    ]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedComponent, setSelectedComponent] = useState<ElectricalComponent | null>(null);
    const updateSelectedComponentIndex = (i: ElectricalComponent) => {
      setSelectedComponent(i == selectedComponent ? null : i);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { state } = Route.useSearch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = Route.useNavigate();

    return (
      <div className="grid grid-cols-[minmax(200px,_1fr)_6fr_minmax(250px,_1fr)] grid-rows-1 gap-0">
        {state == "editing" ? <ComponentChooseBar /> : <ComponentValuesBar />}
        <div className="container mx-auto mt-8">
          <Canvas
            components={schema}
            onSelectComponent={updateSelectedComponentIndex}
            onAddComponent={(newComponent) => setSchema((old) => [...old, newComponent])}
          />
        </div>
        {state == "editing" ? <ComponentSettingsBar selectedComponent={selectedComponent} /> : <></>}
        <StateButton
          state={state == "simulation"}
          onChange={() => navigate({ search: () => ({ state: state == "simulation" ? "editing" : "simulation" }) })}
        />
      </div>
    );
  },
  validateSearch: (search: Record<string, unknown>): RootSearch => {
    return {
      state: (search.state as SimulationState) || "editing",
    };
  },
});
