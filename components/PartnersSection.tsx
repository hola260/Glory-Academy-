'use client';

import ScrollReveal from './ScrollReveal';

const partners = [
  'Microsoft',
  'Google',
  'Cisco',
  'UNICEF',
  'UNESCO',
  'AWS',
  'CompTIA',
  'Oracle',
];

export default function PartnersSection() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
            Our Network
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Trusted By Leading Partners
          </h2>
          <p className="text-navy-600 text-lg max-w-xl mx-auto">
            We collaborate with world-class organizations to deliver
            industry-relevant education.
          </p>
        </ScrollReveal>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="mx-8 md:mx-12 flex-shrink-0 flex items-center justify-center h-20"
            >
              <span className="text-2xl md:text-3xl font-bold text-navy-200 hover:text-navy-500 transition-colors duration-300 select-none">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
