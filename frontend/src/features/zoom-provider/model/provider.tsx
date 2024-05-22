import "react";
import { State, context as GetZoomCoefficientContext } from "./content.tsx";

type Props = React.PropsWithChildren<State>;

export const GetZoomCoefficientProvider: React.FC<Props> = ({ children, zoomCoefficient }) => {
  return (
    <GetZoomCoefficientContext.Provider value={{ zoomCoefficient }}>{children}</GetZoomCoefficientContext.Provider>
  );
};
