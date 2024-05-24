import { createFileRoute } from "@tanstack/react-router";
import { getSchemesQueryOptions } from "@/entities/scheme";

export const Route = createFileRoute("/_authenticated/schemes/")({
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(getSchemesQueryOptions());
  },
});
