import { useSuspenseQuery } from "@tanstack/react-query";
import { Delete, TreePalm } from "lucide-react";
import React from "react";
import { getMeQueryOptions } from "@/entities/principal";
import { SchemeID } from "@/entities/scheme";
import { Button } from "@/shared/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Separator } from "@/shared/ui/separator";
import { Skeleton } from "@/shared/ui/skeleton";
import { useDeletePermissionMutation } from "../api/delete-permission";
import { getSchemePermissionsQO } from "../api/get-permissions";
import { PermissionsEntry } from "../model/permission";
import { EmbeddedModeForm } from "./embedded";
import { InviteUserForm } from "./form";

type Props = {
  schemeId: SchemeID;
};

export function ShareDialog({ schemeId }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Поделиться схемой</DialogTitle>
        <DialogDescription>
          Здесь вы можете указать, какие пользователи имеют доступ к данной схеме. Вы также можете поделиться этой
          схемой во вложенном режиме.
        </DialogDescription>
      </DialogHeader>
      <React.Suspense fallback={<Skeleton className="h-16 w-full" />}>
        <Permissions schemeId={schemeId} />
        <EmbeddedModeForm schemeId={schemeId} />
        <Separator orientation="horizontal" />
        <InviteUserForm schemeId={schemeId} />
      </React.Suspense>
    </DialogContent>
  );
}

function Permissions({ schemeId }: Props) {
  const { data: principalId } = useSuspenseQuery({ ...getMeQueryOptions(), select: (it) => it.id });
  const { data: permissions } = useSuspenseQuery({
    ...getSchemePermissionsQO(schemeId),
    select: (it) => it.filter((entry) => entry.user.id != principalId),
  });
  return (
    <div>
      <h6 className="text-sm font-medium">Права пользователей</h6>
      <div>
        {permissions.map((it) => (
          <PermissionItem schemeId={schemeId} key={it.user.id} permission={it} />
        ))}
        {permissions.length == 0 && (
          <p className="flex w-full flex-row items-center justify-center space-x-2 py-4 text-sm">
            <span>Тут пока пусто</span>
          </p>
        )}
      </div>
    </div>
  );
}

export function PermissionItem({ permission, schemeId }: { schemeId: SchemeID; permission: PermissionsEntry }) {
  const { mutate, isPending } = useDeletePermissionMutation();
  return (
    <div className="flex flex-row items-start justify-between p-4">
      <div className="space-y-2">
        <p>{permission.user.fullName}</p>
        <p className="text-muted-foreground">{permission.user.email}</p>
      </div>
      <Button
        disabled={isPending}
        size="icon"
        variant="ghost"
        onClick={() => mutate({ email: permission.user.email, schemeId })}
      >
        <Delete />
      </Button>
    </div>
  );
}
