import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMeQueryOptions } from "@/entities/principal";
import { Button } from "@/shared/ui/button.tsx";

type Props = {
  principalMenu?: React.ReactNode;
};

export function Header({ principalMenu }: Props) {
  return (
    <header className="border-b-4 bg-white">
      <nav className="container mx-auto flex h-12 flex-row items-center justify-between">
        <MainLink>
          <span className="font-bold text-black md:text-2xl">
          circui<span className="text-primary">sim</span>
          </span>
        </MainLink>
        <Button variant={"link"} asChild>
          <Link to="/article">Обучающая статья</Link>
        </Button>
        {principalMenu}
      </nav>
    </header>
  );
}

function MainLink({ children }: React.PropsWithChildren) {
  const { data } = useQuery(getMeQueryOptions());
  if (data) {
    return (
      <Link to="/schemes" className="">
        {children}
      </Link>
    );
  }
  return (
    <Link to="/" className="">
      {children}
    </Link>
  );
}
