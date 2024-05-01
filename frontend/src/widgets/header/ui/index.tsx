import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="border-b-4 bg-foreground">
      <nav className="container mx-auto flex h-12 flex-row items-center">
        <Link to="/" className="font-bold text-black md:text-2xl">
          circui<span className="text-primary">sim</span>
        </Link>
      </nav>
    </header>
  );
}
