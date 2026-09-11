'use client';

import ScrollReveal from '@/components/ScrollReveal';
import {
  FileText,
  CheckCircle,
  Send,
  GraduationCap,
  Calendar,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

const processSteps = [
  {
    icon: FileText,
    step: '01',
    title: 'Submit Application',
    description:
      'Complete the online application form with your personal details, academic history, and program preference.',
  },
  {
    icon: CheckCircle,
    step: '02',
    title: 'Review & Screening',
    description:
      'Our admissions team reviews your application and supporting documents within 5–7 business days.',
  },
  {
    icon: Send,
    step: '03',
    title: 'Entrance Assessment',
    description:
      'Qualified candidates are invited for an entrance examination and interview at our campus.',
  },
  {
    icon: GraduationCap,
    step: '04',
    title: 'Admission Decision',
    description:
      'Successful candidates receive an offer letter with enrollment instructions and orientation schedule.',
  },
];

const requirements = [
  'Completed application form',
  'Recent passport-sized photograph',
  'Birth certificate or age declaration',
  'Previous school report cards (last 2 years)',
  'Completed medical form',
  'Parent/guardian identification document',
  'Entrance examination fee receipt',
];

const keyDates = [
  { label: 'Application Opens', date: 'January 15, 2026' },
  { label: 'Application Deadline', date: 'March 30, 2026' },
  { label: 'Entrance Examination', date: 'April 12, 2026' },
  { label: 'Results Released', date: 'April 25, 2026' },
  { label: 'Resumption Date', date: 'September 8, 2026' },
];

export default function AdmissionsContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-navy-900 via-brand-blue to-navy-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c8f1?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-brand-green-light font-semibold text-sm tracking-widest uppercase mb-4">
              Join Our Community
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Admissions
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Begin your journey at Glory Primary and Secondary Academy.
              We welcome students who are eager to learn, grow, and lead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admissions/apply"
                className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-brand-green to-brand-teal rounded-xl hover:shadow-xl hover:shadow-brand-green/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Launch Application Portal
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/admissions/tuition"
                className="px-8 py-4 text-base font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <DollarSign className="w-5 h-5" />
                View Tuition Fees Structure
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-24 md:py-32 bg-brand-mint">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
              How to Apply
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-5">
              Application Process
            </h2>
            <p className="text-navy-600 text-lg max-w-2xl mx-auto">
              Our straightforward admissions process is designed to identify
              students who will thrive in our academic environment.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full border border-navy-100 relative">
                  <span className="absolute top-6 right-6 text-5xl font-bold text-navy-100 group-hover:text-brand-green/20 transition-colors">
                    {step.step}
                  </span>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-green to-brand-teal flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-navy-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements & Key Dates */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Requirements */}
            <ScrollReveal direction="left">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[3px] bg-brand-green rounded-full" />
                  <span className="text-brand-green font-semibold text-sm uppercase tracking-wider">
                    Requirements
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  What You&apos;ll Need
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed mb-8">
                  Please prepare the following documents before starting your
                  application. All documents can be uploaded digitally through
                  the application portal.
                </p>
                <ul className="space-y-4">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-navy-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Key Dates */}
            <ScrollReveal direction="right">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[3px] bg-brand-blue rounded-full" />
                  <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">
                    Important Dates
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  Key Dates for 2026/2027
                </h2>
                <p className="text-navy-600 text-lg leading-relaxed mb-8">
                  Mark these important dates on your calendar to ensure you
                  don&apos;t miss any deadlines.
                </p>
                <div className="space-y-4">
                  {keyDates.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-xl bg-brand-mint border border-navy-100"
                    >
                      <Calendar className="w-5 h-5 text-brand-blue flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-navy-900 text-sm">
                          {item.label}
                        </p>
                      </div>
                      <span className="text-navy-600 text-sm font-medium">
                        {item.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-navy-900 via-brand-blue to-navy-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              Applications for the 2026/2027 academic session are now open.
              Take the first step toward an exceptional education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/admissions/apply"
                className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-brand-green to-brand-teal rounded-xl hover:shadow-xl hover:shadow-brand-green/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Launch Application Portal
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/admissions/tuition"
                className="px-8 py-4 text-base font-semibold text-white border-2 border-white/40 rounded-xl hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <DollarSign className="w-5 h-5" />
                View Tuition Fees Structure
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
