import type { Metadata } from "next";
import { MatcherTool } from "@/components/tools/matcher-tool";

export const metadata: Metadata = {
  title: "إيه النبات المناسب عندي؟",
  description: "اختار نبات يناسب مكانك وخبرتك وطريقة ريّك.",
};

export default function MatcherPage() {
  return <MatcherTool />;
}
