import { getAllDemoSlugs } from "@/lib/registry";
import DemoClient from "./client";

export function generateStaticParams() {
  return getAllDemoSlugs().map((slug) => ({ slug }));
}

interface DemoPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  return <DemoClient slug={slug} />;
}
