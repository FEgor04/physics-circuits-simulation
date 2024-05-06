import { ElectricalComponent } from "@/shared/simulation";
import { WithID } from "@/shared/simulation/types.ts";
import { ResistorRenderer } from "./resistor";
import { WireRenderer } from "./wire";

export function GenericRenderer({ component }: { component: ElectricalComponent }) {
  const componentWithId: WithID<ElectricalComponent> = { ...component, id: -1 };
  if (componentWithId._type == "wire") {
    return <WireRenderer component={componentWithId} />;
  }
  if (componentWithId._type == "resistor") {
    return <ResistorRenderer component={componentWithId} />;
  }
}
