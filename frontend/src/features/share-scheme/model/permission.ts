import { User } from "@/entities/user";

export type PermissionType = "VIEW" | "EDIT";

export type PermissionsEntry = {
  user: User;
  type: PermissionType;
};
