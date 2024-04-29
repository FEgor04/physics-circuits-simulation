import { ElectricalComponent } from "@/shared/simulation";

type Props = {
  components: Array<ElectricalComponent>;
};

export function Canvas({ components }: Props) {
  return (
    <svg>
      {/* @TODO use better key, probably add ID to ElectricalComponent */}
      {components.map((_, ind) => (
        <rect key={ind} width="200" height="200" />
      ))}
    </svg>
  );
}
