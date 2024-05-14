import { State, UpdateComponentContext } from "./context";

type Props = React.PropsWithChildren<State>;

export function UpdateComponentProvider({ children, ...value }: Props) {
  return <UpdateComponentContext.Provider value={value}>{children}</UpdateComponentContext.Provider>;
}
