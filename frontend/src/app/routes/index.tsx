import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Simulation } from "@/pages/simulation";

const rootSearchSchema = z.object({
  state: z.enum(["simulation", "editing"]).catch("editing"),
});

export const Route = createFileRoute("/")({
  component: Simulation,
  validateSearch: rootSearchSchema,
});
