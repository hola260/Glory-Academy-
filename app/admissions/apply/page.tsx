import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ApplicationForm from './ApplicationForm';

export const metadata = {
  title: 'Apply Now | Glory Primary and Secondary Academy',
  description:
    'Submit your application to Glory Primary and Secondary Academy for the 2026/2027 academic session.',
};

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ApplicationForm />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
