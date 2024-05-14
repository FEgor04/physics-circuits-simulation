import { ElectricalComponentWithID } from "@/shared/simulation";
import { AmpermeterSettings } from "./ampermeter-settings.tsx";
import { ResistorSettings } from "./resistor-settings.tsx";
import { SourceDCSettings } from "./source-dc-settings.tsx";
import { SourceSettings } from "./source-settings.tsx";
import { VoltmeterSettings } from "./voltmeter-settings.tsx";
import { WireSettings } from "./wire-settings.tsx";

export function GenericSettings({ component }: { component: ElectricalComponentWithID | undefined }) {
  if (component == null) return <div className="w-full p-4">Выберите компонент для изменения</div>;
  if (component._type == "resistor") return <ResistorSettings component={component} />;
  if (component._type == "sourceDC") return <SourceDCSettings component={component} />;
  if (component._type == "source") return <SourceSettings component={component} />;
  if (component._type == "ampermeter") return <AmpermeterSettings component={component} />;
  if (component._type == "voltmeter") return <VoltmeterSettings component={component} />;
  if (component._type == "wire") return <WireSettings component={component} />;
  // return <>Тип компонента {component._type} не поддерживается</>;
}
