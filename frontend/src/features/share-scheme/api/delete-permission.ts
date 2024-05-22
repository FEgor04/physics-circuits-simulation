import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchemeID } from "@/entities/scheme";
import { deletePermissionsByIdScheme } from "@/shared/api";
import { getSchemePermissionsQO } from "./get-permissions";

type Args = {
  schemeId: SchemeID;
  email: string;
};

export function useDeletePermissionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ schemeId, email }: Args) => {
      return deletePermissionsByIdScheme(schemeId, [
        { permission: "EDIT", username: email },
        { permission: "VIEW", username: email },
      ]).then((it) => it.data);
    },
    onSuccess: (_, args) => {
      queryClient.invalidateQueries(getSchemePermissionsQO(args.schemeId));
    },
  });
}
