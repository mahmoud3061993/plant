import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { CARE_TOOLS, getToolById } from "@/data/tools";

type ToolPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return CARE_TOOLS.filter((tool) => tool.id !== "library").map((tool) => ({
    slug: tool.id,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolById(slug);
  if (!tool) return { title: "أداة غير موجودة" };
  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPlaceholderPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolById(slug);
  if (!tool) notFound();
  if (tool.status === "ready") redirect(tool.href);
  return <ComingSoon tool={tool} />;
}
