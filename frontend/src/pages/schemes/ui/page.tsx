import { Scheme } from "@/entities/scheme";
import { SchemeCard } from "@/entities/scheme";

type Props = {
  schemes: Array<Scheme>;
};

export function SchemesPage({ schemes }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {schemes.map((scheme) => (
        <SchemeCard key={scheme.id} scheme={scheme} />
      ))}
    </div>
  );
}
