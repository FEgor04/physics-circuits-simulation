import { queryOptions } from "@tanstack/react-query";
import { SchemeID } from "@/entities/scheme";
import { getAllUsersPermissionsBySchemeId } from "@/shared/api";
import { fromDTO } from "./transform";

export const getSchemePermissionsQO = (schemeId: SchemeID) =>
  queryOptions({
    queryKey: ["schemes", "permissions", schemeId],
    queryFn: () => {
      return getAllUsersPermissionsBySchemeId(schemeId)
        .then((it) => it.data)
        .then((it) => (it.permissions ?? []).map(fromDTO));
    },
  });
