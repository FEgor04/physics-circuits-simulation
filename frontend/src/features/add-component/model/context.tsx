import { createContext, useContext } from "react";
import { ElectricalComponent, ElectricalComponentID } from "@/shared/simulation";

export type State = {
  onAddComponent: (component: ElectricalComponent) => ElectricalComponentID;
};

export const context = createContext<State | null>(null);

export function useAddComponentContext<T>(selector: (state: State) => T): T {
  const state = useContext(context);
  if (state === null) {
    throw new Error("AddComponentContext is null!");
  }
  return selector(state);
}
