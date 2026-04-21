import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/homepage";

export function AboutSection() {
  return (
    <section className="section-padding bg-slate-50">
      <Container>
        <SectionHeading eyebrow="About UBETTER" title="High-tech manufacturing with strong engineering depth" />
        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">{about}</p>
      </Container>
    </section>
  );
}
