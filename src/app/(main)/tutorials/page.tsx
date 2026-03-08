import Link from "next/link";
import { sidebarNavigation } from "@/config/navigation";

export default function TutorialsPage() {
  // Flatten all tutorials from navigation
  const allTutorials = sidebarNavigation.flatMap((category) =>
    (category.items || [])
      .filter((item) => item.href && !item.href.includes("getting-started"))
      .map((item) => ({
        ...item,
        category: category.title,
      }))
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all creative effects and animations
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allTutorials.map((tutorial) => (
          <Link
            key={tutorial.href}
            href={tutorial.href!}
            className="group overflow-hidden rounded-xl border border-border bg-muted/30 transition-all hover:border-muted-foreground/50 hover:bg-muted/50"
          >
            {/* Placeholder thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl opacity-20">
                  {getCategoryEmoji(tutorial.category)}
                </span>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="rounded-full bg-background/80 px-2 py-0.5 text-xs">
                  {tutorial.category}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium group-hover:text-accent transition-colors">
                {tutorial.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Click to view demo and code
              </p>
            </div>
          </Link>
        ))}
      </div>

      {allTutorials.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No tutorials yet. Add effects to see them here.
          </p>
        </div>
      )}
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    Scroll: "📜",
    Mouse: "🖱️",
    "3D": "🎲",
    Menu: "☰",
    Misc: "✨",
  };
  return emojis[category] || "✨";
}
