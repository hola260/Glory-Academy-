'use client';

import ScrollReveal from './ScrollReveal';
import { BookOpen, Brain, Wrench } from 'lucide-react';

const pillars = [
  {
    icon: BookOpen,
    title: 'Academics & Logic',
    description:
      'Building strong foundations in critical thinking, mathematical reasoning, and analytical skills that prepare students for academic excellence.',
  },
  {
    icon: Brain,
    title: 'Knowledge Acquisition',
    description:
      'Fostering a deep love for learning through comprehensive curricula that nurture intellectual curiosity and academic mastery across all disciplines.',
  },
  {
    icon: Wrench,
    title: 'Skills Acquisition',
    description:
      'Equipping students with practical, hands-on technical and life skills that bridge the gap between theoretical knowledge and real-world application.',
  },
];

export default function PillarsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient Band Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-teal to-brand-blue" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-green-light font-semibold text-sm tracking-widest uppercase mb-3">
            Our Foundation
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Our Educational Pillars
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Three core pillars guide everything we do — building well-rounded
            individuals ready for the future.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-green to-brand-teal flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-navy-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
