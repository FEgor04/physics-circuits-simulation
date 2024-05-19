import { queryOptions } from "@tanstack/react-query";
import { getAllSchemes } from "@/shared/api";
import { fromDTO } from "./transform";

export const getSchemesQueryOptions = () =>
  queryOptions({
    queryKey: ["schemes", "list"],
    queryFn: async () => {
      const response = await getAllSchemes();
      const { data } = response;
      return data.map(fromDTO);
    },
  });
