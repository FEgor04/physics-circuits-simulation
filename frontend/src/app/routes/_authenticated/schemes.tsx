import { createFileRoute } from "@tanstack/react-router";
import { SchemesPage } from "@/pages/schemes";
import { getSchemesQueryOptions } from "@/entities/scheme";

export const Route = createFileRoute("/_authenticated/schemes")({
  component: Page,
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData(getSchemesQueryOptions());
  },
});

function Page() {
  const schemes = Route.useLoaderData();
  return <SchemesPage schemes={schemes} />;
}
