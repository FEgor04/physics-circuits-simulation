import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { SchemeID } from "@/entities/scheme";
import { PendingButton } from "@/shared/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { getSchemePermissionsQO } from "../api/get-permissions";
import { useUpdateSchemePermissionsMutation } from "../api/set-permissions";
import { PermissionType } from "../model/permission";

const schema = z.object({
  email: z.string().email(),
  permission: z.enum(["VIEW", "EDIT"]),
});

type Props = {
  schemeId: SchemeID;
};

export function InviteUserForm({ schemeId }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      permission: "VIEW",
    },
  });

  const { mutate, isPending } = useUpdateSchemePermissionsMutation();
  const { data } = useSuspenseQuery(getSchemePermissionsQO(schemeId));

  function onSubmit(values: z.infer<typeof schema>) {
    const newPermissions: Array<{ email: string; permission: PermissionType }> = [
      ...(data ?? [])
        .map((it) => ({
          email: it.user.email,
          permission: it.type,
        }))
        .filter((it) => it.email != values.email),
      values,
    ];
    const toastId = toast.loading("Обновляем права схемы");
    mutate(
      {
        schemeId,
        permissions: newPermissions,
      },
      {
        onSuccess: () => {
          toast.success("Права схемы успешно обновлены", { id: toastId });
        },
        onError: (err) => {
          if (isAxiosError(err)) {
            if (err.response?.status == 404 && err.response.data.message == "User not found") {
              toast.error("Ошибка! Нет пользователя с такой почтой", { id: toastId });
              return;
            }
            if (err.response?.status == 409) {
              toast.error("Ошибка! Вы не можете изменять собственные права", { id: toastId });
              return;
            }
          }
          toast.error("Ошибка! " + err.message, { id: toastId });
        },
      },
    );
  }

  return (
    <Form {...form}>
      <h6 className="text-sm font-medium">Пригласить пользователя</h6>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Права</FormLabel>
              <FormControl>
                <Select defaultValue={field.value} onValueChange={(value) => field.onChange(value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите права" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="VIEW">Просмотр</SelectItem>
                    <SelectItem value="EDIT">Редактирование</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormItem>
          <PendingButton type="submit" isPending={isPending}>
            Добавить
          </PendingButton>
        </FormItem>
      </form>
    </Form>
  );
}
