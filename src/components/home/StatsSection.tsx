"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
}

function AnimatedCounter({ label, value, suffix = "" }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-bold text-white sm:text-4xl">
        {count.toLocaleString("en-US")}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-teal-100">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-teal-700 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6 lg:px-8"
      >
        <AnimatedCounter label="Active listings" value={120} suffix="+" />
        <AnimatedCounter label="Students joined" value={340} suffix="+" />
        <AnimatedCounter label="Items sold" value={85} suffix="+" />
        <AnimatedCounter label="Universities" value={3} />
      </motion.div>
    </section>
  );
}
