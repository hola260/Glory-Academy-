'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80',
    alt: 'University campus aerial view with students',
  },
  {
    image:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920&q=80',
    alt: 'Students walking on a tree-lined campus pathway',
  },
  {
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c8f1?w=1920&q=80',
    alt: 'Students in a modern science laboratory',
  },
  {
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80',
    alt: 'Teacher guiding students in a classroom',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      id="welcome"
      className="relative w-full h-[85vh] min-h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      {/* Foreground Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-brand-green-light font-semibold text-sm md:text-base tracking-widest uppercase mb-4">
            Excellence in Education
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl">
            Welcome to Our School
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            Empowering the next generation with world-class education,
            innovative skills, and the confidence to lead in a changing world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admissions/apply"
              className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-brand-green to-brand-teal rounded-xl hover:shadow-xl hover:shadow-brand-green/30 transition-all hover:-translate-y-1"
            >
              Apply Now
            </a>
            <a
              href="#about"
              className="px-8 py-4 text-base font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 transition-all"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all md:opacity-0 md:group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-all md:opacity-0 md:group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
