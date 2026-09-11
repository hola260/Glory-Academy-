'use client';

import ScrollReveal from './ScrollReveal';
import {
  Rocket,
  Briefcase,
  RefreshCw,
  Lightbulb,
  Globe,
  Heart,
} from 'lucide-react';

const benefits = [
  {
    icon: Rocket,
    title: 'Seamless Advancement',
    description:
      'Smooth transitions between primary and secondary levels with a cohesive, progressive curriculum.',
  },
  {
    icon: Briefcase,
    title: 'Job Ready Skills',
    description:
      'Practical competencies and certifications that make graduates immediately employable in their chosen fields.',
  },
  {
    icon: RefreshCw,
    title: 'Stay Updated',
    description:
      'Curricula that evolve with industry trends, ensuring students learn the most relevant and current methodologies.',
  },
  {
    icon: Lightbulb,
    title: 'Entrepreneurship',
    description:
      'Fostering an entrepreneurial mindset through business skills training, mentorship, and real-world projects.',
  },
  {
    icon: Globe,
    title: 'Real World Solutions',
    description:
      'Project-based learning that addresses genuine community and industry challenges, building problem-solving expertise.',
  },
  {
    icon: Heart,
    title: 'Lifelong Learning',
    description:
      'Instilling a passion for continuous growth and self-improvement that extends far beyond graduation day.',
  },
];

export default function BenefitsGrid() {
  return (
    <section className="py-24 md:py-32 bg-navy-50">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-5">
            About Our School
          </h2>
          <p className="text-navy-600 text-lg max-w-2xl mx-auto">
            We provide an education that goes beyond textbooks — building
            character, competence, and confidence.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, i) => (
            <ScrollReveal key={benefit.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full border border-navy-100">
                <div className="w-12 h-12 rounded-xl bg-brand-mint flex items-center justify-center mb-5 group-hover:bg-brand-green group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 text-brand-green group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-navy-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy-900">
            Unlock a Future Full of Opportunities
          </h2>
        </ScrollReveal>
      </div>
    </section>
  );
}
