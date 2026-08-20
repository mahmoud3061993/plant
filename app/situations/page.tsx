import type { Metadata } from "next";
import Link from "next/link";
import { SITUATIONS } from "@/data/situations";

export const metadata: Metadata = {
  title: "حصل إيه لزرعتي؟",
  description: "مواقف شائعة للنباتات المنزلية: إيه الطبيعي وإيه اللي يستاهل قلق.",
};

export default function SituationsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-bold text-leaf">حصل إيه لزرعتي؟</p>
      <h1 className="mt-2 text-3xl font-bold text-leaf-dark">مواقف بتحصل لكل الناس</h1>
      <p className="mt-3 text-base leading-8 text-muted">
        مش كل ذبول كارثة، ومش كل حاجة طبيعية. اختار الموقف اللي حصل.
      </p>
      <div className="mt-8 grid gap-3">
        {SITUATIONS.map((item) => (
          <Link
            key={item.id}
            href={`/situations/${item.id}`}
            className="rounded-[1.5rem] border border-line bg-card p-5 text-lg font-bold text-leaf-dark shadow-[var(--shadow-card)] hover:border-leaf/30"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
