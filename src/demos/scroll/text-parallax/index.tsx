"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import Lenis from "lenis";
import styles from "./styles.module.css";

export default function TextParallax() {
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
        <p className={styles.spacerText}>Scroll down</p>
      </div>
      <HeroTypography />
      <Marquee />
      <StaggeredBlocks />
      <CascadeSection />
      <div className={styles.spacer} />
    </main>
  );
}

// --- Section 1: Layered text parallax — same direction, different speeds ---

const heroLines: {
  text: string;
  style: "normal" | "bold" | "outline";
  speed: number;
}[] = [
  { text: "We Create", style: "outline", speed: 80 },
  { text: "Digital", style: "bold", speed: 200 },
  { text: "Experiences", style: "outline", speed: 350 },
  { text: "That Move", style: "bold", speed: 500 },
];

function HeroTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);

  return (
    <div ref={ref} className={styles.heroContainer}>
      <div className={styles.heroSticky}>
        <motion.span className={styles.heroSmall} style={{ opacity }}>
          Volume 01
        </motion.span>
        {heroLines.map((line, i) => (
          <HeroLine key={i} line={line} progress={scrollYProgress} />
        ))}
        <motion.span className={styles.heroSmall} style={{ opacity }}>
          Kinetic Typography
        </motion.span>
      </div>
    </div>
  );
}

function HeroLine({
  line,
  progress,
}: {
  line: (typeof heroLines)[number];
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 1], [0, line.speed]);
  const opacity = useTransform(progress, [0, 0.6, 1], [1, 0.7, 0]);

  const cls =
    line.style === "bold"
      ? styles.heroWordBold
      : line.style === "outline"
        ? styles.heroWordOutline
        : styles.heroWord;

  return (
    <motion.div className={styles.heroLine} style={{ x, opacity }}>
      <span className={cls}>{line.text}</span>
    </motion.div>
  );
}

// --- Section 2: Horizontal marquee ---

const marqueeWords = [
  "Motion", "Typography", "Parallax", "Scroll", "Design",
  "Kinetic", "Fluid", "Driven", "Craft", "Detail",
];

function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div ref={ref} className={styles.marqueeSection}>
      <motion.div className={styles.marqueeRow} style={{ x: x1 }}>
        {[...marqueeWords, ...marqueeWords].map((word, i) => (
          <span key={i} className={styles.marqueeWord}>
            {word}
            <span className={styles.marqueeDot} />
          </span>
        ))}
      </motion.div>
      <motion.div className={styles.marqueeRow} style={{ x: x2 }}>
        {[...marqueeWords, ...marqueeWords].map((word, i) => (
          <span key={i} className={styles.marqueeWordOutline}>
            {word}
            <span className={styles.marqueeDot} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// --- Section 3: Four text blocks that appear together ---

const blocks = [
  { number: "001", text: "Scroll\nDriven", sub: "Motion tied to intent", position: "topLeft" as const },
  { number: "002", text: "Pixel\nPerfect", sub: "Every detail considered", position: "topRight" as const },
  { number: "003", text: "Fluid\nMotion", sub: "Seamless transitions", position: "bottomLeft" as const },
  { number: "004", text: "Bold\nChoices", sub: "Design with conviction", position: "bottomRight" as const },
];

function StaggeredBlocks() {
  const ref = useRef<HTMLDivElement>(null);
  // Track from when section enters viewport bottom to when it leaves top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={styles.blocksContainer}>
      <div className={styles.blocksSticky}>
        <div className={styles.blocksCross} />
        {blocks.map((block, i) => (
          <Block key={i} block={block} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function Block({
  block,
  index,
  progress,
}: {
  block: (typeof blocks)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // 180vh container, total range = 280vh, pins at ~0.36
  // Blocks appear as section scrolls in, fully visible by pin point
  const enter = 0.2 + index * 0.04;
  const settled = enter + 0.08;

  const isTop = block.position.includes("Top");
  const isLeft = block.position.includes("Left");
  const yFrom = isTop ? -60 : 60;
  const xFrom = isLeft ? -40 : 40;

  const y = useTransform(progress, [enter, settled, 0.78, 0.88], [yFrom, 0, 0, isTop ? -40 : 40]);
  const x = useTransform(progress, [enter, settled, 0.78, 0.88], [xFrom, 0, 0, isLeft ? -30 : 30]);
  const opacity = useTransform(progress, [enter, settled, 0.78, 0.88], [0, 1, 1, 0]);
  const scale = useTransform(progress, [enter, settled, 0.78, 0.88], [0.9, 1, 1, 0.95]);

  const posClass =
    block.position === "topLeft"
      ? styles.blockTopLeft
      : block.position === "topRight"
        ? styles.blockTopRight
        : block.position === "bottomLeft"
          ? styles.blockBottomLeft
          : styles.blockBottomRight;

  return (
    <motion.div
      className={`${styles.block} ${posClass}`}
      style={{ y, x, opacity, scale }}
    >
      <span className={styles.blockNumber}>{block.number}</span>
      <p className={styles.blockText}>
        {block.text.split("\n").map((line, i) => (
          <span key={i}>
            {i === 1 ? (
              <span className={styles.blockTextAccent}>{line}</span>
            ) : (
              line
            )}
            {i === 0 && <br />}
          </span>
        ))}
      </p>
      <p className={styles.blockSub}>{block.sub}</p>
    </motion.div>
  );
}

// --- Section 4: Words cascade in from alternating sides, then scatter ---

const cascadeWords = [
  { text: "Think", fromLeft: true },
  { text: "Design", fromLeft: false },
  { text: "Build", fromLeft: true },
  { text: "Ship", fromLeft: false },
  { text: "Repeat", fromLeft: true },
];

function CascadeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={styles.cascadeContainer}>
      <div className={styles.cascadeSticky}>
        {cascadeWords.map((word, i) => (
          <CascadeLine
            key={i}
            text={word.text}
            fromLeft={word.fromLeft}
            index={i}
            total={cascadeWords.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function CascadeLine({
  text,
  fromLeft,
  index,
  total,
  progress,
}: {
  text: string;
  fromLeft: boolean;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Phase 1: Slide in staggered (0.05 - 0.35)
  // Phase 2: Hold centered (0.35 - 0.55)
  // Phase 3: Scatter outward (0.55 - 0.85)
  const enterStart = 0.05 + index * 0.05;
  const enterEnd = enterStart + 0.1;
  const scatterStart = 0.55;
  const scatterEnd = 0.8;

  const slideFrom = fromLeft ? -120 : 120;
  const center = Math.floor(total / 2);
  const offset = index - center;
  const scatterX = (fromLeft ? -1 : 1) * (150 + Math.abs(offset) * 80);
  const scatterY = offset * 100;

  const x = useTransform(
    progress,
    [enterStart, enterEnd, scatterStart, scatterEnd],
    [slideFrom, 0, 0, scatterX]
  );
  const y = useTransform(
    progress,
    [enterStart, enterEnd, scatterStart, scatterEnd],
    [0, 0, 0, scatterY]
  );
  const opacity = useTransform(
    progress,
    [enterStart, enterEnd, scatterEnd - 0.05, scatterEnd],
    [0, 1, 1, 0]
  );
  const rotate = useTransform(
    progress,
    [scatterStart, scatterEnd],
    [0, (fromLeft ? -1 : 1) * (5 + index * 2)]
  );

  return (
    <motion.div
      className={`${styles.cascadeLine} ${fromLeft ? styles.cascadeLeft : styles.cascadeRight}`}
      style={{ x, y, opacity, rotate }}
    >
      <span className={index % 2 === 0 ? styles.cascadeText : styles.cascadeTextOutline}>
        {text}
      </span>
      <span className={styles.cascadeIndex}>0{index + 1}</span>
    </motion.div>
  );
}

export const code = {
  "index.tsx": `"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Lenis from "lenis";
import styles from "./styles.module.css";

export default function TextParallax() {
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
      <div className={styles.spacer}>
        <p className={styles.spacerText}>Scroll down</p>
      </div>
      <HeroTypography />
      <Marquee />
      <StaggeredBlocks />
      <CascadeSection />
      <div className={styles.spacer} />
    </main>
  );
}

const heroLines = [
  { text: "We Create", style: "outline", speed: 80 },
  { text: "Digital", style: "bold", speed: 200 },
  { text: "Experiences", style: "outline", speed: 350 },
  { text: "That Move", style: "bold", speed: 500 },
];

function HeroTypography() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0]);
  return (
    <div ref={ref} className={styles.heroContainer}>
      <div className={styles.heroSticky}>
        <motion.span className={styles.heroSmall} style={{ opacity }}>Volume 01</motion.span>
        {heroLines.map((line, i) => (
          <HeroLine key={i} line={line} progress={scrollYProgress} />
        ))}
        <motion.span className={styles.heroSmall} style={{ opacity }}>Kinetic Typography</motion.span>
      </div>
    </div>
  );
}

function HeroLine({ line, progress }) {
  const x = useTransform(progress, [0, 1], [0, line.speed]);
  const opacity = useTransform(progress, [0, 0.6, 1], [1, 0.7, 0]);
  const cls = line.style === "bold" ? styles.heroWordBold
    : line.style === "outline" ? styles.heroWordOutline
    : styles.heroWord;
  return (
    <motion.div className={styles.heroLine} style={{ x, opacity }}>
      <span className={cls}>{line.text}</span>
    </motion.div>
  );
}

const marqueeWords = [
  "Motion", "Typography", "Parallax", "Scroll", "Design",
  "Kinetic", "Fluid", "Driven", "Craft", "Detail",
];

function Marquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  return (
    <div ref={ref} className={styles.marqueeSection}>
      <motion.div className={styles.marqueeRow} style={{ x: x1 }}>
        {[...marqueeWords, ...marqueeWords].map((word, i) => (
          <span key={i} className={styles.marqueeWord}>
            {word}<span className={styles.marqueeDot} />
          </span>
        ))}
      </motion.div>
      <motion.div className={styles.marqueeRow} style={{ x: x2 }}>
        {[...marqueeWords, ...marqueeWords].map((word, i) => (
          <span key={i} className={styles.marqueeWordOutline}>
            {word}<span className={styles.marqueeDot} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const blocks = [
  { number: "001", text: "Scroll\\nDriven", sub: "Motion tied to intent", position: "topLeft" },
  { number: "002", text: "Pixel\\nPerfect", sub: "Every detail considered", position: "topRight" },
  { number: "003", text: "Fluid\\nMotion", sub: "Seamless transitions", position: "bottomLeft" },
  { number: "004", text: "Bold\\nChoices", sub: "Design with conviction", position: "bottomRight" },
];

function StaggeredBlocks() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div ref={ref} className={styles.blocksContainer}>
      <div className={styles.blocksSticky}>
        <div className={styles.blocksCross} />
        {blocks.map((block, i) => (
          <Block key={i} block={block} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function Block({ block, index, progress }) {
  const enter = 0.2 + index * 0.04;
  const settled = enter + 0.08;
  const isTop = block.position.includes("Top");
  const isLeft = block.position.includes("Left");
  const yFrom = isTop ? -60 : 60;
  const xFrom = isLeft ? -40 : 40;
  const y = useTransform(progress, [enter, settled, 0.78, 0.88], [yFrom, 0, 0, isTop ? -40 : 40]);
  const x = useTransform(progress, [enter, settled, 0.78, 0.88], [xFrom, 0, 0, isLeft ? -30 : 30]);
  const opacity = useTransform(progress, [enter, settled, 0.78, 0.88], [0, 1, 1, 0]);
  const scale = useTransform(progress, [enter, settled, 0.78, 0.88], [0.9, 1, 1, 0.95]);
  const posClass =
    block.position === "topLeft" ? styles.blockTopLeft
    : block.position === "topRight" ? styles.blockTopRight
    : block.position === "bottomLeft" ? styles.blockBottomLeft
    : styles.blockBottomRight;
  return (
    <motion.div className={\`\${styles.block} \${posClass}\`} style={{ y, x, opacity, scale }}>
      <span className={styles.blockNumber}>{block.number}</span>
      <p className={styles.blockText}>
        {block.text.split("\\\\n").map((line, i) => (
          <span key={i}>
            {i === 1 ? <span className={styles.blockTextAccent}>{line}</span> : line}
            {i === 0 && <br />}
          </span>
        ))}
      </p>
      <p className={styles.blockSub}>{block.sub}</p>
    </motion.div>
  );
}

const cascadeWords = [
  { text: "Think", fromLeft: true },
  { text: "Design", fromLeft: false },
  { text: "Build", fromLeft: true },
  { text: "Ship", fromLeft: false },
  { text: "Repeat", fromLeft: true },
];

function CascadeSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div ref={ref} className={styles.cascadeContainer}>
      <div className={styles.cascadeSticky}>
        {cascadeWords.map((word, i) => (
          <CascadeLine key={i} text={word.text} fromLeft={word.fromLeft}
            index={i} total={cascadeWords.length} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function CascadeLine({ text, fromLeft, index, total, progress }) {
  const enterStart = 0.05 + index * 0.05;
  const enterEnd = enterStart + 0.1;
  const scatterStart = 0.55;
  const scatterEnd = 0.8;
  const slideFrom = fromLeft ? -120 : 120;
  const center = Math.floor(total / 2);
  const offset = index - center;
  const scatterX = (fromLeft ? -1 : 1) * (150 + Math.abs(offset) * 80);
  const scatterY = offset * 100;

  const x = useTransform(progress, [enterStart, enterEnd, scatterStart, scatterEnd], [slideFrom, 0, 0, scatterX]);
  const y = useTransform(progress, [enterStart, enterEnd, scatterStart, scatterEnd], [0, 0, 0, scatterY]);
  const opacity = useTransform(progress, [enterStart, enterEnd, scatterEnd - 0.05, scatterEnd], [0, 1, 1, 0]);
  const rotate = useTransform(progress, [scatterStart, scatterEnd], [0, (fromLeft ? -1 : 1) * (5 + index * 2)]);

  return (
    <motion.div
      className={\`\${styles.cascadeLine} \${fromLeft ? styles.cascadeLeft : styles.cascadeRight}\`}
      style={{ x, y, opacity, rotate }}
    >
      <span className={index % 2 === 0 ? styles.cascadeText : styles.cascadeTextOutline}>
        {text}
      </span>
      <span className={styles.cascadeIndex}>0{index + 1}</span>
    </motion.div>
  );
}`,
  "styles.module.css": `.main {
  background: #0a0a0a;
  color: #fff;
  overflow: hidden;
}

.spacer {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spacerText {
  font-size: clamp(0.75rem, 1.2vw, 1rem);
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: #333;
}

.heroContainer { height: 150vh; }
.heroSticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.25rem;
  padding: 4rem 0 0 6vw;
  overflow: hidden;
}

.heroLine {
  display: flex;
  align-items: baseline;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.heroWord {
  font-size: clamp(2rem, 7vw, 6rem);
  font-weight: 100;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1;
  white-space: nowrap;
}

.heroWordBold {
  composes: heroWord;
  font-weight: 600;
}

.heroWordOutline {
  composes: heroWord;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
}

.heroSmall {
  font-size: clamp(0.625rem, 1vw, 0.875rem);
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: #555;
  margin: 1rem 0;
}

.marqueeSection {
  padding: 3rem 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  border-top: 1px solid #1a1a1a;
  border-bottom: 1px solid #1a1a1a;
}

.marqueeRow {
  display: flex;
  white-space: nowrap;
  will-change: transform;
  backface-visibility: hidden;
}

.marqueeWord {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2.5vw, 2rem);
  padding: 0 clamp(1rem, 2.5vw, 2rem);
  flex-shrink: 0;
}

.marqueeWordOutline {
  composes: marqueeWord;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
}

.marqueeDot {
  width: clamp(0.25rem, 0.5vw, 0.375rem);
  height: clamp(0.25rem, 0.5vw, 0.375rem);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.blocksContainer { height: 180vh; }
.blocksSticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding: clamp(2rem, 5vw, 4rem);
  gap: clamp(1rem, 3vw, 2rem);
  overflow: hidden;
}

.blocksCross {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.blocksCross::before,
.blocksCross::after {
  content: "";
  position: absolute;
  background: #1a1a1a;
}

.blocksCross::before {
  top: 50%;
  left: 10%;
  right: 10%;
  height: 1px;
}

.blocksCross::after {
  left: 50%;
  top: 10%;
  bottom: 10%;
  width: 1px;
}

.block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  will-change: transform, opacity;
  backface-visibility: hidden;
}
.blockTopLeft { align-items: flex-start; }
.blockTopRight { align-items: flex-end; text-align: right; }
.blockBottomLeft { align-items: flex-start; }
.blockBottomRight { align-items: flex-end; text-align: right; }

.blockNumber {
  font-size: clamp(0.625rem, 0.8vw, 0.75rem);
  letter-spacing: 0.3em;
  color: #333;
  margin-bottom: 0.5rem;
  font-variant-numeric: tabular-nums;
}

.blockText {
  font-size: clamp(1.5rem, 4vw, 3.5rem);
  font-weight: 200;
  line-height: 1.1;
  text-transform: uppercase;
}

.blockTextAccent {
  font-weight: 500;
  font-style: italic;
}

.blockSub {
  font-size: clamp(0.625rem, 1vw, 0.875rem);
  color: #555;
  margin-top: 0.75rem;
  letter-spacing: 0.1em;
  max-width: 25ch;
}

.cascadeContainer { height: 200vh; }
.cascadeSticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  overflow: hidden;
}

.cascadeLine {
  display: flex;
  align-items: baseline;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.cascadeLeft {
  align-self: flex-start;
  padding-left: 8vw;
}

.cascadeRight {
  align-self: flex-end;
  padding-right: 8vw;
  flex-direction: row-reverse;
}

.cascadeText {
  font-size: clamp(2rem, 7vw, 6rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.1;
  white-space: nowrap;
}

.cascadeTextOutline {
  font-size: clamp(2rem, 7vw, 6rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.1;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.3);
}

.cascadeIndex {
  font-size: clamp(0.625rem, 1vw, 0.75rem);
  color: #444;
  letter-spacing: 0.2em;
  font-variant-numeric: tabular-nums;
}`,
};
