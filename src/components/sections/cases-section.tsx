import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { caseHighlights } from "@/data/homepage";

export function CasesSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading eyebrow="Case Show" title="Proven home and commercial deployment scenarios" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {caseHighlights.map((item) => (
            <Card key={item} className="border-primary-100 bg-primary-50/40">
              <p className="font-semibold text-slate-900">{item}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
