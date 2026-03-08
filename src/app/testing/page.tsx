import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TestingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Link
        href="/"
        className="fixed top-4 left-4 inline-flex items-center gap-2 rounded-lg border border-border bg-background/80 backdrop-blur px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Empty dark sandbox - add your test components here */}
    </div>
  );
}
