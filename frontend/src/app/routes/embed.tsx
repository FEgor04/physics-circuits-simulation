import { createFileRoute } from "@tanstack/react-router";
import { SimulationEmbedded } from "@/pages/embed";

export const Route = createFileRoute("/embed")({
  component: SimulationEmbedded,
});
