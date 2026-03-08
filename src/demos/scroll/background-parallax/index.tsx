"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import styles from "./styles.module.css";

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80",
];

const sections = [
  {
    label: "Chapter I",
    title: "The\nSummit",
    desc: "Where earth meets sky and silence speaks louder than words.",
    layout: "topRight" as const,
  },
  {
    label: "Chapter II",
    title: "Golden\nHorizon",
    desc: "Light paints the landscape in fleeting moments of warmth.",
    layout: "bottomLeft" as const,
  },
  {
    label: "Chapter III",
    title: "Into the\nMist",
    desc: "Nature exhales and the world dissolves into soft edges.",
    layout: "center" as const,
  },
];

export default function BackgroundImageParallax() {
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
      <Intro />
      <Divider text="Scroll to let the background breathe — each image moves at its own pace, creating depth through motion." />
      {sections.map((section, i) => (
        <ParallaxSection
          key={i}
          src={images[i]}
          index={i}
          speed={[0.6, 0.4, 0.8][i]}
          {...section}
        />
      ))}
      <div className={styles.spacer} />
    </main>
  );
}

function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className={styles.intro}>
      <motion.div className={styles.introImageWrapper} style={{ y }}>
        <img
          src={images[0]}
          alt="Hero background"
          className={styles.image}
        />
      </motion.div>
      <motion.div className={styles.introOverlay} style={{ opacity }}>
        <span className={styles.introSubtitle}>Background</span>
        <h1 className={styles.introTitle}>Parallax</h1>
      </motion.div>
    </div>
  );
}

function Divider({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]);

  return (
    <motion.div ref={ref} className={styles.divider} style={{ opacity, y }}>
      <p className={styles.dividerText}>{text}</p>
    </motion.div>
  );
}

interface ParallaxSectionProps {
  src: string;
  index: number;
  speed: number;
  label: string;
  title: string;
  desc: string;
  layout: "topRight" | "bottomLeft" | "center";
}

function ParallaxSection({
  src,
  index,
  speed,
  label,
  title,
  desc,
  layout,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yRange = 10 + speed * 15;
  const y = useTransform(scrollYProgress, [0, 1], [`-${yRange}%`, `${yRange}%`]);

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [60, 0, 0, -60]
  );

  const layoutClass =
    layout === "topRight"
      ? styles.contentTopRight
      : layout === "bottomLeft"
        ? styles.contentBottomLeft
        : styles.contentCenter;

  return (
    <div ref={containerRef} className={styles.parallaxSection}>
      <div className={styles.parallaxBg}>
        <motion.div className={styles.parallaxImageWrapper} style={{ y }}>
          <img src={src} alt={title} className={styles.image} />
        </motion.div>
      </div>
      <motion.div
        className={`${styles.sectionContent} ${layoutClass}`}
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div>
          <p className={styles.sectionLabel}>{label}</p>
          <h2 className={styles.sectionTitle}>
            {title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.sectionDesc}>{desc}</p>
        </div>
        <span className={styles.sectionNumber}>0{index + 1}</span>
      </motion.div>
    </div>
  );
}

export const code = {
  "index.tsx": `"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import styles from "./styles.module.css";

const images = [
  "/images/mountain.jpg",
  "/images/horizon.jpg",
  "/images/forest.jpg",
];

const sections = [
  {
    label: "Chapter I",
    title: "The\\nSummit",
    desc: "Where earth meets sky and silence speaks louder than words.",
    layout: "topRight",
  },
  {
    label: "Chapter II",
    title: "Golden\\nHorizon",
    desc: "Light paints the landscape in fleeting moments of warmth.",
    layout: "bottomLeft",
  },
  {
    label: "Chapter III",
    title: "Into the\\nMist",
    desc: "Nature exhales and the world dissolves into soft edges.",
    layout: "center",
  },
];

export default function BackgroundImageParallax() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className={styles.main}>
      <Intro />
      <Divider text="Scroll to let the background breathe — each image moves at its own pace, creating depth through motion." />
      {sections.map((section, i) => (
        <ParallaxSection
          key={i}
          src={images[i]}
          index={i}
          speed={[0.6, 0.4, 0.8][i]}
          {...section}
        />
      ))}
      <div className={styles.spacer} />
    </main>
  );
}

function Intro() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className={styles.intro}>
      <motion.div className={styles.introImageWrapper} style={{ y }}>
        <img src={images[0]} alt="Hero background" className={styles.image} />
      </motion.div>
      <motion.div className={styles.introOverlay} style={{ opacity }}>
        <span className={styles.introSubtitle}>Background</span>
        <h1 className={styles.introTitle}>Parallax</h1>
      </motion.div>
    </div>
  );
}

function Divider({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40]);

  return (
    <motion.div ref={ref} className={styles.divider} style={{ opacity, y }}>
      <p className={styles.dividerText}>{text}</p>
    </motion.div>
  );
}

function ParallaxSection({ src, index, speed, label, title, desc, layout }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yRange = 10 + speed * 15;
  const y = useTransform(scrollYProgress, [0, 1], [\`-\${yRange}%\`, \`\${yRange}%\`]);

  const contentOpacity = useTransform(
    scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]
  );
  const contentY = useTransform(
    scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -60]
  );

  const layoutClass =
    layout === "topRight" ? styles.contentTopRight
    : layout === "bottomLeft" ? styles.contentBottomLeft
    : styles.contentCenter;

  return (
    <div ref={containerRef} className={styles.parallaxSection}>
      <div className={styles.parallaxBg}>
        <motion.div className={styles.parallaxImageWrapper} style={{ y }}>
          <img src={src} alt={title} className={styles.image} />
        </motion.div>
      </div>
      <motion.div
        className={\`\${styles.sectionContent} \${layoutClass}\`}
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div>
          <p className={styles.sectionLabel}>{label}</p>
          <h2 className={styles.sectionTitle}>
            {title.split("\\\\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < title.split("\\\\n").length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.sectionDesc}>{desc}</p>
        </div>
        <span className={styles.sectionNumber}>0{index + 1}</span>
      </motion.div>
    </div>
  );
}`,
  "styles.module.css": `.main {
  background: #0a0a0a;
  color: #fff;
}

.intro {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.introImageWrapper {
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  backface-visibility: hidden;
}

.introOverlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

.introTitle {
  font-size: clamp(2rem, 8vw, 6rem);
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 0.3em;
}

.introSubtitle {
  font-size: clamp(0.75rem, 1.5vw, 1rem);
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: #999;
}

.divider {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10vw;
}

.dividerText {
  font-size: clamp(1.5rem, 4vw, 3.5rem);
  font-weight: 300;
  line-height: 1.3;
  text-align: center;
  color: #666;
  max-width: 800px;
}

.parallaxSection {
  position: relative;
  height: 100vh;
  overflow: hidden;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}

.parallaxBg {
  position: fixed;
  top: -10vh;
  left: 0;
  width: 100%;
  height: 120vh;
}

.parallaxImageWrapper {
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  backface-visibility: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sectionContent {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 4rem;
  will-change: transform, opacity;
}

.contentTopRight {
  align-items: flex-start;
  justify-content: flex-end;
}

.contentBottomLeft {
  align-items: flex-end;
  justify-content: flex-start;
}

.contentCenter {
  align-items: center;
  justify-content: center;
}

.sectionLabel {
  font-size: clamp(0.625rem, 1vw, 0.75rem);
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: #aaa;
  margin-bottom: 0.75rem;
}

.sectionTitle {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 1.2;
}

.sectionDesc {
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  color: #ccc;
  max-width: 30ch;
  line-height: 1.6;
  margin-top: 0.75rem;
}

.sectionNumber {
  font-size: clamp(6rem, 15vw, 12rem);
  font-weight: 100;
  opacity: 0.15;
  line-height: 1;
  letter-spacing: -0.05em;
}

.spacer {
  height: 10vh;
}`,
};
