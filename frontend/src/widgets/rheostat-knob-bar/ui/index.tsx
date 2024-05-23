import { useOnUpdateComponent } from "@/features/update-component";
import { Rheostat, WithID } from "@/shared/simulation";
import { Label } from "@/shared/ui/label.tsx";
import { Slider } from "@/shared/ui/slider.tsx";

export function RheostatKnob({ component }: { component: WithID<Rheostat> }) {
  const onUpdate = useOnUpdateComponent();
  return (
    <div className="space-y-4 p-4">
      <h6>Реостат</h6>
      <div className="space-y-2">
        <Label>Сопротивление: {component.resistance} Ом</Label>
        <Slider
          defaultValue={[component.resistance]}
          max={100}
          step={1}
          onValueChange={(value) => {
            component.resistance = value[0];
            onUpdate(component);
          }}
        />
      </div>
    </div>
  );
}
