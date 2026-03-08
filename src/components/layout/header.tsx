"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500" />
          <span className="font-semibold tracking-tight">HuzNotes</span>
        </Link>

        <nav className="ml-auto flex items-center space-x-4">
          <Link
            href="/tutorials"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Gallery
          </Link>
          <a
            href="https://github.com/hewzCode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>
              <Github className="h-5 w-5" />
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
