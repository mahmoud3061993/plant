import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSituation, SITUATIONS } from "@/data/situations";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return SITUATIONS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = getSituation(id);
  return { title: item?.title ?? "موقف غير موجود" };
}

export default async function SituationDetailPage({ params }: Props) {
  const { id } = await params;
  const item = getSituation(id);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/situations" className="text-sm font-bold text-leaf hover:underline">
        كل المواقف
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-leaf-dark">{item.title}</h1>
      <section className="mt-8 rounded-[1.75rem] border border-line bg-card p-5 leading-8">
        <h2 className="font-bold text-leaf-dark">إيه اللي ممكن يكون حاصل؟</h2>
        <p className="mt-2">{item.happening}</p>
      </section>
      <section className="mt-4 rounded-[1.75rem] border border-line bg-leaf-soft p-5 leading-8">
        <h2 className="font-bold text-leaf-dark">إيه الطبيعي؟</h2>
        <p className="mt-2">{item.normal}</p>
      </section>
      <section className="mt-4 rounded-[1.75rem] border border-clay/20 bg-clay-soft p-5 leading-8">
        <h2 className="font-bold">إيه اللي مش طبيعي؟</h2>
        <p className="mt-2">{item.notNormal}</p>
      </section>
      <section className="mt-4 rounded-[1.75rem] border border-line bg-card p-5 leading-8">
        <h2 className="font-bold text-leaf-dark">اعمل إيه؟</h2>
        <ul className="mt-2 list-disc pr-5">
          {item.do.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>
      <section className="mt-4 rounded-[1.75rem] border border-line bg-earth-soft p-5 leading-8">
        <h2 className="font-bold text-leaf-dark">متعملش إيه؟</h2>
        <ul className="mt-2 list-disc pr-5">
          {item.dont.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>
      <section className="mt-4 rounded-[1.75rem] border border-clay/20 bg-card p-5 leading-8">
        <h2 className="font-bold">إمتى تقلق؟</h2>
        <p className="mt-2">{item.worry}</p>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/doctor" className="inline-flex min-h-12 items-center rounded-full bg-leaf px-5 font-bold text-white">
          التشخيص خطوة بخطوة
        </Link>
        <Link href="/emergency" className="inline-flex min-h-12 items-center rounded-full border border-line bg-card px-5 font-bold text-leaf-dark">
          إنقاذ سريع
        </Link>
      </div>
    </div>
  );
}
