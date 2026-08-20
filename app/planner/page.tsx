import type { Metadata } from "next";
import { PlannerTool } from "@/components/planner";

export const metadata: Metadata = {
  title: "مخطط العناية",
  description: "صفحات A4 للطباعة لمتابعة نباتاتك بقلم، مش لوحة أونلاين.",
};

export default function PlannerPage() {
  return <PlannerTool />;
}
