'use client';

import ScrollReveal from './ScrollReveal';

const newsItems = [
  {
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    alt: 'Students presenting at a science exhibition',
    date: 'Aug 15, 2026',
    title: 'Annual Science Exhibition Showcases Student Innovation',
    category: 'Events',
  },
  {
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    alt: 'Students at graduation ceremony in caps and gowns',
    date: 'Jul 28, 2026',
    title: 'Class of 2026 Graduation Ceremony Highlights',
    category: 'Milestones',
  },
  {
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    alt: 'Students in a hands-on cybersecurity workshop',
    date: 'Jul 10, 2026',
    title: 'Cybersecurity Workshop: Preparing Students for the Digital Age',
    category: 'Workshops',
  },
  {
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    alt: 'Students reading and studying in the school library',
    date: 'Jun 22, 2026',
    title: 'New Library Wing Opens with State-of-the-Art Resources',
    category: 'Campus',
  },
];

export default function NewsSection() {
  return (
    <section className="py-24 md:py-32 bg-brand-mint">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
            Stay Informed
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-5">
            Campus News &amp; Events
          </h2>
          <p className="text-navy-600 text-lg max-w-2xl mx-auto">
            Stay up to date with the latest happenings, achievements, and
            upcoming events at Glory Academy.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-brand-green rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-navy-400 text-xs font-medium mb-2">
                    {item.date}
                  </p>
                  <h3 className="text-base font-bold text-navy-900 leading-snug mb-3 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>
                  <a
                    href="#"
                    className="mt-auto text-sm font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
