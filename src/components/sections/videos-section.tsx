import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { videos } from "@/data/homepage";

export function VideosSection() {
  return (
    <section className="section-padding bg-slate-50">
      <Container>
        <SectionHeading eyebrow="Our Videos" title="Project and factory highlights" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {videos.map((video) => (
            <Card key={video}>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Video</p>
              <p className="mt-2 text-slate-800">{video}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
