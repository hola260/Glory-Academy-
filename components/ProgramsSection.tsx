'use client';

import ScrollReveal from './ScrollReveal';
import { Code, Shield, Laptop } from 'lucide-react';

const programs = [
  {
    icon: Code,
    title: 'Software Development',
    description:
      'Learn programming languages, software architecture, and development methodologies to build innovative digital solutions from concept to deployment.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Laptop,
    title: 'DSE Skills',
    description:
      'Develop essential digital skills and electronic systems knowledge for the modern workplace, including hardware troubleshooting and systems integration.',
    color: 'from-brand-teal to-brand-green',
  },
  {
    icon: Shield,
    title: 'Cyber Security Skills',
    description:
      'Master the art of protecting digital assets and networks through ethical hacking, threat analysis, and robust security protocols and best practices.',
    color: 'from-brand-blue to-brand-blue-dark',
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="py-24 md:py-32 bg-brand-mint">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-5">
            Featured Learning Programs
          </h2>
          <p className="text-navy-600 text-lg max-w-2xl mx-auto">
            Specialized programs designed to prepare students for the demands
            of the 21st-century workforce.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <ScrollReveal key={program.title} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full border border-navy-100">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-navy-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
