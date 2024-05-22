import { GetUserResponse } from "@/shared/api/index.schemas";
import { User } from "..";

export function fromDTO(userDto: GetUserResponse): User {
  return {
    id: userDto.id,
    fullName: userDto.name,
    email: userDto.email,
  };
}
