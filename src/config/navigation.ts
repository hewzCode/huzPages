import {
  BookOpen,
  MousePointer2,
  ScrollText,
  Box,
  Menu,
  Sparkles,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  icon?: LucideIcon;
  items?: NavItem[];
  badge?: string;
}

export const sidebarNavigation: NavItem[] = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { title: "Introduction", href: "/tutorials/getting-started/introduction" },
      { title: "Gallery", href: "/tutorials" },
    ],
  },
  {
    title: "Scroll",
    icon: ScrollText,
    items: [
      { title: "Mask Section Transition", href: "/tutorials/scroll/mask-section-transition" },
      { title: "Background Image Parallax", href: "/tutorials/scroll/background-parallax" },
      { title: "Text Parallax", href: "/tutorials/scroll/text-parallax" },
      { title: "Sticky Footer", href: "/tutorials/scroll/sticky-footer" },
      { title: "Horizontal Scroll", href: "/tutorials/scroll/horizontal-scroll" },
      { title: "Zoom Parallax", href: "/tutorials/scroll/zoom-parallax" },
    ],
  },
  {
    title: "Mouse",
    icon: MousePointer2,
    items: [
      { title: "Mouse Image Distortion", href: "/tutorials/mouse/image-distortion" },
      { title: "Paint Reveal", href: "/tutorials/mouse/paint-reveal" },
      { title: "Blend Mode Cursor", href: "/tutorials/mouse/blend-cursor" },
      { title: "Magnetic Button", href: "/tutorials/mouse/magnetic-button" },
      { title: "Sticky Cursor", href: "/tutorials/mouse/sticky-cursor" },
    ],
  },
  {
    title: "3D",
    icon: Box,
    items: [
      { title: "Ripple Shader", href: "/tutorials/3d/ripple-shader" },
      { title: "Bulge Effect", href: "/tutorials/3d/bulge-effect" },
      { title: "3D Wave on Scroll", href: "/tutorials/3d/wave-scroll" },
      { title: "3D Glass Effect", href: "/tutorials/3d/glass-effect" },
      { title: "3D Earth", href: "/tutorials/3d/earth" },
    ],
  },
  {
    title: "Menu",
    icon: Menu,
    items: [
      { title: "Awwwards Side Menu", href: "/tutorials/menu/awwwards-side-menu" },
      { title: "Curved Menu", href: "/tutorials/menu/curved-menu" },
      { title: "Navigation Menu", href: "/tutorials/menu/navigation-menu" },
      { title: "Sliding Stairs Menu", href: "/tutorials/menu/sliding-stairs" },
    ],
  },
  {
    title: "Misc",
    icon: Sparkles,
    items: [
      { title: "Mask Entry", href: "/tutorials/misc/mask-entry" },
      { title: "Capsule Physics", href: "/tutorials/misc/capsule-physics" },
      { title: "Image Pixel Loading", href: "/tutorials/misc/pixel-loading" },
      { title: "Text Gradient Animation", href: "/tutorials/misc/text-gradient" },
    ],
  },
  {
    title: "Testing",
    icon: FlaskConical,
    items: [
      { title: "Sandbox", href: "/testing" },
    ],
  },
];
