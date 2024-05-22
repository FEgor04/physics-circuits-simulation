import { permission } from "process";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { SchemeID } from "@/entities/scheme";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";
import { getSchemePermissionsQO } from "../api/get-permissions";
import { PermissionsEntry } from "../model/permission";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  schemeId: SchemeID;
};

export function ShareDialog({ schemeId, ...props }: Props) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Поделиться схемой</DialogTitle>
        </DialogHeader>
        <React.Suspense fallback={<Skeleton className="h-16 w-full" />}>
          <Permissions schemeId={schemeId} {...props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
}

function Permissions({ schemeId }: Props) {
  const { data: permissions } = useSuspenseQuery(getSchemePermissionsQO(schemeId));
  return (
    <>
      {permissions.map((it) => (
        <PermissionItem key={it.user.id} permission={it} />
      ))}
    </>
  );
}

export function PermissionItem({ permission }: { permission: PermissionsEntry }) {
  return (
    <div className="flex flex-row justify-between p-4">
      <div className="space-y-2">
        <p>{permission.user.fullName}</p>
        <p className="text-muted-foreground">{permission.user.email}</p>
      </div>
    </div>
  );
}
