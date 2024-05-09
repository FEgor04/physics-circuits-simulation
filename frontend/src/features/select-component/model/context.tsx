/* eslint-disable prettier/prettier */
import { createContext, useContext } from "react";

type Selectable = undefined

export type State = {
  selected: Selectable | undefined,
  onSelect: (selected: Selectable | undefined) => void
}

export const context = createContext<State | null>(null);

export function useSelectContext<T>(selector: (state: State) => T): T {
  const state = useContext(context);
  if(state === null) {
    throw new Error("SelectComponentContext is null!")
  }
  return selector(state);
}
