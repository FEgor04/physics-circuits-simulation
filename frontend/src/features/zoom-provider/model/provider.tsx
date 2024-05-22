import "react";
import { State, context as GetZoomCoefficientProvider } from "./content.tsx";

type Props = React.PropsWithChildren<State>;

export const GetMeasurementProvider: React.FC<Props> = ({ children, zoomCoefficient }) => {
  return (
    <GetZoomCoefficientProvider.Provider value={{ zoomCoefficient }}>{children}</GetZoomCoefficientProvider.Provider>
  );
};
