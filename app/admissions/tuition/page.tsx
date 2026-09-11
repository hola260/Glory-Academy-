import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import TuitionContent from './TuitionContent';

export const metadata = {
  title: 'Tuition Fees | Glory Primary and Secondary Academy',
  description:
    'View the tuition fees structure for Glory Primary and Secondary Academy for the 2026/2027 academic session.',
};

export default function TuitionPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <TuitionContent />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
