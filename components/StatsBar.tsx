'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const stats = [
  { value: 98, suffix: '%', label: 'Pass Rate' },
  { value: 30, suffix: '+', label: 'Years of Excellence' },
  { value: 15, suffix: ':1', label: 'Teacher Ratio' },
  { value: 500, suffix: '+', label: 'Students' },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, inView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-gradient-to-r from-navy-900 via-brand-blue to-navy-800 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/70 text-sm md:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
