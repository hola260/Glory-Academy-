import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import PillarsSection from '@/components/PillarsSection';
import ProgramsSection from '@/components/ProgramsSection';
import PartnersSection from '@/components/PartnersSection';
import StatsBar from '@/components/StatsBar';
import AboutSection from '@/components/AboutSection';
import BenefitsGrid from '@/components/BenefitsGrid';
import GallerySection from '@/components/GallerySection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <PillarsSection />
        <ProgramsSection />
        <PartnersSection />
        <StatsBar />
        <AboutSection />
        <BenefitsGrid />
        <GallerySection />
        <NewsSection />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
