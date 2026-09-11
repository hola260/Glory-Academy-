'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    alt: 'Modern school campus building exterior',
  },
  {
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80',
    alt: 'Students collaborating in a science lab',
  },
  {
    src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
    alt: 'Students reading in the school library',
  },
  {
    src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
    alt: 'Students walking on campus pathway',
  },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-brand-green to-brand-teal">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <p className="text-white/70 font-semibold text-sm tracking-widest uppercase mb-3">
            Visual Tour
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Meet Our Gallery
          </h2>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            A glimpse into life at Glory Primary and Secondary Academy.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <button
                onClick={() => setLightbox(i)}
                className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer w-full"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
