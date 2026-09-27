"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Panel" },
  { href: "/calendario", label: "Calendario" },
  { href: "/pacientes", label: "Pacientes" },
  { href: "/tareas", label: "Tareas" },
  { href: "/recursos", label: "Recursos" },
];

export function NavLinks({ variant }: { variant: "sidebar" | "mobile" }) {
  const pathname = usePathname();

  if (variant === "mobile") {
    return (
      <nav className="flex gap-2 overflow-x-auto">
        {links.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm ${
                active
                  ? "bg-[var(--pine)] text-white border-[var(--pine)]"
                  : "bg-[var(--panel)] text-[var(--ink-soft)] border-[var(--line)]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-1 flex-1">
      {links.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3 py-2 text-sm ${
              active ? "bg-white/10 text-white" : "text-[#C9D0C6] hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}