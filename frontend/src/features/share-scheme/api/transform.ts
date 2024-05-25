import { UserPermissionResponse } from "@/shared/api/index.schemas";
import { PermissionsEntry } from "../model/permission";

export function fromDTO(dto: UserPermissionResponse): PermissionsEntry {
  return {
    type: dto.permission,
    user: {
      id: dto.id,
      email: dto.email,
      fullName: dto.name,
    },
  };
}
