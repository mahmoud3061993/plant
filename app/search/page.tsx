import type { Metadata } from "next";
import { SearchPanel } from "@/components/search-panel";

export const metadata: Metadata = {
  title: "بحث",
  description: "ابحث في النباتات والمشاكل والحشرات والمواقف.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-leaf-dark">بحث سريع</h1>
      <p className="mt-2 text-base leading-8 text-muted">البحث محلي على الجهاز من نفس قاعدة النباتات.</p>
      <div className="mt-8">
        <SearchPanel initialQuery={q ?? ""} />
      </div>
    </div>
  );
}
