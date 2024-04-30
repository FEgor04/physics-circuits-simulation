import { createFileRoute } from "@tanstack/react-router";
import { SignUpPage } from "@/pages/signup";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
});
