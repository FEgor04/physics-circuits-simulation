import { useGetMeasurementContext } from "./content.tsx";

export const useGetMeasurement = () => useGetMeasurementContext((state) => state.getCurrentMeasurement);
