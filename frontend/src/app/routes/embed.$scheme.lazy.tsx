import { createLazyFileRoute } from "@tanstack/react-router";
import { SimulationEmbedded } from "@/pages/embed";

export const Route = createLazyFileRoute("/embed/$scheme")({
  component: Component,
});

function Component() {
  const scheme = Route.useLoaderData();
  return <SimulationEmbedded scheme={scheme} />;
}
