import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { SignInPage } from "@/pages/signin";

export const Route = createFileRoute("/signin")({
  component: Page,
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
});

function Page() {
  const { redirect } = Route.useSearch();
  return <SignInPage redirect={redirect} />;
}
