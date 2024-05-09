import "react";
import { context as SelectComponentContext, State } from "./context";

type Props = React.PropsWithChildren<State>;

export const SelectComponentProvider: React.FC<Props> = ({ children, selected, onSelect }) => {
  return (
    <SelectComponentContext.Provider
      value={{
        selected,
        onSelect,
      }}
    >
      {children}
    </SelectComponentContext.Provider>
  );
};
