import { PlusCircle } from "lucide-react";
import { Scheme } from "@/entities/scheme";
import { SchemeCard } from "@/entities/scheme";
import { Button } from "@/shared/ui/button";
import { CreateSchemeButton } from "@/entities/scheme/ui/create-scheme";

type Props = {
  schemes: Array<Scheme>;
};

export function SchemesPage({ schemes }: Props) {
  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
        <h3 className="text-2xl font-bold">Ваши схемы</h3>
        <CreateSchemeButton />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {schemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
}
