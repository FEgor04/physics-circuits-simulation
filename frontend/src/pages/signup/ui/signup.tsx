import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { z } from "zod";
import { SignUpForm, useSignUpByEmailMutation } from "@/features/auth-by-email";
import { formSchema } from "@/features/auth-by-email";
import { Button, PendingButton } from "@/shared/ui/button.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card.tsx";

export function SignUpPage({ redirect }: { redirect: string | undefined }) {
  const navigate = useNavigate({});
  const { mutate, isPending, isError, error } = useSignUpByEmailMutation();
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values, {
      onSuccess: () => {
        void navigate({ to: redirect ?? "/schemes" });
      },
    });
  }
  return (
    <Card className="mx-auto mt-8 max-w-md">
      <CardHeader>
        <CardTitle>Регистрация в сети</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm onSubmit={onSubmit} />
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        <div className="space-x-4">
          <PendingButton type="submit" form="sign-up-form" isPending={isPending}>
            Отправить
          </PendingButton>
        </div>
        {isError && (
          <p className="text-destructive">
            <ErrorMessage error={error} />
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

function ErrorMessage({ error }: { error: Error }) {
  if (error instanceof AxiosError) {
    if (error.response?.status == 409) {
      return "Пользователь с данной почтой уже существует";
    } else if (error.response?.status == 500) {
      return "Сервер недоступен";
    }
  }
  return error.message;
}
