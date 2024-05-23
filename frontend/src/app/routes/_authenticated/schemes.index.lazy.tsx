import { createLazyFileRoute } from "@tanstack/react-router";
import { SchemesPage } from "@/pages/schemes";

export const Route = createLazyFileRoute("/_authenticated/schemes/")({
  component: Page,
});

function Page() {
  const schemes = Route.useLoaderData();
  return <SchemesPage schemes={schemes} />;
}
