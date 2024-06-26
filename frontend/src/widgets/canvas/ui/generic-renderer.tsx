import ampermeterSvg from "@/shared/assets/circuit/ampermater.svg";
import sourceDCSvg from "@/shared/assets/circuit/battery.svg";
import sourceSvg from "@/shared/assets/circuit/DC_source.svg";
import resistorSvg from "@/shared/assets/circuit/resistor.svg";
import rheostatSvg from "@/shared/assets/circuit/rheostat.svg";
import voltmeterSvg from "@/shared/assets/circuit/voltmeter.svg";
import { ElectricalComponentWithID } from "@/shared/simulation/types.ts";
import { SVGRenderer } from "./svg-renderer";
import { WireRenderer } from "./wire";

const svgImages = {
  ampermeter: ampermeterSvg,
  resistor: resistorSvg,
  rheostat: rheostatSvg,
  voltmeter: voltmeterSvg,
  source: sourceSvg,
  sourceDC: sourceDCSvg,
} as const;

export function GenericRenderer({ component }: { component: ElectricalComponentWithID }) {
  if (component._type == "wire") {
    return <WireRenderer component={component} />;
  }
  return <SVGRenderer component={component} src={svgImages[component._type]} />;
}
