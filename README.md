# HuzNotes - Creative Web Effects

A personal site to document creative web effects, animations, and UI experiments.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home page
│   └── (main)/            # Pages with sidebar
│       ├── tutorials/     # Gallery and tutorial pages
│       └── demos/         # Fullscreen demo pages
│
├── components/
│   ├── layout/            # Header, Sidebar
│   └── tutorial/          # DemoPreview, CodeBlock
│
├── demos/                  # Live demo components
│   ├── scroll/
│   ├── mouse/
│   ├── 3d/
│   ├── menu/
│   └── misc/
│
├── config/
│   └── navigation.ts      # Sidebar navigation config
│
└── lib/
    ├── utils.ts           # Utility functions
    └── registry.ts        # Demo component registry
```

## Adding a New Effect

### Step 1: Create the demo component

Create a folder in `src/demos/[category]/[effect-name]/`:

```
src/demos/mouse/magnetic-button/
├── index.tsx          # Demo component
├── styles.module.css  # Scoped styles
```

**index.tsx:**
```tsx
"use client";

import { motion } from "framer-motion";
import styles from "./styles.module.css";

export default function MagneticButtonDemo() {
  return (
    <div className={styles.container}>
      {/* Your effect code */}
    </div>
  );
}

// Export code for display on tutorial page
export const code = {
  "index.tsx": `// Your component code as a string`,
  "styles.module.css": `/* Your styles as a string */`,
};
```

### Step 2: Register the demo

Add to `src/lib/registry.ts`:

```ts
export const demoRegistry: Record<string, () => Promise<DemoModule>> = {
  "text-gradient": () => import("@/demos/misc/text-gradient"),
  "magnetic-button": () => import("@/demos/mouse/magnetic-button"), // Add this
};
```

### Step 3: Add to navigation (optional)

Add to `src/config/navigation.ts` to show in sidebar:

```ts
{
  title: "Mouse",
  icon: MousePointer2,
  items: [
    { title: "Magnetic Button", href: "/tutorials/mouse/magnetic-button" },
    // ...
  ],
},
```

### Step 4: View it

Visit: `http://localhost:3000/tutorials/mouse/magnetic-button`

## Converting HTML/CSS/JS to React

When you have source code from a tutorial (HTML/CSS/JS), here's the pattern:

### Original HTML/CSS/JS:
```html
<div class="container">
  <h1 class="gradient-text">Hello</h1>
</div>

<style>
.gradient-text {
  background: linear-gradient(90deg, red, blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
```

### Convert to React:

**index.tsx:**
```tsx
"use client";

import styles from "./styles.module.css";

export default function GradientTextDemo() {
  return (
    <div className={styles.container}>
      <h1 className={styles.gradientText}>Hello</h1>
    </div>
  );
}

export const code = {
  "index.tsx": `"use client";
// ... full code here`,
  "styles.module.css": `.gradientText { ... }`,
};
```

**styles.module.css:**
```css
.gradientText {
  background: linear-gradient(90deg, red, blue);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Key Differences from Regular CSS

| CSS | CSS Modules |
|-----|-------------|
| `.my-class` | `.myClass` (camelCase) |
| `class="my-class"` | `className={styles.myClass}` |
| Global styles | Scoped to component |

## Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Future Additions

When ready to add:
- **Three.js / React Three Fiber** - For 3D effects
- **GSAP** - Advanced animations
- **Lenis** - Smooth scroll
- **MDX** - Rich content with embedded demos

## Deployment

```bash
npm run build
```

Deploy to Vercel, Netlify, or any Node.js host.
