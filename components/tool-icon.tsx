import type { CareToolId } from "@/data/types";
import type { ReactNode } from "react";

type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className ?? "size-7"}
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ToolIcon({ id, className }: { id: CareToolId | "search"; className?: string }) {
  const stroke = "#2f5340";
  const fill = "#3d6b4c";
  const earth = "#c4a574";

  switch (id) {
    case "soil":
      return (
        <Svg className={className}>
          <path d="M10 20c0-2 2.5-4 6-4h16c3.5 0 6 2 6 4v14c0 4-4 8-14 8s-14-4-14-8V20Z" fill={earth} />
          <path d="M12 20h24v3H12z" fill="#8b6b3d" />
          <path d="M18 12c2-6 10-6 12 0" stroke={fill} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="24" cy="9" r="2.2" fill={fill} />
        </Svg>
      );
    case "doctor":
      return (
        <Svg className={className}>
          <circle cx="24" cy="24" r="16" fill="#e4efe4" />
          <path d="M24 14v20M14 24h20" stroke={fill} strokeWidth="3.2" strokeLinecap="round" />
        </Svg>
      );
    case "library":
      return (
        <Svg className={className}>
          <path d="M24 8c6 8 14 10 14 22 0 8-6 12-14 16C16 42 10 38 10 30 10 18 18 16 24 8Z" fill={fill} />
        </Svg>
      );
    case "matcher":
      return (
        <Svg className={className}>
          <path d="M8 22 24 10l16 12v16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V22Z" fill="#e4efe4" stroke={stroke} strokeWidth="2" />
          <rect x="20" y="28" width="8" height="12" fill={fill} />
        </Svg>
      );
    case "watering":
      return (
        <Svg className={className}>
          <path d="M24 8c8 10 14 16 14 24a14 14 0 1 1-28 0c0-8 6-14 14-24Z" fill="#5b8aa8" />
        </Svg>
      );
    case "rescue":
      return (
        <Svg className={className}>
          <rect x="8" y="8" width="32" height="32" rx="8" fill="#f6e4dc" />
          <path d="M24 14v20M14 24h20" stroke="#9a4f3c" strokeWidth="3.2" strokeLinecap="round" />
        </Svg>
      );
    case "pests":
      return (
        <Svg className={className}>
          <ellipse cx="24" cy="24" rx="9" ry="12" fill={fill} />
          <path d="M15 16c-6-4-8 2-6 6M33 16c6-4 8 2 6 6M15 28c-6 2-6 8-2 9M33 28c6 2 6 8 2 9M24 12v-4" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </Svg>
      );
    case "location":
      return (
        <Svg className={className}>
          <path d="M24 8c7 0 12 5 12 12 0 10-12 20-12 20S12 30 12 20c0-7 5-12 12-12Z" fill={fill} />
          <circle cx="24" cy="20" r="4" fill="#fffdf8" />
        </Svg>
      );
    case "planner":
      return (
        <Svg className={className}>
          <rect x="10" y="10" width="28" height="30" rx="4" fill="#fffdf8" stroke={stroke} strokeWidth="2" />
          <path d="M16 8v6M32 8v6M14 22h20M14 28h14" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </Svg>
      );
    case "situations":
      return (
        <Svg className={className}>
          <circle cx="24" cy="24" r="14" fill="#e4efe4" />
          <path d="M24 18v8M24 32.5v.5" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
        </Svg>
      );
    case "care-cards":
      return (
        <Svg className={className}>
          <rect x="12" y="10" width="22" height="28" rx="3" fill="#fffdf8" stroke={stroke} strokeWidth="2" />
          <path d="M18 18h10M18 24h8" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </Svg>
      );
    default:
      return (
        <Svg className={className}>
          <circle cx="24" cy="24" r="10" fill={fill} />
        </Svg>
      );
  }
}
