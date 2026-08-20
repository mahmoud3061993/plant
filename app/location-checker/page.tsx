import type { Metadata } from "next";
import { LocationTool } from "@/components/tools/location-tool";

export const metadata: Metadata = {
  title: "أحط النبات فين؟",
  description: "هل المكان مناسب للنبات حسب الضوء والتكييف والرطوبة.",
};

export default function LocationPage() {
  return <LocationTool />;
}
