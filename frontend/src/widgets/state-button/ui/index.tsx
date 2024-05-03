import { Toggle } from "@/shared/ui/toggle.tsx";

export function StateButton({ isSimulation, onChange }: { isSimulation: boolean; onChange: (state: boolean) => void }) {
  return (
    <Toggle
      className="fixed bottom-10 right-10 h-20 w-20 cursor-pointer rounded-2xl border-4"
      defaultPressed={isSimulation}
      onPressedChange={onChange}
    >
      {isSimulation ? "Edit!" : "Simulate!"}
    </Toggle>
  );
}
