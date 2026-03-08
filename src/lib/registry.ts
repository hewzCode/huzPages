import { ComponentType } from "react";

export interface DemoModule {
  default: ComponentType;
  code?: Record<string, string>;
}

export const demoRegistry: Record<string, () => Promise<DemoModule>> = {
  "text-gradient": () => import("@/demos/misc/text-gradient"),
  "mask-section-transition": () => import("@/demos/scroll/mask-section-transition"),
  "background-parallax": () => import("@/demos/scroll/background-parallax"),
  "text-parallax": () => import("@/demos/scroll/text-parallax"),
};

export function getDemoComponent(slug: string) {
  return demoRegistry[slug];
}

export function getAllDemoSlugs(): string[] {
  return Object.keys(demoRegistry);
}
