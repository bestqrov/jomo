// AnimatedCounter: Animated number counter for KPIs
import React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export function AnimatedCounter({ value, isMoney = false }: { value: number, isMoney?: boolean }) {
  const [display, setDisplay] = useState(0);
  const controls = useAnimation();
  const ref = useRef<number>(0);

  useEffect(() => {
    controls.start({
      count: value,
      transition: { duration: 1.2, ease: "easeOut" },
    });
  }, [value, controls]);

  useEffect(() => {
    controls.set({ count: 0 });
    controls.start({
      count: value,
      transition: { duration: 1.2, ease: "easeOut" },
    });
  }, [value]);

  return (
    <motion.span
      animate={controls}
      initial={{ count: 0 }}
      onUpdate={(latest) => setDisplay(Math.round(latest.count))}
    >
      {isMoney ? "$" : ""}{display.toLocaleString()}
    </motion.span>
  );
}
