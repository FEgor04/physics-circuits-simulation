import { useDraggable } from "@dnd-kit/core";
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

export function ComponentChooseBar() {
  return (
    <ResizablePanel
      className="panel border-r-4 bg-white p-4"
      minSize={9}
      maxSize={50}
      defaultSize={15}
      order={1}
      data-testid="components-choose-bar"
    >
      <div className="flex flex-row flex-wrap content-start justify-around">
        <Item<Resistor> type="resistor" defaultValues={{ resistance: 10 }} src={resistorSvg} />
        <Item<SourceDC> type="sourceDC" defaultValues={{ electromotiveForce: 20 }} src={sourceDCSvg} />
        <Item<Source> type="source" defaultValues={{ electromotiveForce: 20, internalResistance: 5 }} src={sourceSvg} />
        <Item<Ampermeter> type="ampermeter" defaultValues={{ currency: 0 }} src={ampermeterSvg} />
        <Item<Voltmeter> type="voltmeter" defaultValues={{ voltage: 0 }} src={voltmeterSvg} />
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
  return (
    <img
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      src={src}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
      }}
      data-testid={`add-${type}`}
    />
  );
}
