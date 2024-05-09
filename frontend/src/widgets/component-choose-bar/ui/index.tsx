import AC_sourceSvg from "@/shared/assets/circuit/AC_source.svg";
import batterySvg from "@/shared/assets/circuit/battery.svg";
import capacitorSvg from "@/shared/assets/circuit/capacitor.svg";
import DC_sourceSvg from "@/shared/assets/circuit/DC_source.svg";
import diodeSvg from "@/shared/assets/circuit/diode.svg";
import inductorSvg from "@/shared/assets/circuit/inductor.svg";
import keySvg from "@/shared/assets/circuit/key.svg";
import ledSvg from "@/shared/assets/circuit/led.svg";
import resistorSvg from "@/shared/assets/circuit/resistor.svg";
import voltmeterSvg from "@/shared/assets/circuit/voltmeter.svg";
import { ResizablePanel } from "@/shared/ui/resizable.tsx";

export function ComponentChooseBar() {
  const components = [
    voltmeterSvg,
    AC_sourceSvg,
    DC_sourceSvg,
    keySvg,
    diodeSvg,
    inductorSvg,
    batterySvg,
    resistorSvg,
    ledSvg,
    capacitorSvg,
  ];
  return (
    <ResizablePanel
      className="flex flex-row flex-wrap content-start justify-around border-r-4 bg-white"
      minSize={9}
      maxSize={50}
      defaultSize={15}
      order={1}
      data-testid="components-choose-bar"
    >
      {components.map((object, i) => {
        return (
          <div className="m-5 flex h-20 cursor-pointer items-center justify-center" key={i}>
            <img src={object} alt={""} className="w-14" />
          </div>
        );
      })}
    </ResizablePanel>
  );
}
