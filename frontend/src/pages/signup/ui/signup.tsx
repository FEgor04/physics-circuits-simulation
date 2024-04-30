import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { SignUpForm, useSignUpByEmailMutation } from "@/features/auth-by-email";
import { formSchema } from "@/features/auth-by-email";
import { Button } from "@/shared/ui/button.tsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card.tsx";

export function SignUpPage() {
  const navigate = useNavigate({});
  const { mutate, isPending } = useSignUpByEmailMutation();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        void navigate({ to: "/" });
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
      <CardFooter>
        <Button type="submit" form="sign-up-form" disabled={isPending}>
          Отправить
        </Button>
      </CardFooter>
    </Card>
  );
}
