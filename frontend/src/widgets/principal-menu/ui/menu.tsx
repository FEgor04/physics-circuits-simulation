import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { getMeQueryOptions, useSignOutMutation } from "@/entities/principal";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { PrincipalSettingsMenuFallback } from "./fallback";

export function PrincipalDropdownMenu() {
  const { data: principal, isError } = useQuery(getMeQueryOptions());
  if (isError) {
    return (
      <Button asChild>
        <Link to="/signin">Войти</Link>
      </Button>
    );
  }
  if (!principal) {
    return <PrincipalSettingsMenuFallback />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{principal.fullName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{principal.fullName}</DropdownMenuLabel>
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
