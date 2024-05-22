import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchemeID } from "@/entities/scheme";
import { setPermissionsByIdScheme } from "@/shared/api";
import { PermissionType } from "../model/permission";

type Args = {
  schemeId: SchemeID;
  permissions: Array<{
    email: string;
    permission: PermissionType;
  }>;
};

export function useUpdateSchemePermissionsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ schemeId, permissions }: Args) => {
      return setPermissionsByIdScheme(
        schemeId,
        permissions.map((entry) => ({
          username: entry.email,
          permission: entry.permission,
        })),
      ).then((it) => it.data);
    },
    onSuccess: (_, args) => {
      return queryClient.invalidateQueries({
        queryKey: ["schemes", "permissions", args.schemeId],
      });
    },
  });
}
