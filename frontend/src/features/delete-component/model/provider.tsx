import { State, context } from "./context";

type Props = React.PropsWithChildren<State>;

export function DeleteComponentProvider({ onDeleteComponent, children }: Props) {
  return <context.Provider value={{ onDeleteComponent }}>{children}</context.Provider>;
}
