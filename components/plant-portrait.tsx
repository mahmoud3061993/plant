import Image from "next/image";
import { plantPhotoSrc } from "@/data/photo-credits";

export function PlantPortrait({
  slug,
  name,
  size = "card",
}: {
  slug: string;
  name: string;
  size?: "card" | "hero";
}) {
  const height = size === "hero" ? "h-72 sm:h-96" : "h-48";

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
