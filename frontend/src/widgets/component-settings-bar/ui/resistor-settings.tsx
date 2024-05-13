import { Trash } from "lucide-react";
import { useDeleteComponent } from "@/features/delete-component";
import { UpdateResistor } from "@/features/update-component";
import { Resistor, WithID } from "@/shared/simulation";
import { Button } from "@/shared/ui/button.tsx";

export function ResistorSettings({ component }: { component: WithID<Resistor> }) {
  const onDeleteComponent = useDeleteComponent();
  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <p>Резистор</p>
      <UpdateResistor defaultValue={component} />
      <div className="space-x-2">
        <Button type="submit" form="update-resistor">
          Сохранить
        </Button>
        <Button
          onClick={() => {
            onDeleteComponent(component.id);
          }}
          variant="outline"
        >
          <Trash className="w-4 h-4 mr-2" />
          Удалить!
        </Button>
      </div>
    </div>
  );
}
