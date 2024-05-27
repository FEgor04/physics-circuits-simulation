import { createLazyFileRoute } from "@tanstack/react-router";
import { SignUpPage } from "@/pages/signup";

export const Route = createLazyFileRoute("/signup")({
  component: SignUpPage,
});
