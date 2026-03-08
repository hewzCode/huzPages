"use client";

import { Suspense, lazy, useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { demoRegistry } from "@/lib/registry";

function DemoSkeleton() {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-muted-foreground">Loading demo...</div>
    </div>
  );
}

function DemoError({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-center">
      <p className="text-muted-foreground mb-2">Demo not found: {slug}</p>
      <p className="text-sm text-muted-foreground/60">
        Add a demo component to see it here
      </p>
    </div>
  );
}

export default function DemoClient({ slug }: { slug: string }) {
  const router = useRouter();
  const [key, setKey] = useState(0);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    // Only show header if NOT in iframe
    const inIframe = window.self !== window.top;
    setShowHeader(!inIframe);
  }, []);

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const DemoComponent = useMemo(() => {
    const loader = demoRegistry[slug];
    if (!loader) return null;
    return lazy(loader);
  }, [slug]);

  if (!DemoComponent) {
    return <DemoError slug={slug} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Floating Header - hidden in iframe preview */}
      {showHeader && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg border border-border bg-background/80 backdrop-blur px-2 py-1.5">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back
          </button>

          <div className="h-4 w-px bg-border" />

          <span className="text-sm font-medium px-2">
            {title}
          </span>

          <div className="h-4 w-px bg-border" />

          <button
            onClick={() => {
              // Force scroll reset on all elements
              window.scrollTo({ top: 0, behavior: "instant" });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              // Small delay to ensure scroll resets before remount
              setTimeout(() => setKey((prev) => prev + 1), 10);
            }}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>
              <RotateCcw className="h-4 w-4" />
            </span>
            Reset
          </button>
        </div>
      )}

      {/* Demo */}
      <Suspense fallback={<DemoSkeleton />}>
        <DemoComponent key={key} />
      </Suspense>
    </div>
  );
}
