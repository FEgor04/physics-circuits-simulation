import { ElectricalComponent } from "@/shared/simulation";
import { ResistorSettings } from "./resistor-settings.tsx";

export function GenericSettings({ component }: { component: ElectricalComponent | null }) {
  if (component == null) return <div className="w-full p-4">Выберите компонент для изменения</div>;
  if (component._type == "resistor") return <ResistorSettings component={component} />;
  return <>No such component!</>;
}