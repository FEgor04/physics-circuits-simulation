import { Link } from "@tanstack/react-router";

type Props = {
  principalMenu?: React.ReactNode;
};

export function Header({ principalMenu }: Props) {
  return (
    <header className="border-b-4 bg-white">
      <nav className="container mx-auto flex h-12 flex-row items-center">
        <Link to="/schemes" className="font-bold text-black md:text-2xl">
          circui<span className="text-primary">sim</span>
        </Link>
        {principalMenu}
      </nav>
    </header>
  );
}
