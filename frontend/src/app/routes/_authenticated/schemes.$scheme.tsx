import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getSchemeByIDQueryOptions } from "@/entities/scheme";

export const Route = createFileRoute("/_authenticated/schemes/$scheme")({
  loader: async ({ context, params }) => {
    const id = parseInt(params.scheme);
    const scheme = await context.queryClient.ensureQueryData(getSchemeByIDQueryOptions(id));
    return scheme;
  },
  validateSearch: z.object({
    mode: z.enum(["editing", "simulation"]).catch("editing"),
  }),
});
