import type { Metadata } from "next";
import { EmergencyTool } from "@/components/tools/emergency-tool";

export const metadata: Metadata = {
  title: "أنقذ زرعتي",
  description: "خطوات سريعة لإنقاذ نبات منزلي في حالة سيئة.",
};

export default function EmergencyPage() {
  return <EmergencyTool />;
}
