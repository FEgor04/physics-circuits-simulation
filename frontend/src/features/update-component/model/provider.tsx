import { State, UpdateComponentContext } from "./context";

type Props = React.PropsWithChildren<State>;

export function EditComponentProvider({ children, ...value }: Props) {
  return <UpdateComponentContext.Provider value={value}>{children}</UpdateComponentContext.Provider>;
}
