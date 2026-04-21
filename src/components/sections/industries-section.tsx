import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/data/homepage";

export function IndustriesSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          eyebrow="Applications"
          title="Commercial and industrial usage across key sectors"
          description="Energy storage systems help improve reliability, reduce peak cost, and support continuous operation."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <Card key={industry}>
              <p className="text-slate-800">{industry}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
