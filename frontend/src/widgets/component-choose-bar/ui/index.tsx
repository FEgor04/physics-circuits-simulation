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
        {components.map((object, i) => {
          return (
            <div className="m-5 flex h-20 cursor-pointer items-center justify-center" key={i}>
              <Item type={object.type} src={object.src} />
            </div>
          );
        })}
      </div>
    </ResizablePanel>
  );
}

function Item({ type, src }: { type: ElectricalComponent["_type"]; src: string }) {
  const { listeners, attributes, setNodeRef, transform } = useDraggable({
    id: type,
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
    />
  );
}
