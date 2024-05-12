import { useDraggable } from "@dnd-kit/core";
import resistorSvg from "@/shared/assets/circuit/resistor.svg";
import sourceDCSvg from "@/shared/assets/circuit/DC_source.svg";
import { ElectricalComponent } from "@/shared/simulation";
import { ResizablePanel } from "@/shared/ui/resizable.tsx";
import "./style.css";
import { OmitBetter } from "@/shared/lib/types";
import { Resistor, SourceDC } from "@/shared/simulation/types";

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
