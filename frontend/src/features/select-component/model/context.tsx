import { createContext, useContext } from "react";
import { ElectricalComponentID } from "@/shared/simulation";
import { Point } from "@/shared/simulation/types";

type SelectedComponent = {
  type: "component";
  id: ElectricalComponentID;
};

type SelectedPoint = {
  type: "point";
  point: Point;
};

type Selectable = SelectedComponent | SelectedPoint;

export type State = {
  selected: Selectable | undefined;
  onSelect: (selected: Selectable | undefined) => void;
};

export const context = createContext<State | null>(null);

export function useSelectContext<T>(selector: (state: State) => T): T {
  const state = useContext(context);
  if (state === null) {
    throw new Error("SelectComponentContext is null!");
  }
  return selector(state);
}
