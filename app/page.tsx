import Link from "next/link";
import { PlantCard } from "@/components/plant-card";
import { ToolCard } from "@/components/tool-card";
import { ToolIcon } from "@/components/tool-icon";
import { HOME_TOOLS } from "@/data/tools";
import { getBeginnerPlants, toPlantSummary } from "@/lib/plants";

export default function HomePage() {
  const starterPlants = getBeginnerPlants(4);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <section className="pt-10 sm:pt-14">
        <p className="text-4xl">🌿</p>
        <p className="mt-4 text-sm font-bold text-leaf">إيه اللي محتاج تعمله لزرعك؟</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-leaf-dark sm:text-5xl sm:leading-[1.25]">
          دليل إنقاذ ورعاية النباتات المنزلية
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-9 text-muted">
          كل اللي محتاج تعرفه عشان تختار النبات المناسب، تعتني بيه صح، وتعرف تتصرف
          لو ظهرت عليه مشكلة.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/plants"
            className="inline-flex min-h-12 items-center rounded-full bg-leaf px-6 font-bold text-white hover:bg-leaf-dark"
          >
            افتح دليل النباتات
          </Link>
          <Link
            href="/tools"
            className="inline-flex min-h-12 items-center rounded-full border border-line bg-card px-6 font-bold text-leaf-dark"
          >
            شوف أدوات العناية
          </Link>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="start-heading">
        <h2 id="start-heading" className="text-2xl font-bold text-leaf-dark">
          مش عارف تبدأ منين؟
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <StartCard href="/plants" id="library" title="عندي نبات وعايز أعرف أعتني بيه" />
          <StartCard href="/doctor" id="doctor" title="نباتي فيه مشكلة" />
          <StartCard href="/plant-matcher" id="matcher" title="لسه هشتري نبات" />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-2xl font-bold text-leaf-dark">
          اختار اللي محتاجه دلوقتي
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
          كل الأدوات بتقرأ من نفس دليل النباتات.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="starter-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="starter-heading" className="text-2xl font-bold text-leaf-dark">
              ابدأ بنباتات سهلة
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              لو لسه بتتعوّد، الأنواع دي أهدى في البيت من النباتات الحساسة.
            </p>
          </div>
          <Link href="/plants" className="text-sm font-bold text-leaf hover:underline">
            كل الدليل
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {starterPlants.map((plant) => (
            <PlantCard key={plant.id} plant={toPlantSummary(plant)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function StartCard({
  href,
  id,
  title,
}: {
  href: string;
  id: "library" | "doctor" | "matcher";
  title: string;
}) {
  return (
    <Link
      href={href}
      className="flex min-h-28 items-center gap-4 rounded-[1.75rem] border border-line bg-card p-5 shadow-[var(--shadow-card)] hover:border-leaf/30"
    >
      <span className="grid size-14 place-items-center rounded-2xl bg-leaf-soft">
        <ToolIcon id={id} className="size-8" />
      </span>
      <span className="text-lg font-bold leading-8 text-leaf-dark">{title}</span>
    </Link>
  );
}
