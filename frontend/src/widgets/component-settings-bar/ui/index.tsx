import { ElectricalComponent } from "@/shared/simulation";
import { ResizablePanel } from "@/shared/ui/resizable.tsx";
import { GenericSettings } from "./generic-settings.tsx";

export function ComponentSettingsBar({ selectedComponent }: { selectedComponent: ElectricalComponent | undefined }) {
  return (
    <ResizablePanel className="border-l-4 bg-white" minSize={10} maxSize={50} defaultSize={20} order={3}>
      <GenericSettings component={selectedComponent} />
    </ResizablePanel>
  );
}
