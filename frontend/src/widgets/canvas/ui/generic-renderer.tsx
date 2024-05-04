import { ElectricalComponent } from "@/shared/simulation";
import { ResistorRenderer } from "./resistor";
import { WireRenderer } from "./wire";

export function GenericRenderer({ component }: { component: ElectricalComponent }) {
  if (component._type == "wire") {
    return <WireRenderer component={component} />;
  }
  if (component._type == "resistor") {
    return <ResistorRenderer component={component} />;
  }
}
