import { Trash } from "lucide-react";
import { useDeleteComponent } from "@/features/delete-component";
import { Voltmeter, WithID } from "@/shared/simulation";
import { Button } from "@/shared/ui/button.tsx";

export function VoltmeterSettings({ component }: { component: WithID<Voltmeter> }) {
  const onDeleteComponent = useDeleteComponent();
  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <p>Вольтметр</p>
      <div className="flex flex-row items-center space-x-2">
        <Button
          onClick={() => {
            onDeleteComponent(component.id);
          }}
          variant="destructive"
        >
          <Trash className="mr-2 size-4" />
          Удалить!
        </Button>
      </div>
    </div>
  );
}
