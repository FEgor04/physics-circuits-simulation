import { Link, useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { SignInForm, useSignInByEmailMutation } from "@/features/auth-by-email";
import { Button, PendingButton } from "@/shared/ui/button.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card.tsx";

export function SignInPage({ redirect }: { redirect: string | undefined }) {
  const { mutate, isError, error, isPending } = useSignInByEmailMutation();
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
                  navigate({ to: redirect ?? "/schemes" });
                },
              });
            }}
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <div className="flex flex-row items-center space-x-4 space-y-0">
            <PendingButton type="submit" form="sign-in-form" isPending={isPending}>
              Отправить
            </PendingButton>
            <Button asChild variant="link">
              <Link to="/signup">Регистрация</Link>
            </Button>
          </div>
          {isError && (
            <p className="text-destructive">
              <ErrorMessage error={error} />
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function ErrorMessage({ error }: { error: Error }) {
  if (error instanceof AxiosError) {
    if (error.response?.status == 401) {
      return "Неверный логин или пароль";
    }
    if (error.response?.status == 500) {
      return "Сервер недоступен";
    }
  }
  return error.message;
}
