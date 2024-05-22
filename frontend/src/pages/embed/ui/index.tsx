import { Canvas } from "@/widgets/canvas";
import { GetMeasurementProvider } from "@/features/measurment";
import { SelectComponentProvider } from "@/features/select-component";
export function SimulationEmbedded() {
  const components: Array<ElectricalComponentWithID> = [
    {
      id: 1,
      _type: "resistor",
      a: { x: 0, y: 0 },
      b: { x: 1, y: 0 },
      resistance: 500,
    },
  ];

  return (
    <GetZoomCoefficientProvider zoomCoefficient={24}>
      <SelectComponentProvider selected={undefined} onSelect={() => {}}>
        <GetMeasurementProvider getCurrentMeasurement={() => 0}>
          <Canvas
            components={components}
            onUpdateComponentCoords={() => {}}
            onAddComponent={() => {}}
            onUpdateComponent={() => {}}
          />
        </GetMeasurementProvider>
      </SelectComponentProvider>
    </GetZoomCoefficientProvider>
  );
}
import { GetZoomCoefficientProvider } from "@/features/zoom-provider";
import { ElectricalComponentWithID } from "@/shared/simulation";
