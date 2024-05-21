import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getMeQueryOptions, useSignOutMutation } from "@/entities/principal";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { PrincipalSettingsMenuFallback } from "./fallback";
import { Button } from "@/shared/ui/button";

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

export function PrincipalDropdownMenuContainer() {
  return (
    <ErrorBoundary fallback={<Button asChild><Link to="/signin">Войти</Link></Button>}>
      <React.Suspense fallback={<PrincipalSettingsMenuFallback />}>
        <PrincipalDropdownMenu />
      </React.Suspense>
    </ErrorBoundary>
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
