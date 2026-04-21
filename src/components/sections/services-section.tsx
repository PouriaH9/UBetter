import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/homepage";

export function ServicesSection() {
  return (
    <section className="section-padding bg-slate-50">
      <Container>
        <SectionHeading eyebrow="Our Service" title="What customers get when working with UBETTER" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service}>
              <p className="font-semibold text-slate-800">{service}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
