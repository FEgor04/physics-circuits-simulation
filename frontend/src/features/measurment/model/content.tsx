import { createContext, useContext } from "react";

export type State = {
  getCurrentMeasurement: (id: number) => number | undefined;
};

export const context = createContext<State | null>(null);

export function useGetMeasurementContext<T>(selector: (state: State) => T): T {
  const state = useContext(context);
  if (state === null) {
    throw new Error("GetMeasurement is null!");
  }
  return selector(state);
}
