import { Button } from "@/shared/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import sample from "@/shared/assets/circuit/sample.png";
import { Github } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export const Route = createFileRoute("/")({
  component: Component,
});

function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                Симуляция электрических схем
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                Проект{" "}
                <span className="font-bold text-black">
                  circui<span className="text-primary">sim</span>
                </span>{" "}
                позвоялет вам создавать схемы в онлайн платформе и делиться ими с друзьями, студентами или знакомыми
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link to="/schemes">Начать симуляцию</Link>
              </Button>
              <a
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="https://github.com/FEgor04/physics-circuits-simulation"
              >
                <Github className="mr-2 size-4" target="_blank" />
                Исходный код
              </a>
            </div>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-2/3"
            src={sample}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Создавайте схемы</CardTitle>
              <CardDescription>Вы можете создавать схемы и они будут сохранены на нашей платформе</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Запускайте их в режиме симуляции</CardTitle>
              <CardDescription>
                Ваша схема будет рассчитана с помощью метода узлового анализа и на созданных вами амперметрах и
                вольтметрах будут отображены измерения
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Делитесь ими с друзьями</CardTitle>
              <CardDescription>
                Вы можете поделиться вашей схемой как в режиме только для просмотра, так и в режиме для редактирования
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Редактируйте схемы одновременно</CardTitle>
              <CardDescription>
                Создавайте схемы и работайте над ними одновременно с другими людьми на любых устройствах. Изменения
                отображаются в реальном времени
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Встраивайте схемы на другие сайты</CardTitle>
              <CardDescription>
                Включите отображение схемы во вложенном режиме и встройте ее с помощью{" "}
                <span className="font-mono">iframe</span>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
