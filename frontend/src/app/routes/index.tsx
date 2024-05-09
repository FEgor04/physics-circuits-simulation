import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Simulation } from "@/pages/simulation";

const rootSearchSchema = z.object({
  state: z.enum(["simulation", "editing"]).catch("editing"),
});

export const Route = createFileRoute("/")({
  component: Component,
  validateSearch: rootSearchSchema,
});

function Component() {
  const { state: mode } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  function setMode(mode: z.infer<typeof rootSearchSchema>["state"]) {
    navigate({
      search: (prev) => ({
        ...prev,
        state: mode,
      }),
    });
  }

  return <Simulation mode={mode} setMode={setMode} />;
}
