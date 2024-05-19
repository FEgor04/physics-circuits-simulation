import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchemeID } from "../model/scheme";

export function useDeleteSchemeMutation(_id: SchemeID) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      console.log("TODO: implement delete scheme");
      return new Promise((res) => setTimeout(res, 500));
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["schemes"] });
    },
  });
}
