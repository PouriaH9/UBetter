import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-10 text-slate-300">
      <Container className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
        <p>Copyright 2023 UBETTER GROUP TECHNOLOGY COMPANY LIMITED</p>
        <p>Reliable lithium iron phosphate battery manufacturer</p>
      </Container>
    </footer>
  );
}
