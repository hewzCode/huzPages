import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />

            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              Welcome to my notes{" "}
              <span className="inline-block h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 align-middle" />
            </h1>

            <p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              A collection of creative web effects, animations, and UI experiments.
              Explore live demos and grab the code for your projects.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tutorials"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                suppressHydrationWarning
              >
                Browse Gallery
                <span suppressHydrationWarning>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <a
                href="https://github.com/hewzCode"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
                suppressHydrationWarning
              >
                <span suppressHydrationWarning>
                  <Github className="h-4 w-4" />
                </span>
                GitHub
                <span suppressHydrationWarning>
                  <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-16">
          <h2 className="mb-8 text-center text-2xl font-semibold">Categories</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-muted-foreground/50 hover:bg-muted/50"
              >
                <div className="mb-3 text-2xl">{category.icon}</div>
                <h3 className="mb-2 font-semibold group-hover:text-accent">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    title: "Scroll Effects",
    icon: "📜",
    description: "Parallax, mask transitions, horizontal scroll, and more scroll-based animations.",
    href: "/tutorials?category=scroll",
  },
  {
    title: "Mouse Interactions",
    icon: "🖱️",
    description: "Magnetic buttons, cursor effects, hover animations, and mouse-driven visuals.",
    href: "/tutorials?category=mouse",
  },
  {
    title: "3D Effects",
    icon: "🎲",
    description: "Three.js shaders, WebGL experiments, and immersive 3D experiences.",
    href: "/tutorials?category=3d",
  },
  {
    title: "Menu Animations",
    icon: "☰",
    description: "Creative navigation menus, slide effects, and animated hamburger icons.",
    href: "/tutorials?category=menu",
  },
  {
    title: "Miscellaneous",
    icon: "✨",
    description: "Text effects, gradients, loading animations, and unique UI experiments.",
    href: "/tutorials?category=misc",
  },
  {
    title: "Getting Started",
    icon: "📚",
    description: "Learn how to use this site and get started with creative web development.",
    href: "/tutorials/getting-started/introduction",
  },
  {
    title: "Testing",
    icon: "🧪",
    description: "Sandbox for experimenting with new effects and ideas.",
    href: "/testing",
  },
];
