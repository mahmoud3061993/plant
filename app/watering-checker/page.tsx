import type { Metadata } from "next";
import { WateringTool } from "@/components/tools/watering-tool";

export const metadata: Metadata = {
  title: "أسقي دلوقتي ولا لأ؟",
  description: "قرار الري حسب التربة والنبات، مش حسب عدد الأيام لوحده.",
};

export default function WateringPage() {
  return <WateringTool />;
}
