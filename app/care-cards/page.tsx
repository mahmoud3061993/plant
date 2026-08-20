import type { Metadata } from "next";
import { CareCardsTool } from "@/components/tools/care-cards-tool";

export const metadata: Metadata = {
  title: "بطاقة العناية",
  description: "بطاقة عناية عربية للطباعة أو الحفظ PDF.",
};

export default function CareCardsPage() {
  return <CareCardsTool />;
}
