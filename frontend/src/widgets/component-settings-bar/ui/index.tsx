import { ElectricalComponent } from "@/shared/simulation";
import { GenericSettings } from "./generic-settings.tsx";

export function ComponentSettingsBar({ selectedComponent }: { selectedComponent: ElectricalComponent | null }) {
  return (
    <div className="border-l-4 bg-white">
      <GenericSettings component={selectedComponent} />
    </div>
  );
}
