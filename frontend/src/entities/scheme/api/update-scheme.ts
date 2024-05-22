import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScheme } from "@/shared/api";
import { ElectricalComponentWithID } from "@/shared/simulation";
import { componentToDTO } from "./transform";
import { getSchemeByIDQueryOptions } from "./get-scheme";

export function useUpdateSchemeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: number;
      components: Array<ElectricalComponentWithID>;
      name: string;
      isEmbedded: boolean;
    }) => {
      const data = await updateScheme(params.id, {
        schemeName: params.name,
        electricalComponentDto: params.components.map(componentToDTO),
        isEmbedded: params.isEmbedded,
      });
      return data.data;
    },
    onSuccess: (_, args) => {
      queryClient.invalidateQueries({ queryKey: ["schemes"] });
      queryClient.invalidateQueries(getSchemeByIDQueryOptions(args.id));
    },
  });
}
