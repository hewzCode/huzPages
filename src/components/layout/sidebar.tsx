"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sidebarNavigation, type NavItem } from "@/config/navigation";

function NavSection({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const isActive = item.items?.some(
    (subItem) => subItem.href && pathname === subItem.href
  );

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-muted",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <span className="flex items-center gap-2">
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Simplified: no framer-motion animation to improve scroll performance */}
      {isOpen && item.items && (
        <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
          {item.items.map((subItem) => (
            <NavLink key={subItem.title} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.href && pathname === item.href;

  if (!item.href) return null;

  return (
    <Link
      href={item.href}
      className={cn(
        "block rounded-md px-3 py-1.5 text-sm transition-colors",
        isActive
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      {item.title}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 border-r border-border md:block">
      <div className="h-full overflow-y-auto py-4 px-3">
        <nav>
          {sidebarNavigation.map((item) => (
            <NavSection key={item.title} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-64 bg-background border-r border-border md:hidden"
          >
            <div className="h-full overflow-y-auto py-4 px-3 pt-16">
              <nav>
                {sidebarNavigation.map((item) => (
                  <NavSection key={item.title} item={item} />
                ))}
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
