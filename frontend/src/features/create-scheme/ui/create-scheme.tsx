import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCreateSchemeMutation } from "@/entities/scheme";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

export function CreateSchemeButton() {
  return <CreateDialog />;
}

function CreateDialog() {
  const form = useForm<{ name: string }>({
    resolver: zodResolver(z.object({ name: z.string() })),
  });
  const { mutate, isPending } = useCreateSchemeMutation();
  const navigate = useNavigate();

  function onSubmit(values: { name: string }) {
    mutate(values, {
      onSuccess: (result) => {
        navigate({
          to: "/schemes/$scheme",
          params: {
            scheme: String(result.id),
          },
          search: {
            mode: "editing",
          },
        });
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 size-4" />
          Создать схему
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание схемы</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название схемы</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">
              Создать
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
