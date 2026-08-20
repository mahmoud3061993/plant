import Link from "next/link";
import { ToolIcon } from "@/components/tool-icon";
import type { CareTool } from "@/data/types";

export function ComingSoon({ tool }: { tool: CareTool }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <div className="mx-auto grid size-20 place-items-center rounded-[1.75rem] bg-leaf-soft">
        <ToolIcon id={tool.id} className="size-12" />
      </div>
      <p className="mt-6 text-sm font-bold text-earth">قريبًا</p>
      <h1 className="mt-2 text-3xl font-bold text-leaf-dark">{tool.title}</h1>
      <p className="mt-4 text-lg leading-8 text-muted">{tool.description}</p>
      <p className="mt-6 rounded-[1.5rem] border border-line bg-card p-5 text-sm leading-8 text-foreground/80">
        الأداة دي لسه قيد التحضير. هندخلها على نفس بيانات النباتات من غير ما نلخبط العناية.
        دلوقتي تقدر تستخدم دليل النباتات.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/plants"
          className="inline-flex min-h-12 items-center rounded-full bg-leaf px-6 font-bold text-white hover:bg-leaf-dark"
        >
          روح لدليل النباتات
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-full border border-line bg-card px-6 font-bold text-leaf-dark"
        >
          الرجوع للرئيسية
        </Link>
      </div>
    </div>
  );
}
