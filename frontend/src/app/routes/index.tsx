import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Component,
});

function Component() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="font-bold text-center text-4xl md:text-5xl lg:text-6xl"> <span className="underline text-primary">Азат</span>, сделай пожалуйста красивый лендинг!!! </h1>
    </div>
  );
}
