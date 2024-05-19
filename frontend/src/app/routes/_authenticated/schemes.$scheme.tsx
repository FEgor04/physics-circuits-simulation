import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/schemes/$scheme")({
  component: () => <div>Hello /_authenticated/schemes/$scheme!</div>,
});
