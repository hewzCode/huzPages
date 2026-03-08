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
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

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
  const diagonal = Math.sqrt(width * width + height * height);

  // Mask needs to be large enough to cover corners (star shape needs extra size)
  const maskSize = useTransform(progress, range, [0, diagonal * 2.5]);
  const maskSizePixels = useMotionTemplate`${maskSize}px`;

  return (
    <div className={styles.section}>
      <motion.div
        className={styles.imageContainer}
        style={{ WebkitMaskSize: maskSizePixels, maskSize: maskSizePixels }}
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
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

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
  const diagonal = Math.sqrt(width * width + height * height);

  // Mask needs to be large enough to cover corners (star shape needs extra size)
  const maskSize = useTransform(progress, range, [0, diagonal * 2.5]);
  const maskSizePixels = useMotionTemplate\`\${maskSize}px\`;

  return (
    <div className={styles.section}>
      <motion.div
        className={styles.imageContainer}
        style={{ WebkitMaskSize: maskSizePixels, maskSize: maskSizePixels }}
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
  color: #444;
  font-size: 1.5rem;
  font-weight: 300;
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
  /* 4-pointed star mask - creates smooth inward reveal */
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0 Q55 45 100 50 Q55 55 50 100 Q45 55 0 50 Q45 45 50 0Z' fill='black'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0 Q55 45 100 50 Q55 55 50 100 Q45 55 0 50 Q45 45 50 0Z' fill='black'/%3E%3C/svg%3E");
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`,
};
