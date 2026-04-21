import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProducts, productCategories } from "@/data/homepage";

export function ProductOverviewSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          eyebrow="Our Products"
          title="Battery systems for home, business, and industrial applications"
          description="Explore core categories and featured storage products from the current UBETTER lineup."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {productCategories.map((category) => (
            <Card key={category} className="p-5">
              <p className="font-semibold text-slate-800">{category}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product}>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Featured Product</p>
              <p className="mt-2 text-slate-800">{product}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
