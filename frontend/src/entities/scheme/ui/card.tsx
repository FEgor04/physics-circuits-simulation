import { Link } from "@tanstack/react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Scheme } from "../model/scheme";

export function SchemeCard({
  scheme,
  tooltip,
  preview,
}: {
  scheme: Scheme;
  tooltip: React.PropsWithChildren["children"];
  preview: React.PropsWithChildren["children"];
}) {
  return (
    <Card className="border-4 border-black">
      <div className="h-80 border-b-2 border-black">
        <Link to="/schemes/$scheme" params={{ scheme: String(scheme.id) }} search={{ mode: "editing" }}>
          {preview}
        </Link>
      </div>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <Link to="/schemes/$scheme" params={{ scheme: String(scheme.id) }} search={{ mode: "editing" }}>
            <CardTitle className="text-lg">{scheme.name}</CardTitle>
          </Link>
          <CardDescription className="flex flex-row justify-between">{scheme.authorName}</CardDescription>
        </div>
        <div>{tooltip}</div>
      </CardHeader>
    </Card>
  );
}
