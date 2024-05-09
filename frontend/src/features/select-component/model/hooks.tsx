import { useSelectContext } from "./context";

export const useSelectedComponent = () => useSelectContext((state) => state.selected);
export const useOnSelectComponent = () => useSelectContext((state) => state.onSelect);
