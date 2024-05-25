import { createFileRoute } from "@tanstack/react-router";
import { SimulationEmbedded } from "@/pages/embed";
import { getSchemeByIDQueryOptions } from "@/entities/scheme";

export const Route = createFileRoute("/embed/$scheme")({
  component: Component,
  loader: async ({ context, params }) => {
    const id = parseInt(params.scheme);
    const scheme = await context.queryClient.ensureQueryData(getSchemeByIDQueryOptions(id));
    return scheme;
  },
});

function Component() {
  const scheme = Route.useLoaderData();
  return <SimulationEmbedded scheme={scheme} />;
}
