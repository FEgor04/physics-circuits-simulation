import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Simulation } from "@/pages/simulation";

export const Route = createLazyFileRoute("/_authenticated/schemes/$scheme")({
  component: Component,
});

function Component() {
  const scheme = Route.useLoaderData();
  const { mode } = Route.useSearch();
  const navigate = useNavigate({ from: "/schemes/$scheme" });
  function setMode(mode: "editing" | "simulation") {
    navigate({
      search: (prev) => ({ ...prev, mode }),
    });
  }
  return <Simulation mode={mode} setMode={setMode} scheme={scheme} />;
}
