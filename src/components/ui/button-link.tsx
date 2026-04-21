import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ href, label, variant = "primary" }: ButtonLinkProps) {
  const style =
    variant === "primary"
      ? "bg-primary-700 text-white hover:bg-primary-800"
      : "bg-white text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${style}`}
    >
      {label}
    </Link>
  );
}
