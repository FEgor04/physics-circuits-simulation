import { ElectricalComponent } from "@/shared/simulation";
import { ResistorRenderer } from "./resistor";
import { WireRenderer } from "./wire";

export function GenericRenderer({ component, onClick }: { component: ElectricalComponent; onClick: () => void }) {
  if (component._type == "wire") {
    return <WireRenderer component={component} onClick={onClick} />;
  }
  if (component._type == "resistor") {
    return <ResistorRenderer component={component} onClick={onClick} />;
  }
}
