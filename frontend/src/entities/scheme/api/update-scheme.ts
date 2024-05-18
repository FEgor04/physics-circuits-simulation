import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScheme } from "@/shared/api";
import { ElectricalComponentWithID } from "@/shared/simulation";
import { getSchemeByIDQueryOptions } from "./get-scheme";
import { componentToDTO } from "./transform";

export function useUpdateSchemeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: number; components: Array<ElectricalComponentWithID> }) => {
      const data = await updateScheme(params.id, params.components.map(componentToDTO));
      return data.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(getSchemeByIDQueryOptions(id));
    },
  });
}
