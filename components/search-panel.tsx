"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { globalSearch } from "@/lib/search";

const TYPE_LABEL = {
  plant: "نبات",
  problem: "مشكلة",
  pest: "حشرة",
  situation: "موقف",
};

export function SearchPanel({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => globalSearch(query), [query]);

  return (
    <div>
      <label htmlFor="global-search" className="mb-2 block text-sm font-bold text-leaf-dark">
        دور على نبات أو مشكلة أو حشرة
      </label>
      <input
        id="global-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="مونستيرا، اصفرار الورق، حشرات بيضا..."
        className="min-h-12 w-full rounded-2xl border border-line bg-card px-4 text-base outline-none ring-leaf/30 placeholder:text-muted focus:ring-2"
      />
      {query.trim() ? (
        <p className="mt-4 text-sm text-muted">{results.length} نتيجة</p>
      ) : (
        <p className="mt-4 text-sm leading-7 text-muted">اكتب اسم نبات، عَرَض، أو موقف زي «غيرت الأصيص».</p>
      )}
      <div className="mt-4 grid gap-3">
        {results.map((hit) => (
          <Link
            key={`${hit.type}-${hit.href}-${hit.title}`}
            href={hit.href}
            className="rounded-[1.5rem] border border-line bg-card p-4 shadow-[var(--shadow-card)] hover:border-leaf/30"
          >
            <p className="text-xs font-bold text-leaf">{TYPE_LABEL[hit.type]}</p>
            <h2 className="mt-1 text-lg font-bold text-leaf-dark">{hit.title}</h2>
            <p className="mt-1 text-sm leading-7 text-muted">{hit.snippet}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
