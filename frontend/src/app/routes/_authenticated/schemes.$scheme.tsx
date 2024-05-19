import { createFileRoute, useNavigate } from "@tanstack/react-router";
import z from "zod";
import { Simulation } from "@/pages/simulation";
import { getSchemeByIDQueryOptions } from "@/entities/scheme";

export const Route = createFileRoute("/_authenticated/schemes/$scheme")({
  component: Component,
  loader: async ({ context, params }) => {
    const id = parseInt(params.scheme);
    const scheme = await context.queryClient.ensureQueryData(getSchemeByIDQueryOptions(id));
    return scheme;
  },
  validateSearch: z.object({
    mode: z.enum(["editing", "simulation"]).catch("editing"),
  }),
});

function Component() {
  const scheme = Route.useLoaderData();
  const { mode } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  function setMode(mode: "editing" | "simulation") {
    navigate({
      search: (prev) => ({ ...prev, mode }),
    });
  }
  return <Simulation mode={mode} setMode={setMode} scheme={scheme} />;
}
