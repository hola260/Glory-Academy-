'use client';

import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-brand-lavender">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <ScrollReveal direction="left">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[3px] bg-red-500 rounded-full" />
                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                  About Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                About INTANGO Technical Secondary School
              </h2>
              <p className="text-navy-600 text-lg leading-relaxed mb-6">
                INTANGO Technical Secondary School is a flagship institution
                under the Glory Primary and Secondary Academy umbrella. We
                combine rigorous academic standards with cutting-edge technical
                training, producing graduates who excel in both higher education
                and the professional world.
              </p>
              <p className="text-navy-600 leading-relaxed mb-8">
                Our state-of-the-art facilities, experienced faculty, and
                industry partnerships ensure that every student receives a
                holistic education that prepares them for the challenges of
                tomorrow. From software development to cybersecurity, our
                programs are designed to meet the evolving demands of the
                global economy.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-xl hover:shadow-lg hover:shadow-brand-blue/25 transition-all hover:-translate-y-0.5"
              >
                Discover Our Story
                <span className="text-lg">→</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Image */}
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
                  alt="INTANGO Technical Secondary School campus"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-gradient-to-br from-brand-green to-brand-teal opacity-20" />
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-dark opacity-15" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
