import { Canvas } from "@/widgets/canvas";
import { SelectComponentProvider } from "@/features/select-component";
import { ElectricalComponentWithID } from "@/shared/simulation";

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
    <SelectComponentProvider selected={undefined} onSelect={() => {}}>
      <Canvas
        components={components}
        onUpdateComponentCoords={() => {}}
        onAddComponent={() => {}}
        onUpdateComponent={() => {}}
      />
    </SelectComponentProvider>
  );
}
