import { ElectricalComponent } from "@/shared/simulation";
import { CanvasParams } from "../lib";
import { WireRenderer } from "./wire";

export function GenericRenderer({
  component,
  params,
}: {
  component: ElectricalComponent;
  params: CanvasParams;
}) {
  if (component._type == "wire") {
    return <WireRenderer component={component} params={params} />;
  }
}
