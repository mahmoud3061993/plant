import type { ReactNode } from "react";

export function CareSection({
  id,
  title,
  children,
  tone = "default",
}: {
  id?: string;
  title: string;
  children: ReactNode;
  tone?: "default" | "warning" | "safe";
}) {
  const toneClass = {
    default: "border-line bg-card",
    warning: "border-clay/20 bg-clay-soft/60",
    safe: "border-leaf/20 bg-leaf-soft/70",
  }[tone];

  return (
    <section id={id} className={`rounded-[1.75rem] border p-5 shadow-[var(--shadow-card)] sm:p-6 ${toneClass}`}>
      <h2 className="mb-4 text-xl font-bold text-leaf-dark">{title}</h2>
      <div className="space-y-3 text-[15px] leading-8 text-foreground/90">{children}</div>
    </section>
  );
}
