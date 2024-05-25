import { useGetZoomCoefficientContext } from "./content.tsx";

export const useGetZoomCoefficient = () => useGetZoomCoefficientContext((state) => state.zoomCoefficient);
