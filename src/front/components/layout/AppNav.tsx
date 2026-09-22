import Link from "next/link";
import { SignOutButton } from "@/front/components/layout/SignOutButton";

const links = [
  { href: "/dashboard", label: "Panel" },
  { href: "/calendario", label: "Calendario" },
  { href: "/pacientes", label: "Pacientes" },
  { href: "/tareas", label: "Tareas" },
];

export function AppNav() {
  return (
    <nav className="max-w-5xl mx-auto px-7 pt-6 flex items-center justify-between">
      <div className="font-display text-lg font-semibold text-[var(--ink)]">
        Mind<span className="text-[var(--clay)]">Chiwi</span>
      </div>
      <div className="flex items-center gap-6">
        <ul className="flex gap-6 text-sm text-[var(--ink-soft)]">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-[var(--ink)]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <SignOutButton />
      </div>
    </nav>
  );
}