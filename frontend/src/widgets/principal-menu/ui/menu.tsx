import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { CircuitBoard, LogOut } from "lucide-react";
import { getMeQueryOptions, useSignOutMutation } from "@/entities/principal";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
      <DropdownMenuContent align="end">
        <div className="space-y-0.5">
          <DropdownMenuLabel className="pb-0">{principal.fullName}</DropdownMenuLabel>
          <DropdownMenuLabel className="pt-0 text-sm font-normal text-muted-foreground">
            {principal.email}
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <SchemesItem />
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
      <LogOut className="mr-2 size-4" />
      Выйти
    </DropdownMenuItem>
  );
}

function SchemesItem() {
  const navigate = useNavigate();
  return (
    <DropdownMenuItem
      onSelect={() => {
        navigate({
          to: "/schemes",
        });
      }}
    >
      <CircuitBoard className="mr-2 size-4" />
      Схемы
    </DropdownMenuItem>
  );
}
