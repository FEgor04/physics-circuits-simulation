import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, GetCurrentUserResult } from "@/shared/api";
import { Principal } from "../model";

async function getPrincipalQueryFn(): Promise<Principal> {
  const response: GetCurrentUserResult = await getCurrentUser();
  return {
    id: response.data.id,
    fullName: response.data.name,
    email: response.data.email,
  };
}

export const getMeQueryOptions = () =>
  queryOptions({
    queryFn: getPrincipalQueryFn,
    queryKey: ["principal"],
  });

export function useSignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("session");
      return queryClient.invalidateQueries(getMeQueryOptions());
    },
  });
}
