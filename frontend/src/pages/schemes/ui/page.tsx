import { useSuspenseQuery } from "@tanstack/react-query";
import { CreateSchemeButton } from "@/features/create-scheme";
import { Scheme, getSchemesQueryOptions } from "@/entities/scheme";
import { SchemeCard } from "@/entities/scheme";
import { SchemeCardTooltip } from "@/widgets/scheme-card-tooltip";

type Props = {
  schemes: Array<Scheme>;
};

export function SchemesPage({ schemes: initialSchemes }: Props) {
  const { data: schemes } = useSuspenseQuery({ ...getSchemesQueryOptions(), initialData: initialSchemes });
  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <h3 className="text-2xl font-bold">Ваши схемы</h3>
        <CreateSchemeButton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {schemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} tooltip={<SchemeCardTooltip />} />
        ))}
      </div>
    </div>
  );
}
