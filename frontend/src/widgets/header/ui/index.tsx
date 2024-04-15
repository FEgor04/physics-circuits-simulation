import { Link } from "@tanstack/react-router";

export function Header() {
  return <header className="bg-background border border-b">
    <nav className="container mx-auto flex items-center flex-row h-12">
      <Link to="/" className="md:text-2xl font-bold">
        circui<span className="text-primary">sim</span>
      </Link>
    </nav>
  </header>
}
