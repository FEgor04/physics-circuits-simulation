import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchemeById } from "@/shared/api";
import { SchemeID } from "../model/scheme";

export function useDeleteSchemeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: SchemeID }) => {
      return deleteSchemeById(id).then((it) => it.data);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["schemes"] });
    },
  });
}
