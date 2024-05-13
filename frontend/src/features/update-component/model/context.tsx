import { createContext, useContext } from "react";
import { ElectricalComponentWithID } from "@/shared/simulation";

export type State = {
  onUpdateComponent: (component: ElectricalComponentWithID) => void;
};

export const UpdateComponentContext = createContext<State | null>(null);

export function useUpdateComponentContext<T>(selector: (state: State) => T) {
  const state = useContext(UpdateComponentContext);
  if (state == null) {
    throw new Error("UpdateComponentContext is null");
  }
  return selector(state);
}
