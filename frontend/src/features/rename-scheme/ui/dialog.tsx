import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Scheme, useUpdateSchemeMutation } from "@/entities/scheme";
import { Button } from "@/shared/ui/button";
import { DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

type Props = {
  scheme: Scheme;
};

const formSchema = z.object({
  name: z.string().min(1),
});

export function RenameSchemeDialogContent({ scheme }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: scheme.name,
    },
  });
  const { mutate, isPending } = useUpdateSchemeMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      components: scheme.components,
      name: values.name,
      id: scheme.id,
    });
  }

  return (
    <DialogContent>
      <DialogTitle>Переименование схемы</DialogTitle>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Сохранить
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
