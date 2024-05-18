import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewScheme } from "@/shared/api";
import { fromDTO } from "./transform";

export function useCreateSchemeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const data = await createNewScheme({ name });
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["scheme", "detail", data.id], fromDTO(data));
    },
  });
}
