import { createContext, useContext } from "react";

export type State = {
  zoomCoefficient: 24 | 48;
};

export const context = createContext<State | null>(null);

export function useGetZoomCoefficientContext<T>(selector: (state: State) => T): T {
  const state = useContext(context);
  if (state === null) {
    throw new Error("GetZoomCoefficient is null!");
  }
  return selector(state);
}
