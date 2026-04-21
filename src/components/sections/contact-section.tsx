import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contact } from "@/data/homepage";

export function ContactSection() {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Get Free Quote" title="Talk to our team about your energy storage project" />
            <div className="mt-6 space-y-3 text-slate-700">
              <p>Email: {contact.email}</p>
              <p>Mobile: {contact.phone}</p>
              <p>Telephone: {contact.tel}</p>
              <p>Address: {contact.address}</p>
            </div>
          </div>
          <form className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
              />
              <textarea
                placeholder="Project details"
                rows={5}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
              />
              <button
                type="button"
                className="rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
