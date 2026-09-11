import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AdmissionsContent from './AdmissionsContent';

export const metadata = {
  title: 'Admissions | Glory Primary and Secondary Academy',
  description:
    'Apply to Glory Primary and Secondary Academy. Learn about our admissions process, tuition fees, and requirements.',
};

export default function AdmissionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <AdmissionsContent />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
