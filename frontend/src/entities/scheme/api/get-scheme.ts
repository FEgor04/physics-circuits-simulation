import { queryOptions } from "@tanstack/react-query";
import { getSchemeById } from "@/shared/api";
import { SchemeID } from "../model/scheme";
import { fromDTO } from "./transform";

export const getSchemeByIDQueryOptions = (id: SchemeID) =>
  queryOptions({
    queryKey: ["schemes", "detail", id],
    queryFn: async () => {
      const { data } = await getSchemeById(id);
      return fromDTO(data);
    },
  });
