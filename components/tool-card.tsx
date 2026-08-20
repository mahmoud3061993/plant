import Link from "next/link";
import { ToolIcon } from "@/components/tool-icon";
import type { CareTool } from "@/data/types";

export function ToolCard({ tool }: { tool: CareTool }) {
  const comingSoon = tool.status === "coming-soon";

  return (
    <Link
      href={tool.href}
      className="flex min-h-[11rem] flex-col rounded-[1.75rem] border border-line bg-card p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-leaf/30"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-leaf-soft">
          <ToolIcon id={tool.id} className="size-8" />
        </span>
        {comingSoon ? (
          <span className="rounded-full bg-earth-soft px-3 py-1 text-xs font-bold text-foreground">
            قريبًا
          </span>
        ) : (
          <span className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-bold text-leaf-dark">
            متاح الآن
          </span>
        )}
      </div>
      <h2 className="text-lg font-bold leading-7 text-leaf-dark">{tool.title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
    </Link>
  );
}
