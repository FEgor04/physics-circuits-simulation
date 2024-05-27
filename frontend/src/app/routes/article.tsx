import { createFileRoute } from "@tanstack/react-router";
import { EducationalArticle } from "@/pages/aritcle";

export const Route = createFileRoute("/article")({
  component: () => EducationalArticle,
});
