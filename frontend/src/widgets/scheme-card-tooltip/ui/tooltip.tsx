import { Dialog } from "@radix-ui/react-dialog";
import { MoreHorizontal, PencilLine, Share2, Trash } from "lucide-react";
import { useState } from "react";
import { RenameSchemeDialogContent } from "@/features/rename-scheme";
import { ShareSchemeDialog } from "@/features/share-scheme";
import { Scheme } from "@/entities/scheme";
import { useDeleteSchemeMutation } from "@/entities/scheme";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

type Props = {
  scheme: Scheme;
};

export function SchemeCardTooltip(props: Props) {
  const [isRenameOpen, setRenameOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setShareOpen(true)}>
            <Share2 className="mr-2 size-4" /> Поделиться
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setRenameOpen(true)}>
            <PencilLine className="mr-2 size-4" />
            Переименовать
          </DropdownMenuItem>
          <DeleteSchemeItem {...props} />
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isRenameOpen} onOpenChange={setRenameOpen}>
        <RenameSchemeDialogContent {...props} />
      </Dialog>
      <Dialog open={isShareOpen} onOpenChange={setShareOpen}>
        <ShareSchemeDialog schemeId={props.scheme.id} />
      </Dialog>
    </>
  );
}

function DeleteSchemeItem({ scheme }: Props) {
  const { mutate, isPending } = useDeleteSchemeMutation();
  function onClick() {
    mutate({ id: scheme.id });
  }
  return (
    <DropdownMenuItem onClick={() => onClick()} disabled={isPending}>
      <Trash className="mr-2 size-4" /> Удалить
    </DropdownMenuItem>
  );
}
