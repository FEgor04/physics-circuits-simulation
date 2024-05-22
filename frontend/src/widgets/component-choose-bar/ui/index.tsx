import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ampermeterSvg from "@/shared/assets/circuit/ampermater.svg";
import sourceSvg from "@/shared/assets/circuit/battery.svg";
import sourceDCSvg from "@/shared/assets/circuit/DC_source.svg";
import resistorSvg from "@/shared/assets/circuit/resistor.svg";
import voltmeterSvg from "@/shared/assets/circuit/voltmeter.svg";
import { OmitBetter } from "@/shared/lib/types";
import { Ampermeter, ElectricalComponent, Source, Voltmeter } from "@/shared/simulation";
import { Resistor, SourceDC } from "@/shared/simulation/types";
import { ResizablePanel } from "@/shared/ui/resizable.tsx";
import "./style.css";
import { getZoomCoefficient } from "@/shared/embed/utility.ts";

export function ComponentChooseBar() {
  return (
    <ResizablePanel
      className="panel"
      minSize={9}
      maxSize={50}
      defaultSize={15}
      order={1}
      data-testid="components-choose-bar"
    >
      <div className="flex flex-row flex-wrap content-start items-center justify-around">
        <Item<Resistor> type="resistor" defaultValues={{ resistance: 10 }} src={resistorSvg} />
        <Item<SourceDC>
          type="sourceDC"
          defaultValues={{ electromotiveForce: 20, internalResistance: 5 }}
          src={sourceDCSvg}
        />
        <Item<Source> type="source" defaultValues={{ electromotiveForce: 20, internalResistance: 5 }} src={sourceSvg} />
        <Item<Ampermeter> type="ampermeter" defaultValues={{ currency: "unknown" }} src={ampermeterSvg} />
        <Item<Voltmeter> type="voltmeter" defaultValues={{ voltage: "unknown" }} src={voltmeterSvg} />
      </div>
    </ResizablePanel>
  );
}

function Item<T extends ElectricalComponent>({
  type,
  src,
  defaultValues,
}: {
  type: T["_type"];
  src: string;
  defaultValues: NoInfer<OmitBetter<T, "a" | "b" | "plus" | "minus" | "_type">>;
}) {
  const { listeners, attributes, setNodeRef, transform } = useDraggable({
    id: type,
    data: {
      ...defaultValues,
      _type: type,
    },
  });
  const svgSize = getZoomCoefficient();
  const height = type == "resistor" ? svgSize / 2 : svgSize;
  return (
    <img
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      src={src}
      style={{
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        width: `${svgSize}px`,
        height: `${height}px`,
      }}
      data-testid={`add-${type}`}
    />
  );
}
