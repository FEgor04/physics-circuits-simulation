import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { getMeQueryOptions, useSignOutMutation } from "@/entities/principal";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

export function PrincipalDropdownMenu() {
  const { data: principal } = useSuspenseQuery(getMeQueryOptions());
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{principal.fullName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <LogOutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogOutItem() {
  const { mutate, isPending } = useSignOutMutation();
  const navigate = useNavigate();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onSelect={() => {
        mutate(void {}, {
          onSuccess: () => {
            navigate({
              to: "/",
            });
          },
        });
      }}
    >
      <LogOut />
      Выйти
    </DropdownMenuItem>
  );
}
