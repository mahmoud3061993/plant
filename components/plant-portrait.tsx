import type { LeafStyle } from "@/data/types";

const LEAF_PATHS: Record<LeafStyle, string> = {
  heart:
    "M48 78C48 78 18 58 18 40C18 28 28 20 38 24C43 26 48 34 48 34C48 34 53 26 58 24C68 20 78 28 78 40C78 58 48 78 48 78Z",
  sword:
    "M48 18C50 18 54 46 54 62C54 72 51 80 48 80C45 80 42 72 42 62C42 46 46 18 48 18Z",
  split:
    "M48 82C48 82 22 70 18 48C16 34 28 22 40 28C44 30 47 38 48 38C49 38 52 30 56 28C68 22 80 34 78 48C74 70 48 82 48 82ZM36 48C36 48 42 44 48 50C54 44 60 48 60 48M32 60C32 60 42 56 48 64C54 56 64 60 64 60",
  oval:
    "M48 16C62 16 74 34 74 50C74 66 62 80 48 80C34 80 22 66 22 50C22 34 34 16 48 16Z",
  rosette:
    "M48 20C52 32 60 36 72 34C62 42 62 52 72 62C60 60 52 64 48 76C44 64 36 60 24 62C34 52 34 42 24 34C36 36 44 32 48 20Z",
  feather:
    "M48 16C70 28 76 50 48 82C20 50 26 28 48 16ZM48 28V72M34 40C40 38 44 42 48 42C52 42 56 38 62 40M32 54C40 50 44 56 48 56C52 56 56 50 64 54",
  round:
    "M32 36C32 24 42 18 48 18C54 18 64 24 64 36C70 38 76 46 72 56C68 66 56 72 48 72C40 72 28 66 24 56C20 46 26 38 32 36Z",
  arrow:
    "M48 14L74 46C74 46 62 48 58 62L58 80L38 80L38 62C34 48 22 46 22 46L48 14Z",
  fiddle:
    "M48 12C58 12 66 22 64 32C78 36 80 54 68 62C74 74 64 84 48 84C32 84 22 74 28 62C16 54 18 36 32 32C30 22 38 12 48 12Z",
  spiny:
    "M48 18L52 34L68 24L58 40L78 44L58 50L70 66L52 56L50 78L48 58L46 78L44 56L26 66L38 50L18 44L38 40L28 24L44 34L48 18Z",
};

export function PlantPortrait({
  name,
  hue,
  leafStyle,
  emoji,
  size = "card",
}: {
  name: string;
  hue: number;
  leafStyle: LeafStyle;
  emoji: string;
  size?: "card" | "hero";
}) {
  const height = size === "hero" ? "h-72 sm:h-80" : "h-44";
  const bg = `hsl(${hue} 28% 88%)`;
  const leaf = `hsl(${hue} 34% 38%)`;
  const leafLight = `hsl(${hue} 32% 52%)`;
  const pot = `hsl(${hue + 30} 22% 42%)`;

  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] ${height}`}
      style={{ background: bg }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 96 96" className="absolute inset-0 h-full w-full">
        <circle cx="72" cy="18" r="16" fill="white" opacity="0.28" />
        <path d={LEAF_PATHS[leafStyle]} fill={leaf} opacity="0.92" />
        <path d={LEAF_PATHS[leafStyle]} fill={leafLight} opacity="0.35" transform="translate(8 6) scale(0.86)" />
        <rect x="36" y="78" width="24" height="12" rx="3" fill={pot} />
      </svg>
      <div className="absolute bottom-3 right-3 rounded-full bg-white/70 px-3 py-1 text-sm backdrop-blur-sm">
        {emoji} {size === "hero" ? name : ""}
      </div>
    </div>
  );
}
