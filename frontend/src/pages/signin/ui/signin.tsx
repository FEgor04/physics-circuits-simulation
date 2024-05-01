import { Link, useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { SignInForm, useSignInByEmailMutation } from "@/features/auth-by-email";
import { Button } from "@/shared/ui/button.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card.tsx";

export function SignInPage() {
  const { mutate, isError, error } = useSignInByEmailMutation();
  const navigate = useNavigate({});

  return (
    <div className="mt-8">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Вход в систему</CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm
            onSubmit={(values) => {
              mutate(values, {
                onSuccess: () => {
                  navigate({ to: "/" });
                },
              });
            }}
          />
        </CardContent>
        <CardFooter className="space-x-4">
          {isError && <ErrorMessage error={error} />}
          <Button type="submit" form="sign-in-form">
            Отправить
          </Button>
          <Button asChild variant="link">
            <Link to="/signup">Регистрация</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function ErrorMessage({ error }: { error: Error }) {
  if (error instanceof AxiosError) {
    if (error.response?.status == 401) {
      return (
        <p id="signin-card-form-error" className="text-destructive">
          Неверный логин или пароль
        </p>
      );
    }
    if (error.response?.status == 500) {
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
