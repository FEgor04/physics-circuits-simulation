import { useState } from "react";
import { Resistor } from "@/shared/simulation";
import { Button } from "@/shared/ui/button.tsx";
import { Slider } from "@/shared/ui/slider";

export function ResistorSettings({ component }: { component: Resistor }) {
  const [resistance, setResistance] = useState(component.resistance);
  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <p>Резистор</p>
      <label htmlFor="resistanceSlider" className="block w-full">
        Сопротивление: <span className="float-right">{resistance} Ом</span>
      </label>
      <Slider
        defaultValue={[resistance]}
        onValueChange={(value: number[]) => {
          setResistance(value[0]);
          component.resistance = value[0];
        }}
        min={1}
        max={500}
        id="resistanceSlider"
      />
      <Button>Удалить!</Button>
    </div>
  );
}
