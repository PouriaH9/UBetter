import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { hero } from "@/data/homepage";

export function HeroSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-100 to-white">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-700">Energy Storage Solutions</p>
            <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">{hero.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#" label={hero.primaryCta} />
              <ButtonLink href="#" label={hero.secondaryCta} variant="secondary" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-wider text-slate-500">Trusted capabilities</p>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>High safety LiFePO4 chemistry</li>
              <li>Custom R&D and manufacturing</li>
              <li>Commercial and home system coverage</li>
              <li>Technical support and after-sales service</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
