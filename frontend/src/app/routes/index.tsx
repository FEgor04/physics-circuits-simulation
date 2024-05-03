import { createFileRoute } from "@tanstack/react-router";
import { Simulation } from "@/pages/simulation";

export type SimulationState = "simulation" | "editing";

type RootSearch = {
  state: SimulationState;
};

export const Route = createFileRoute("/")({
  component: Simulation,
  validateSearch: (search: Record<string, unknown>): RootSearch => {
    return {
      state: (search.state as SimulationState) || "editing",
    };
  },
});
