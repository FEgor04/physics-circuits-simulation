import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";

type Props = {
  reset: () => void;
  proceed: () => void;
};

export function SimulationBlockDialog({ proceed, reset }: Props) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Уверены?</AlertDialogTitle>
        <AlertDialogDescription>
          Вы изменили схему. Если вы покините страницу, то она не будет сохранена.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={reset}>Остаться</AlertDialogCancel>
        <AlertDialogAction onClick={proceed}>Продолжить</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
