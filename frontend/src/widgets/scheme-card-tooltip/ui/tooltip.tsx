import { MoreHorizontal, PencilLine, Share2, Trash } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

export function SchemeCardTooltip() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
        <DropdownMenuItem>
          <Trash className="mr-2 size-4" /> Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
