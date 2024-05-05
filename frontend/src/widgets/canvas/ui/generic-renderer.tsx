import { ElectricalComponent } from "@/shared/simulation";
import { ResistorRenderer } from "./resistor";
import { WireRenderer } from "./wire";

export function GenericRenderer({ component }: { component: ElectricalComponent }) {
  if (component.type == "wire") {
    return <WireRenderer component={component} />;
  }
  if (component.type == "resistor") {
    return <ResistorRenderer component={component} />;
  }
}
