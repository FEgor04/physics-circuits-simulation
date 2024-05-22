import { Trash } from "lucide-react";
import { useDeleteComponent } from "@/features/delete-component";
import { UpdateSource } from "@/features/update-component";
import { Source, WithID } from "@/shared/simulation";
import { Button } from "@/shared/ui/button.tsx";

export function SourceSettings({ component }: { component: WithID<Source> }) {
  const onDeleteComponent = useDeleteComponent();
  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <p>Источник постоянного тока</p>
      <UpdateSource defaultValue={component} />
      <div className="flex flex-row items-center space-x-2">
        <Button type="submit" form="update-source">
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
