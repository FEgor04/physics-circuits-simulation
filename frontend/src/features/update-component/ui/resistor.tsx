import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Resistor, WithID } from "@/shared/simulation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useOnUpdateComponent } from "../model/hooks";

type Props = {
  defaultValue: WithID<Resistor>;
};

const schema = z.object({
  resistance: z.coerce.number().positive(),
});

export function UpdateResistor({ defaultValue }: Props) {
  const onUpdate = useOnUpdateComponent();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });

  // Syncrhonize internal `form` state with external `defaultValue`
  useEffect(() => {
    form.reset(defaultValue);
  }, [form, defaultValue]);

  function onSubmit(values: z.infer<typeof schema>) {
    onUpdate({ ...defaultValue, ...values });
    toast.success("Резистор сохранен!");
  }

  return (
    <Form {...form}>
      <form id="update-resistor" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="resistance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сопротивление</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
