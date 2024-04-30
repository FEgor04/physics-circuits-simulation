import { Link, useNavigate } from "@tanstack/react-router";
import { SignInForm, useSignInByEmailMutation } from "@/features/auth-by-email";
import { Button } from "@/shared/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card.tsx";

export function SignInPage() {
  const { mutate } = useSignInByEmailMutation();
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
