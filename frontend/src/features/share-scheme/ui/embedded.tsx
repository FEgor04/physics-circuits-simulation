import { useSuspenseQuery } from "@tanstack/react-query";
import { Clipboard, ClipboardCheck, ClipboardCopy } from "lucide-react";
import { toast } from "sonner";
import { SchemeID, getSchemeByIDQueryOptions, useUpdateSchemeMutation } from "@/entities/scheme";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { useState } from "react";

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
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <Label>Вложенный режим</Label>
        <Switch checked={data.isEmbedded} onCheckedChange={toggleEmbedded} disabled={isPending} />
      </div>
      {data.isEmbedded && (
        <div className="flex flex-row items-center justify-between border bg-muted pl-2 text-muted-foreground">
          <a href={link} className="text-sm underline">
            {link}
          </a>
          <Button
            size="icon"
            variant="ghost"
            className="p-0"
            onClick={() => {
              navigator.clipboard.writeText(link).then(() => {
                setIsCopied(true);
                toast.info("Ссылка скопирована в буфер обмена");
              });
            }}
          >
            {isCopied ? <ClipboardCheck /> : <ClipboardCopy />}
          </Button>
        </div>
      )}
    </div>
  );
}
