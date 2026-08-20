import type { Metadata } from "next";
import { SoilTool } from "@/components/tools/soil-tool";

export const metadata: Metadata = {
  title: "خلطة التربة",
  description: "أفضل خلطة لنباتك، أو أقرب خلطة آمنة من المواد اللي عندك.",
};

export default function SoilPage() {
  return <SoilTool />;
}
