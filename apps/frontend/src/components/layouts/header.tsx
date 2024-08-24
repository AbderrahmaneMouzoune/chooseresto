import { ThemeToggle } from "@components/theme-toggle";

export default function Header() {
  return (
    <header className="container flex justify-end">
      <ThemeToggle />
    </header>
  );
}
