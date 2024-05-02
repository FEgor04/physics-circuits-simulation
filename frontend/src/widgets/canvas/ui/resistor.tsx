import resistorSvg from "@/shared/assets/circuit/resistor.svg";
import { Resistor } from "@/shared/simulation";
import { useTransformVirtualToCanvas } from "./context";

export function ResistorRenderer({ component, onClick }: { component: Resistor; onClick: () => void }) {
  const transformer = useTransformVirtualToCanvas();
  const aTransformed = transformer(component.a);
  const bTransformed = transformer(component.b);
  const resistorHeight = 16;
  return (
    <image
      x={aTransformed.x}
      y={aTransformed.y - resistorHeight / 2}
      width={bTransformed.x - aTransformed.x}
      height={resistorHeight}
      href={resistorSvg}
      onClick={onClick}
    />
  );
}
