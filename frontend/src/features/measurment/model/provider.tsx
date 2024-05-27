import "react";
import { State, context as GetCurrentMeasurementContext } from "./content.tsx";

type Props = React.PropsWithChildren<State>;

export const GetMeasurementProvider: React.FC<Props> = ({ children, getCurrentMeasurement }) => {
  return (
    <GetCurrentMeasurementContext.Provider value={{ getCurrentMeasurement }}>
      {children}
    </GetCurrentMeasurementContext.Provider>
  );
};
