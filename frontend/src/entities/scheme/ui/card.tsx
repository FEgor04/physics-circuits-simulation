import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Scheme } from "../model/scheme";

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Card>
      <div>
        <Skeleton className="aspect-square w-full" />
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{scheme.name}</CardTitle>
        <CardDescription>{scheme.authorName}</CardDescription>
      </CardHeader>
    </Card>
  );
}
