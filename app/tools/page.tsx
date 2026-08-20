import type { Metadata } from "next";
import { ToolCard } from "@/components/tool-card";
import { CARE_TOOLS } from "@/data/tools";

export const metadata: Metadata = {
  title: "أدوات العناية",
  description: "أدوات مساعدة لاختيار النبات، الري، التربة، الآفات، والإنقاذ السريع.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-leaf">أدوات العناية</p>
      <h1 className="mt-2 text-3xl font-bold text-leaf-dark sm:text-4xl">
        أدوات هتساعدك تقرر أسرع
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-8 text-muted">
        دليل النباتات جاهز دلوقتي. باقي الأدوات ظاهرة كمكانها في المنتج، وهتستخدم نفس قاعدة النباتات لما تتعمل.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARE_TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
