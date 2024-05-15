import { useAddComponentContext } from "./context";

export const useOnAddComponent = () => useAddComponentContext((state) => state.onAddComponent);
