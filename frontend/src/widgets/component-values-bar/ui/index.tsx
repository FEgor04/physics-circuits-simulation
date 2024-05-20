import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type Props = {
  type: "ampermeter" | "voltmeter";
  measurements: number;
};

export function ComponentValuesBar(props: Props) {
  if (props.type == "ampermeter") {
    return <AmpermeterValuesBar {...props} />;
  }
  if (props.type == "voltmeter") {
    return <VoltmeterValuesBar {...props} />;
  }
}

function AmpermeterValuesBar({ measurements }: Props) {
  return (
    <div className="space-y-4 p-4">
      <h6>Амперметр</h6>
      <div className="space-y-2">
        <Label>Сила тока</Label>
        <Input disabled value={measurements} />
      </div>
    </div>
  );
}

function VoltmeterValuesBar({ measurements }: Props) {
  return (
    <div className="space-y-4 p-4">
      <h6>Вольтметр</h6>
      <div className="space-y-2">
        <Label>Напряжение</Label>
        <Input disabled value={measurements} />
      </div>
    </div>
  );
}
