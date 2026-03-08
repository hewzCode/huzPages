"use client";

import { Suspense, lazy, useMemo, useState } from "react";
import { ExternalLink, Maximize2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { demoRegistry } from "@/lib/registry";

interface DemoPreviewProps {
  slug: string;
  height?: string;
}

function DemoSkeleton() {
  return (
    <div className="flex items-center justify-center h-full bg-muted animate-pulse">
      <div className="text-muted-foreground">Loading demo...</div>
    </div>
  );
}

function DemoError({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-muted/50 p-8 text-center">
      <p className="text-muted-foreground mb-2">Demo not found: {slug}</p>
      <p className="text-sm text-muted-foreground/60">
        Add a demo component to see it here
      </p>
    </div>
  );
}

export function DemoPreview({ slug, height = "400px" }: DemoPreviewProps) {
  const [key, setKey] = useState(0);

  const DemoComponent = useMemo(() => {
    const loader = demoRegistry[slug];
    if (!loader) return null;
    return lazy(loader);
  }, [slug]);

  if (!DemoComponent) {
    return (
      <div className="overflow-hidden rounded-xl border border-border" style={{ height }}>
        <DemoError slug={slug} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-2">
        <span className="text-sm font-medium">Preview</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setKey((k) => k + 1)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          <Link
            href={`/demos/${slug}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Maximize2 className="h-3 w-3" />
            Fullscreen
          </Link>
        </div>
      </div>

      {/* Demo */}
      <div style={{ height }} className="overflow-auto relative">
        <Suspense fallback={<DemoSkeleton />}>
          <DemoComponent key={key} />
        </Suspense>
      </div>

      {/* Hint for scroll demos */}
      <div className="border-t border-border bg-muted/30 px-3 py-2 text-center">
        <p className="text-xs text-muted-foreground">
          Scroll inside the preview or{" "}
          <Link href={`/demos/${slug}`} className="text-accent hover:underline">
            open fullscreen
          </Link>{" "}
          for the best experience
        </p>
      </div>
    </div>
  );
}
