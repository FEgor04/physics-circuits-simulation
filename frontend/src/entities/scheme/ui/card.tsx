import { Link } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Scheme } from "../model/scheme";

export function SchemeCard({ scheme, tooltip }: { scheme: Scheme; tooltip: React.PropsWithChildren["children"] }) {
  return (
    <Link to="/schemes/$scheme" params={{ scheme: String(scheme.id) }} search={{ mode: "editing" }}>
      <Card>
        <div>
          <Skeleton className="aspect-square w-full" />
        </div>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg">{scheme.name}</CardTitle>
            <CardDescription className="flex flex-row justify-between">{scheme.authorName}</CardDescription>
          </div>
          <div>{tooltip}</div>
        </CardHeader>
      </Card>
    </Link>
  );
}
