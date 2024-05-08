import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { z } from "zod";
import { SignUpForm, useSignUpByEmailMutation } from "@/features/auth-by-email";
import { formSchema } from "@/features/auth-by-email";
import { Button } from "@/shared/ui/button.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card.tsx";

export function SignUpPage() {
  const navigate = useNavigate({});
  const { mutate, isPending, isError, error } = useSignUpByEmailMutation();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        void navigate({ to: "/", search: { state: "editing" } });
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
      <CardFooter className="space-x-4">
        {isError && <ErrorMessage error={error} />}
        <Button type="submit" form="sign-up-form" disabled={isPending}>
          Отправить
        </Button>
      </CardFooter>
    </Card>
  );
}

function ErrorMessage({ error }: { error: Error }) {
  if (error instanceof AxiosError) {
    if (error.response?.status == 409) {
      return (
        <p id="signin-card-form-error" className="text-destructive">
          Пользователь с данной почтой уже существует
        </p>
      );
    } else if (error.response?.status == 500) {
      return (
        <p id="signin-card-form-error" className="text-destructive">
          Сервер недоступен
        </p>
      );
    }
  }
  return (
    <p id="signin-card-form-error" className="text-destructive">
      {error.message}
    </p>
  );
}
