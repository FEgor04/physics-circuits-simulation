import { assertNever } from "@/shared/lib/types";
import { Ampermeter, Voltmeter, WithID } from "@/shared/simulation";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

type AmpermeterProps = {
  type: Ampermeter["_type"];
  component: WithID<Ampermeter>;
  measurements: {
    currency: number;
  };
};

type VoltmeterProps = {
  type: Voltmeter["_type"];
  component: WithID<Voltmeter>;
  measurements: {
    voltage: number;
  };
};

type Props = VoltmeterProps | AmpermeterProps;

export function ComponentValuesBar(props: Props) {
  if (props.type == "ampermeter") {
    return <AmpermeterValuesBar {...props} />;
  }
  if (props.type == "voltmeter") {
    return <VoltmeterValuesBar {...props} />;
  }
  assertNever(props);
}

function AmpermeterValuesBar({ measurements: { currency } }: AmpermeterProps) {
  return (
    <div className="space-y-4">
      <h6>Амперметр</h6>
      <div className="space-y-2">
        <Label>Сила тока</Label>
        <Input disabled value={currency} />
      </div>
    </div>
  );
}

function VoltmeterValuesBar({ measurements: { voltage } }: VoltmeterProps) {
  return (
    <div className="space-y-4">
      <h6>Вольтметр</h6>
      <div className="space-y-2">
        <Label>Напряжение</Label>
        <Input disabled value={voltage} />
      </div>
    </div>
  );
}
