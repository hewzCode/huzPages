import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Play } from "lucide-react";
import { DemoPreview } from "@/components/tutorial/demo-preview";
import { CodeTabs, CodeBlock } from "@/components/tutorial/code-block";
import { demoRegistry } from "@/lib/registry";
import { sidebarNavigation } from "@/config/navigation";

export function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  const categories = ["getting-started", "scroll", "mouse", "3d", "menu", "misc"];
  const slugs = new Set<string>();

  // Collect slugs from navigation
  for (const section of sidebarNavigation) {
    if (section.items) {
      for (const item of section.items) {
        if (item.href?.startsWith("/tutorials/")) {
          const parts = item.href.split("/");
          if (parts.length === 4) {
            params.push({ category: parts[2], slug: parts[3] });
            slugs.add(parts[3]);
          }
        }
      }
    }
  }

  // Also add demo registry slugs to all categories for flexibility
  for (const slug of Object.keys(demoRegistry)) {
    for (const category of categories) {
      if (!params.some(p => p.category === category && p.slug === slug)) {
        params.push({ category, slug });
      }
    }
  }

  return params;
}

interface TutorialPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function TutorialPage({ params }: TutorialPageProps) {
  const { category, slug } = await params;

  // Format the title from the slug
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  // Check if demo exists in registry
  const hasDemo = slug in demoRegistry;

  // Get code if demo exists
  let demoCode: Record<string, string> | null = null;
  if (hasDemo) {
    try {
      const module = await demoRegistry[slug]();
      demoCode = module.code || null;
    } catch {
      demoCode = null;
    }
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Gallery
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {categoryTitle}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground">
          A creative web effect tutorial with live demo and code.
        </p>

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/demos/${slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            <Play className="h-4 w-4" />
            Live Demo
            <ExternalLink className="h-3 w-3" />
          </Link>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Github className="h-4 w-4" />
            Source Code
          </a>
        </div>
      </div>

      {/* Demo Preview */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Preview</h2>
        <DemoPreview slug={slug} height="400px" />
      </section>

      {/* Code Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Code</h2>
        {demoCode ? (
          <CodeTabs files={demoCode} />
        ) : (
          <CodeBlock
            code={`// Demo component for ${title}
// Add your implementation here

export default function ${slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")}() {
  return (
    <div>
      {/* Your effect code here */}
    </div>
  );
}`}
            filename="component.tsx"
          />
        )}
      </section>

      {/* Dependencies */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Dependencies</h2>
        <CodeBlock code="npm install framer-motion" filename="terminal" language="bash" />
      </section>
    </div>
  );
}
