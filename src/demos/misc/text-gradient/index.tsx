"use client";

import { motion } from "framer-motion";
import styles from "./styles.module.css";

export default function TextGradientDemo() {
  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.text}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Creative Effects
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Animated gradient text effect
      </motion.p>
    </div>
  );
}

export const code = {
  "index.tsx": `"use client";

import { motion } from "framer-motion";
import styles from "./styles.module.css";

export default function TextGradientDemo() {
  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.text}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Creative Effects
      </motion.h1>
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Animated gradient text effect
      </motion.p>
    </div>
  );
}`,
  "styles.module.css": `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
}

.text {
  font-size: 4rem;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    #ff6b6b,
    #feca57,
    #48dbfb,
    #ff9ff3,
    #ff6b6b
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 3s linear infinite;
}

.subtitle {
  margin-top: 1rem;
  font-size: 1.25rem;
  color: #888;
}

@keyframes gradient {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}`,
};
