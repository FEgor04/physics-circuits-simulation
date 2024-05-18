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
        <DropdownMenuItem><PencilLine className="size-4 mr-2" />Переименовать </DropdownMenuItem>
        <DropdownMenuItem><Share2 className="size-4 mr-2" /> Поделиться</DropdownMenuItem>
        <DropdownMenuItem><Trash className="size-4 mr-2" /> Удалить</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
