// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useSimulationState } from "@/pages/simulation/model/state.ts";
import { Canvas } from "@/widgets/canvas";
import { GetMeasurementProvider } from "@/features/measurment";
import { SelectComponentProvider } from "@/features/select-component";
import { GetZoomCoefficientProvider } from "@/features/zoom-provider";
import { ElectricalComponentWithID } from "@/shared/simulation";
import "@/shared/assets/katex/katex-min.css";

import Latex from "react-latex-next";

export function EducationalArticle() {
  const voltage_divider_example: Array<ElectricalComponentWithID> = [
    {
      id: 1,
      _type: "source",
      electromotiveForce: 9,
      internalResistance: 0,
      plus: { x: -1, y: 2 },
      minus: { x: -2, y: 2 },
    },
    { id: 3, _type: "wire", a: { x: 0, y: 2 }, b: { x: 0, y: 1 } },
    { id: 4, _type: "wire", a: { x: 0, y: 1 }, b: { x: 0, y: 0 } },
    { id: 5, _type: "wire", a: { x: -1, y: 0 }, b: { x: -2, y: 2 } },
    { id: 6, _type: "wire", a: { x: -1, y: 0 }, b: { x: -1, y: -1 } },
    { id: 7, _type: "wire", a: { x: 0, y: 0 }, b: { x: 0, y: -1 } },
    { id: 8, _type: "voltmeter", a: { x: -1, y: -1 }, b: { x: 0, y: -1 }, voltage: "unknown" },
    { id: 2, _type: "resistor", a: { x: -1, y: 2 }, b: { x: 0, y: 2 }, resistance: 400 },
    { id: 9, _type: "resistor", a: { x: -1, y: 0 }, b: { x: 0, y: 0 }, resistance: 500 },
  ];

  const voltage_divider_example1_simulation = useSimulationState(voltage_divider_example);
  const getMeasurementForComponent = (id: number) => {
    const measurements = voltage_divider_example1_simulation.simulator.getMeasurementsForComponent(id);
    if (measurements.currency != 0) {
      return measurements.currency;
    }
    return measurements.voltage;
  };

  return (
    <div className="m-auto w-4/6">
      <h1 className="mb-4 mt-4 text-3xl font-bold">Делитель напряжения: схема и расчёт</h1>
      <p>
        Для того, чтобы получить из исходного напряжения лишь его часть используется делитель напряжения (voltage
        divider). Это схема, строящаяся на основе пары резисторов.
      </p>

      <div className="h-80 w-80">
        <GetZoomCoefficientProvider zoomCoefficient={48}>
          <SelectComponentProvider selected={undefined} onSelect={() => {}}>
            <GetMeasurementProvider getCurrentMeasurement={getMeasurementForComponent}>
              <Canvas
                components={voltage_divider_example}
                onUpdateComponentCoords={() => {}}
                onAddComponent={() => {}}
                onUpdateComponent={() => {}}
              />
            </GetMeasurementProvider>
          </SelectComponentProvider>
        </GetZoomCoefficientProvider>
      </div>
      <p>
        В примере, на вход подаются стандартные 9 В. Но какое напряжение получится на выходе
        <Latex>$\frac{1}{2}$</Latex>? Или эквивалентный вопрос: какое напряжение покажет вольтметр?
      </p>
    </div>
  );
}
