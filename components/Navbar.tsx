'use client';

import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Welcome', href: '/#welcome' },
  { label: 'About Us', href: '/#about' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Home', href: '/' },
  { label: 'Leadership', href: '/#programs' },
  { label: 'Tuition Fee', href: '/admissions/tuition' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18 lg:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-navy-900 leading-tight">
              Glory Primary &amp;
            </p>
            <p className="text-xs text-navy-600 leading-tight">
              Secondary Academy
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-navy-700 hover:text-brand-blue rounded-lg hover:bg-navy-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="px-4 py-2 text-sm font-semibold text-navy-800 border border-navy-200 rounded-lg hover:border-navy-400 hover:bg-navy-50 transition-all"
          >
            Login
          </a>
          <a
            href="/admissions/apply"
            className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-lg hover:shadow-lg hover:shadow-brand-blue/25 transition-all hover:-translate-y-0.5"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-navy-50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-navy-800" />
          ) : (
            <Menu className="w-6 h-6 text-navy-800" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-blue to-brand-blue-dark flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-navy-900 text-sm">
                      Glory Academy
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg hover:bg-navy-50"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-navy-800" />
                  </button>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-base font-medium text-navy-700 hover:text-brand-blue rounded-lg hover:bg-brand-mint transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-navy-100">
                  <a
                    href="#"
                    className="text-center px-4 py-3 text-sm font-semibold text-navy-800 border border-navy-200 rounded-lg hover:bg-navy-50 transition-colors"
                  >
                    Login
                  </a>
                  <a
                    href="/admissions/apply"
                    className="text-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-lg hover:shadow-lg transition-all"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
