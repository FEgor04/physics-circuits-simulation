import { MoreHorizontal } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function SchemeCardTooltip() {
  return (
    <Button variant="secondary" size="icon">
      <MoreHorizontal className="size-4" />
    </Button>
  );
}
