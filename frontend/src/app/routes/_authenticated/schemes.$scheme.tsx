import { createFileRoute } from "@tanstack/react-router";
import { Simulation } from "@/pages/simulation";
import { getSchemeByIDQueryOptions } from "@/entities/scheme";

export const Route = createFileRoute("/_authenticated/schemes/$scheme")({
  component: Component,
  loader: async ({ context, params }) => {
    const id = parseInt(params.scheme);
    const scheme = await context.queryClient.ensureQueryData(getSchemeByIDQueryOptions(id))
    return scheme;
  },
});

function Component() {
  const scheme = Route.useLoaderData();
  return <Simulation mode="editing" setMode={console.log} scheme={scheme} />;
}
