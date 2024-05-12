import { useState } from "react";
import { ElectricalComponent, ElectricalComponentID, ElectricalComponentWithID } from "@/shared/simulation";
import { updateComponentCoords } from "../lib";

type SimulationState = {
  components: Array<ElectricalComponentWithID>;
  onAddComponent: (newComponent: ElectricalComponent) => ElectricalComponentWithID;
  onUpdateComponent: (component: ElectricalComponentWithID) => void;
  onUpdateComponentCoords: (id: ElectricalComponentID, dx: number, dy: number) => void;
  onDeleteComponent: (id: ElectricalComponentID) => void;
};

export function useSimulationState(components: Array<ElectricalComponentWithID>): SimulationState {
  const [schema, setSchema] = useState(components);
  return {
    components: schema,
    onAddComponent: function (newComponent: ElectricalComponent): ElectricalComponentWithID {
      let id = 0;
      setSchema((old) => {
        id =
          old
            .map((it) => it.id)
            .sort()
            .reverse()[0] + 1;
        return [...old, { ...newComponent, id }];
      });
      return { ...newComponent, id };
    },
    onUpdateComponent: function (component: ElectricalComponentWithID): void {
      setSchema((old) => [...old.filter((it) => it.id != component.id), component]);
    },
    onUpdateComponentCoords: function (id: number, dx: number, dy: number): void {
      setSchema((old) => {
        const oldComponent = old.find((it) => it.id == id)!;
        const newComponent = updateComponentCoords(oldComponent, dx, dy);
        return [...old.filter((it) => it.id != id), newComponent];
      });
    },
    onDeleteComponent(id) {
      setSchema((old) => old.filter((it) => it.id != id));
    },
  };
}
