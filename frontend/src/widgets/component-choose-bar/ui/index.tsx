import { useDraggable } from "@dnd-kit/core";
import resistorSvg from "@/shared/assets/circuit/resistor.svg";
import { ElectricalComponent } from "@/shared/simulation";
import { ResizablePanel } from "@/shared/ui/resizable.tsx";
import "./style.css";

const components = [
  {
    type: "resistor",
    src: resistorSvg,
  },
] as const;

export function ComponentChooseBar() {
  return (
    <ResizablePanel
      className="panel flex flex-row flex-wrap content-start justify-around border-r-4 bg-white"
      minSize={9}
      maxSize={50}
      defaultSize={15}
      order={1}
      data-testid="components-choose-bar"
    >
      <div className="overflow-visible">
        <Item type="resistor" defaultValues={{ resistance: 10 }} src={resistorSvg} />
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
  defaultValues: Omit<T, "a" | "b" | "plus" | "minus" | "_type">;
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
