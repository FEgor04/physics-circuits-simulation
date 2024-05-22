import { useSuspenseQuery } from "@tanstack/react-query";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import { SchemeID, getSchemeByIDQueryOptions, useUpdateSchemeMutation } from "@/entities/scheme";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

export function EmbeddedModeForm({ schemeId }: { schemeId: SchemeID }) {
  const { data } = useSuspenseQuery(getSchemeByIDQueryOptions(schemeId));
  const { mutate, isPending } = useUpdateSchemeMutation();

  function toggleEmbedded(value: boolean) {
    mutate({
      ...data,
      isEmbedded: value,
    });
  }

  const link = `https://physics.efedorov.spb.su/embed/${data.id}`;

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-row items-center justify-between">
        <Label>Вложенный режим</Label>
        <Switch checked={data.isEmbedded} onCheckedChange={toggleEmbedded} disabled={isPending} />
      </div>
      {data.isEmbedded && (
        <div className="flex flex-row items-center justify-between">
          <p className="font-xs text-muted-foreground">{link}</p>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              navigator.clipboard.writeText(link).then(() => {
                toast.info("Ссылка скопирована в буфер обмена");
              });
            }}
          >
            <Clipboard />
          </Button>
        </div>
      )}
    </div>
  );
}
