import type { Metadata } from "next";
import { DoctorTool } from "@/components/tools/doctor-tool";

export const metadata: Metadata = {
  title: "زرعتي فيها مشكلة",
  description: "تشخيص تقريبي لمشاكل النباتات المنزلية حسب النبات والأعراض.",
};

export default function DoctorPage() {
  return <DoctorTool />;
}
