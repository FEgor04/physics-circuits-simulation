import { Toggle } from "@/shared/ui/toggle.tsx";

export function StateButton({ state, onChange }: { state: boolean; onChange: (state: boolean) => void }) {
  return (
    <Toggle
      className="fixed bottom-10 right-10 h-20 w-20 cursor-pointer rounded-2xl border-4"
      defaultPressed={state}
      onPressedChange={onChange}
    >
      {state ? "Edit!" : "Simulate!"}
    </Toggle>
  );
}
