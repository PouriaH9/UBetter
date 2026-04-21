import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { navItems } from "@/data/homepage";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="border-b border-slate-100 bg-slate-900 py-2 text-xs text-slate-200">
        <Container className="flex flex-wrap items-center justify-between gap-3">
          <p>Mon - Fri: 9:00 - 18:30</p>
          <p>+86-13699771621 | ubetterbattery@gmail.com</p>
        </Container>
      </div>
      <Container className="flex items-center justify-between py-4">
        <p className="text-xl font-bold text-slate-900">UBETTER</p>
        <nav className="hidden gap-6 text-sm text-slate-700 lg:flex">
          {navItems.map((item) => (
            <a key={item} href="#" className="font-medium hover:text-primary-700">
              {item}
            </a>
          ))}
        </nav>
        <ButtonLink href="#" label="Get Quote" />
      </Container>
    </header>
  );
}
