import { useSuspenseQuery } from "@tanstack/react-query";
import { Canvas } from "@/widgets/canvas";
import { GetMeasurementProvider } from "@/features/measurment";
import { SelectComponentProvider } from "@/features/select-component";
import { GetZoomCoefficientProvider } from "@/features/zoom-provider";
import { getSchemeByIDQueryOptions, Scheme } from "@/entities/scheme";

export function SimulationEmbedded({ scheme: initialScheme }: { scheme: Scheme }) {
  const { data: scheme } = useSuspenseQuery({
    ...getSchemeByIDQueryOptions(initialScheme.id),
    initialData: initialScheme,
  });

  return (
    <GetZoomCoefficientProvider zoomCoefficient={24}>
      <SelectComponentProvider selected={undefined} onSelect={() => {}}>
        <GetMeasurementProvider getCurrentMeasurement={() => undefined}>
          <Canvas
            components={scheme.components}
            onUpdateComponentCoords={() => {}}
            onAddComponent={() => {}}
            onUpdateComponent={() => {}}
          />
        </GetMeasurementProvider>
      </SelectComponentProvider>
    </GetZoomCoefficientProvider>
  );
}
