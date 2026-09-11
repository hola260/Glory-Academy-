'use client';

import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, HelpCircle } from 'lucide-react';

const primaryFees = [
  { item: 'Tuition Fee', amount: '₦120,000' },
  { item: 'Development Levy', amount: '₦25,000' },
  { item: 'Library Fee', amount: '₦10,000' },
  { item: 'Laboratory Fee', amount: '₦15,000' },
  { item: 'ICT Fee', amount: '₦10,000' },
  { item: 'Sports & Activities', amount: '₦8,000' },
  { item: 'Medical Fee', amount: '₦5,000' },
  { item: 'Uniform & Stationery', amount: '₦20,000' },
];

const secondaryFees = [
  { item: 'Tuition Fee', amount: '₦180,000' },
  { item: 'Development Levy', amount: '₦35,000' },
  { item: 'Library Fee', amount: '₦12,000' },
  { item: 'Laboratory Fee', amount: '₦25,000' },
  { item: 'ICT Fee', amount: '₦15,000' },
  { item: 'Sports & Activities', amount: '₦10,000' },
  { item: 'Medical Fee', amount: '₦8,000' },
  { item: 'Uniform & Stationery', amount: '₦25,000' },
  { item: 'Technical Workshop', amount: '₦20,000' },
];

function calculateTotal(fees: { item: string; amount: string }[]) {
  return fees.reduce((sum, fee) => {
    const num = parseInt(fee.amount.replace(/[₦,]/g, ''), 10);
    return sum + num;
  }, 0);
}

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

export default function TuitionContent() {
  const primaryTotal = calculateTotal(primaryFees);
  const secondaryTotal = calculateTotal(secondaryFees);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-navy-900 via-brand-blue to-navy-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-brand-green-light font-semibold text-sm tracking-widest uppercase mb-4">
              Fee Structure
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Tuition Fees
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Transparent and affordable fees for the 2026/2027 academic
              session. We are committed to making quality education accessible.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Fee Tables */}
      <section className="py-24 md:py-32 bg-brand-mint">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Primary */}
            <ScrollReveal direction="left">
              <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-green to-brand-teal p-6">
                  <h2 className="text-2xl font-bold text-white">
                    Primary Section
                  </h2>
                  <p className="text-white/80 text-sm mt-1">
                    Classes Primary 1 – Primary 6
                  </p>
                </div>
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-navy-100">
                        <th className="text-left py-3 text-sm font-semibold text-navy-700">
                          Fee Description
                        </th>
                        <th className="text-right py-3 text-sm font-semibold text-navy-700">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {primaryFees.map((fee, i) => (
                        <tr
                          key={i}
                          className="border-b border-navy-50 last:border-b-0"
                        >
                          <td className="py-3 text-sm text-navy-600">
                            {fee.item}
                          </td>
                          <td className="py-3 text-sm text-navy-900 font-medium text-right">
                            {fee.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-brand-green">
                        <td className="py-4 text-base font-bold text-navy-900">
                          Total per Session
                        </td>
                        <td className="py-4 text-base font-bold text-brand-green text-right">
                          {formatNaira(primaryTotal)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </ScrollReveal>

            {/* Secondary */}
            <ScrollReveal direction="right">
              <div className="bg-white rounded-2xl shadow-md border border-navy-100 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark p-6">
                  <h2 className="text-2xl font-bold text-white">
                    Secondary Section
                  </h2>
                  <p className="text-white/80 text-sm mt-1">
                    JSS 1 – SS 3 (incl. Technical Programs)
                  </p>
                </div>
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-navy-100">
                        <th className="text-left py-3 text-sm font-semibold text-navy-700">
                          Fee Description
                        </th>
                        <th className="text-right py-3 text-sm font-semibold text-navy-700">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {secondaryFees.map((fee, i) => (
                        <tr
                          key={i}
                          className="border-b border-navy-50 last:border-b-0"
                        >
                          <td className="py-3 text-sm text-navy-600">
                            {fee.item}
                          </td>
                          <td className="py-3 text-sm text-navy-900 font-medium text-right">
                            {fee.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-brand-blue">
                        <td className="py-4 text-base font-bold text-navy-900">
                          Total per Session
                        </td>
                        <td className="py-4 text-base font-bold text-brand-blue text-right">
                          {formatNaira(secondaryTotal)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Notes & CTA */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
              Please Note
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-5">
              Important Information
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-6 mb-16">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-brand-mint border border-navy-100">
              <HelpCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy-900 text-sm mb-1">
                  Sibling Discount
                </p>
                <p className="text-navy-600 text-sm">
                  A 10% discount is available for the second child and 15% for
                  the third child from the same family.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-brand-mint border border-navy-100">
              <HelpCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy-900 text-sm mb-1">
                  Payment Plans
                </p>
                <p className="text-navy-600 text-sm">
                  Fees can be paid in two installments: 60% at the beginning
                  of the session and 40% at mid-term.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-brand-mint border border-navy-100">
              <HelpCircle className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-navy-900 text-sm mb-1">
                  What&apos;s Included
                </p>
                <p className="text-navy-600 text-sm">
                  All fees cover instruction, materials, and access to school
                  facilities. Uniform and stationery kits are provided at the
                  listed rate.
                </p>
              </div>
            </div>
          </div>

          <ScrollReveal className="text-center">
            <a
              href="/admissions/apply"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-brand-green to-brand-teal rounded-xl hover:shadow-xl hover:shadow-brand-green/30 transition-all hover:-translate-y-1"
            >
              Launch Application Portal
              <ArrowRight className="w-5 h-5" />
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
