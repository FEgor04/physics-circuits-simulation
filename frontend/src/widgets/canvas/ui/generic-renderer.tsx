import { ElectricalComponentWithID } from "@/shared/simulation/types.ts";
import { ResistorRenderer } from "./resistor";
import { WireRenderer } from "./wire";

export function GenericRenderer({ component }: { component: ElectricalComponentWithID }) {
  if (component._type == "wire") {
    return <WireRenderer component={component} />;
  }
  if (component._type == "resistor") {
    return <ResistorRenderer component={component} />;
  }
}
