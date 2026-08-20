import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-card/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6">
        <p className="text-sm font-semibold text-leaf-dark">
          دليل إنقاذ ورعاية النباتات المنزلية
        </p>
        <p className="max-w-2xl text-sm leading-7 text-muted">
          المعلومات دي للإرشاد العام في البيت. مش تشخيص طبي أو بيطري، ومش بديل عن متخصص
          لو النبات غالي عندك أو الحالة متقدمة. لو حصل بلع لأي جزء من النبات، راجع جهة طبية
          أو بيطرية مختصة.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/plants" className="font-semibold text-leaf hover:underline">
            دليل النباتات
          </Link>
          <Link href="/doctor" className="font-semibold text-leaf hover:underline">
            التشخيص
          </Link>
          <Link href="/planner" className="font-semibold text-leaf hover:underline">
            المخطط للطباعة
          </Link>
          <Link href="/situations" className="font-semibold text-leaf hover:underline">
            حصل إيه لزرعتي؟
          </Link>
          <Link href="/tools" className="font-semibold text-leaf hover:underline">
            أدوات العناية
          </Link>
        </div>
      </div>
    </footer>
  );
}
