import Image from "next/image";
import { PHOTO_CREDITS, plantPhotoSrc } from "@/data/photo-credits";

export function PlantPortrait({
  slug,
  name,
  size = "card",
  emoji = "🌿",
  hue = 140,
}: {
  slug: string;
  name: string;
  size?: "card" | "hero";
  emoji?: string;
  hue?: number;
}) {
  const height = size === "hero" ? "h-72 sm:h-96" : "h-48";
  const hasPhoto = Boolean(PHOTO_CREDITS[slug]);

  if (!hasPhoto) {
    return (
      <div
        className={`grid place-items-center ${height}`}
        style={{ background: `hsl(${hue} 32% 88%)` }}
      >
        <span className={size === "hero" ? "text-8xl" : "text-6xl"} aria-hidden>
          {emoji}
        </span>
        <span className="sr-only">{name}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-leaf-soft ${height}`}>
      <Image
        src={plantPhotoSrc(slug)}
        alt={name}
        fill
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        sizes={
          size === "hero"
            ? "(max-width: 896px) 100vw, 896px"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        priority={size === "hero"}
      />
    </div>
  );
}
