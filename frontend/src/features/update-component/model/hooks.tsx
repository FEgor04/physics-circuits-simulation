import { useUpdateComponentContext } from "./context";

export const useOnUpdateComponent = () => useUpdateComponentContext((it) => it.onUpdateComponent);
