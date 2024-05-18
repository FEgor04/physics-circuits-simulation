import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { WithID, SourceDC } from "@/shared/simulation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useOnUpdateComponent } from "../model/hooks";

type Props = {
  defaultValue: WithID<SourceDC>;
};

const schema = z.object({
  electromotiveForce: z.coerce.number(),
});

export function UpdateSourceDC({ defaultValue }: Props) {
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
  }

  return (
    <Form {...form}>
      <form id="update-source-dc" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="electromotiveForce"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электродвижущая сила</FormLabel>
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