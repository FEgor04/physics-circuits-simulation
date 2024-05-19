import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Component,
});

function Component() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-center text-4xl font-bold md:text-5xl lg:text-6xl">
        {" "}
        <span className="text-primary underline">Азат</span>, сделай пожалуйста красивый лендинг!!!{" "}
      </h1>
    </div>
  );
}
