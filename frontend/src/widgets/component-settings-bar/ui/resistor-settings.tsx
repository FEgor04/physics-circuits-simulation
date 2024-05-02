import { useState } from "react";
import { Resistor } from "@/shared/simulation";
import { Button } from "@/shared/ui/button.tsx";

export function ResistorSettings({ component }: { component: Resistor }) {
  const [resistance, setResistance] = useState(component.resistance);
  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <p>Резистор</p>
      <label htmlFor="resistanceSlider" className="block w-full">
        Сопротивление: <span className="float-right">{resistance} Ом</span>
      </label>
      <input
        type="range"
        min="1"
        max="500"
        value={resistance}
        onChange={(event) => {
          setResistance(Number(event.target.value));
          component.resistance = Number(event.target.value);
          console.log(component.resistance);
        }}
        id="resistanceSlider"
      />
      <Button>Удалить!</Button>
    </div>
  );
}
