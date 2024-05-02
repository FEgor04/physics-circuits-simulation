import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Canvas } from "@/widgets/canvas";
import { ComponentSettingsBar } from "@/widgets/component-settings-bar";
import { ComponentsBar } from "@/widgets/components-bar";
import { ElectricalComponent } from "@/shared/simulation";

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
    return (
      <div className="grid grid-cols-[minmax(200px,_1fr)_6fr_minmax(250px,_1fr)] grid-rows-1 gap-0">
        <ComponentsBar />
        <div className="container mx-auto mt-8">
          <Canvas
            components={schema}
            onSelectComponent={updateSelectedComponentIndex}
            onAddComponent={(newComponent) => setSchema((old) => [...old, newComponent])}
          />
        </div>
        <ComponentSettingsBar selectedComponent={selectedComponent} />
      </div>
    );
  },
});
