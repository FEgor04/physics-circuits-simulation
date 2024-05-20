import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScheme } from "@/shared/api";
import { ElectricalComponentWithID } from "@/shared/simulation";
import { componentToDTO } from "./transform";

export function useUpdateSchemeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: number; components: Array<ElectricalComponentWithID>; name: string }) => {
      const data = await updateScheme(params.id, {
        schemeName: params.name,
        electricalComponentDto: params.components.map(componentToDTO),
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schemes"] });
    },
  });
}
