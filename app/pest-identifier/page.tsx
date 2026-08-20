import type { Metadata } from "next";
import { PestTool } from "@/components/tools/pest-tool";

export const metadata: Metadata = {
  title: "إيه الحشرة دي؟",
  description: "تحديد الآفات الشائعة من العلامات الظاهرة وخطوات آمنة.",
};

export default function PestPage() {
  return <PestTool />;
}
