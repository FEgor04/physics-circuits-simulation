import { createContext, useContext } from "react";
import { ElectricalComponentID } from "@/shared/simulation";

export type State = {
  onDeleteComponent: (id: ElectricalComponentID) => void;
};

export const context = createContext<State | null>(null);

export function useDeleteComponentContext<T>(selector: (state: State) => T): T {
  const state = useContext(context);
  if (state === null) {
    throw new Error("DeleteComponentContext is null!");
  }
  return selector(state);
}
