import type { Plant } from "@/data/types";
import { HUMIDITY_LABELS, LIGHT_LABELS } from "@/lib/labels";

export function QuickCare({ plant }: { plant: Plant }) {
  const items = [
    { emoji: "☀️", title: "الضوء", body: LIGHT_LABELS[plant.light.level] },
    { emoji: "💧", title: "الري", body: plant.quickCard.water },
    { emoji: "🪴", title: "التربة", body: plant.quickCard.soil },
    { emoji: "🌿", title: "التسميد", body: plant.fertilizing.season },
    { emoji: "💦", title: "الرطوبة", body: HUMIDITY_LABELS[plant.environment.humidity] },
    { emoji: "🌡", title: "الحرارة", body: plant.quickCard.temperature },
  ];

  return (
    <section aria-labelledby="quick-care-heading">
      <h2 id="quick-care-heading" className="mb-4 text-2xl font-bold text-leaf-dark">
        العناية السريعة
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.5rem] border border-line bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <p className="text-2xl">{item.emoji}</p>
            <h3 className="mt-3 text-base font-bold">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
