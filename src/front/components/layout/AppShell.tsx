import { NavLinks } from "@/front/components/layout/NavLinks";
import { SignOutButton } from "@/front/components/layout/SignOutButton";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex md:w-56 flex-col shrink-0 bg-[var(--pine-deep)] text-[#EDEEE6] p-6">
        <div className="font-display text-lg font-semibold mb-8">
          Mind<span className="text-[var(--clay)]">Chiwi</span>
        </div>
        <NavLinks variant="sidebar" />
        <div className="border-t border-white/10 pt-4 mt-4">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden border-b border-[var(--line)] px-4 py-3">
          <NavLinks variant="mobile" />
        </div>
        <main className="max-w-5xl mx-auto px-7 py-10">{children}</main>
      </div>
    </div>
  );
}