"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Lenis from "lenis";
import styles from "./styles.module.css";

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&q=80",
];

export default function MaskSectionTransition() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.spacer}>
        <p>Scroll</p>
      </div>
      <MaskSections />
      <div className={styles.spacer} />
    </main>
  );
}

function useDimension() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const updateDimension = () => {
    const { innerWidth, innerHeight } = window;
    setDimension({ width: innerWidth, height: innerHeight });
  };

  useEffect(() => {
    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);

  return dimension;
}

function MaskSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        <Section src={images[0]} progress={scrollYProgress} range={[0, 0.33]} />
        <Section src={images[1]} progress={scrollYProgress} range={[0.33, 0.66]} />
        <Section src={images[2]} progress={scrollYProgress} range={[0.66, 1]} />
      </div>
    </div>
  );
}

interface SectionProps {
  src: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Section({ src, progress, range }: SectionProps) {
  const { width, height } = useDimension();

  const maskSize = useTransform(progress, range, [0, 1.25 * width + 1.25 * height]);
  const maskSizePixels = useMotionTemplate`${maskSize}px`;

  return (
    <div className={styles.section}>
      <motion.div
        className={styles.imageContainer}
        style={{ WebkitMaskSize: maskSizePixels }}
      >
        <img src={src} alt="section" className={styles.image} />
      </motion.div>
    </div>
  );
}

export const code = {
  "index.tsx": `"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Lenis from "lenis";
import styles from "./styles.module.css";

const images = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
];

export default function MaskSectionTransition() {
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.spacer}>
        <p>Scroll</p>
      </div>
      <MaskSections />
      <div className={styles.spacer} />
    </main>
  );
}

function useDimension() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimension = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimension();
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);

  return dimension;
}

function MaskSections() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        <Section src={images[0]} progress={scrollYProgress} range={[0, 0.33]} />
        <Section src={images[1]} progress={scrollYProgress} range={[0.33, 0.66]} />
        <Section src={images[2]} progress={scrollYProgress} range={[0.66, 1]} />
      </div>
    </div>
  );
}

function Section({ src, progress, range }) {
  const { width, height } = useDimension();

  // Mask grows from 0 to 125% of viewport diagonal
  const maskSize = useTransform(progress, range, [0, 1.25 * width + 1.25 * height]);
  const maskSizePixels = useMotionTemplate\`\${maskSize}px\`;

  return (
    <div className={styles.section}>
      <motion.div
        className={styles.imageContainer}
        style={{ WebkitMaskSize: maskSizePixels }}
      >
        <img src={src} alt="section" className={styles.image} />
      </motion.div>
    </div>
  );
}`,
  "styles.module.css": `.main {
  background: #0a0a0a;
}

.spacer {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.5rem;
}

.container {
  height: 300vh;
}

.sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.imageContainer {
  width: 100%;
  height: 100%;
  -webkit-mask-image: url("data:image/svg+xml,...");
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`,
};
