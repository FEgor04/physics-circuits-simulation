import { MoreHorizontal, PencilLine, Share2, Trash } from "lucide-react";
import { Scheme } from "@/entities/scheme";
import { useDeleteSchemeMutation } from "@/entities/scheme";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

type Props = {
  scheme: Scheme;
};

export function SchemeCardTooltip(props: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <PencilLine className="mr-2 size-4" />
          Переименовать{" "}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 className="mr-2 size-4" /> Поделиться
        </DropdownMenuItem>
        <DeleteSchemeItem {...props} />
      </DropdownMenuContent>
    </DropdownMenu>
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
