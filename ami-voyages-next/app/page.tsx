import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PartnersMarquee from '@/components/PartnersMarquee';
import FlightSpecialist from '@/components/FlightSpecialist';
import ThemesCarousel from '@/components/ThemesCarousel';
import Destinations from '@/components/Destinations';
import PlaneTrail from '@/components/PlaneTrail';
import Formalities from '@/components/Formalities';
import Exclusivities from '@/components/Exclusivities';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import Values from '@/components/Values';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Header />
      <Hero />
      <PartnersMarquee />
      <FlightSpecialist />
      <ThemesCarousel />
      <Destinations />
      <PlaneTrail />
      <Formalities />
      <Exclusivities />
      <Stats />
      <Testimonials />
      <Values />
      <ContactSection />
      <Footer />
    </main>
  );
}
