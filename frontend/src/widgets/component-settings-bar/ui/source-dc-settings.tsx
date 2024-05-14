import { Trash } from "lucide-react";
import { useDeleteComponent } from "@/features/delete-component";
import { UpdateSourceDC } from "@/features/update-component";
import { SourceDC, WithID } from "@/shared/simulation";
import { Button } from "@/shared/ui/button.tsx";

export function SourceDCSettings({ component }: { component: WithID<SourceDC> }) {
  const onDeleteComponent = useDeleteComponent();
  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <p>Источник постоянного напряжения</p>
      <UpdateSourceDC defaultValue={component} />
      <div className="flex flex-row items-center space-x-2">
        <Button type="submit" form="update-source-dc">
          Сохранить
        </Button>
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
