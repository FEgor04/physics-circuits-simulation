import "react";
import { context as AddComponentContext, State } from "./context";

type Props = React.PropsWithChildren<State>;

export const AddComponentContextProvider: React.FC<Props> = ({ children, ...props }) => {
  return <AddComponentContext.Provider value={props}>{children}</AddComponentContext.Provider>;
};
