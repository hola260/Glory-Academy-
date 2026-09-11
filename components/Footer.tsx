'use client';

import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

const quickLinks = [
  { label: 'Welcome', href: '/#welcome' },
  { label: 'About Us', href: '/#about' },
  { label: 'Programs', href: '/#programs' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Leadership', href: '/#programs' },
  { label: 'Tuition Fee', href: '/admissions/tuition' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-green to-brand-teal flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold leading-tight text-sm">
                  Glory Primary &amp; Secondary
                </p>
                <p className="text-xs text-white/60 leading-tight">Academy</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Empowering students through academic excellence, technical
              innovation, and character development since 1994.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-green/20 hover:text-brand-green-light transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-brand-green-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 text-white/90">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-brand-green-light flex-shrink-0" />
                <span className="text-sm text-white/60">
                  123 Academy Road, Intango District, Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                <a
                  href="tel:+2341234567890"
                  className="text-sm text-white/60 hover:text-brand-green-light transition-colors"
                >
                  +234 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-green-light flex-shrink-0" />
                <a
                  href="mailto:info@gloryacademy.edu.ng"
                  className="text-sm text-white/60 hover:text-brand-green-light transition-colors"
                >
                  info@gloryacademy.edu.ng
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-6 text-white/90">
              Follow Us
            </h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Stay connected with Glory Academy. Follow us on social media for
              the latest updates, events, and student achievements.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-brand-green/50 transition-colors"
              />
              <button className="px-4 py-2.5 text-sm font-semibold text-white bg-brand-green rounded-lg hover:bg-brand-green-dark transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Glory Primary and Secondary Academy.
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
