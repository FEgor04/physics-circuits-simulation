import { useDeleteComponentContext } from "./context";

export const useDeleteComponent = () => useDeleteComponentContext((state) => state.onDeleteComponent);
