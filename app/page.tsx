import { Nav } from '../components/Nav';
import { HeroSection } from '../components/HeroSection';
import { WhatWeDoSection } from '../components/WhatWeDoSection';
import { ServicesSection } from '../components/ServicesSection';
import { AboutSection } from '../components/AboutSection';
import { CtaBanner } from '../components/CtaBanner';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import {
  fetchServices,
  fetchProjects,
  fetchContactSettings,
} from '../lib/sanity/fetchWithFallback';

export default async function Home() {
  const [services, projects, contactSettings] = await Promise.all([
    fetchServices(),
    fetchProjects(),
    fetchContactSettings(),
  ]);

  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <WhatWeDoSection />
        <ServicesSection services={services} />
        <AboutSection />
        <CtaBanner />
        <ProjectsSection projects={projects} />
        <ContactSection settings={contactSettings} />
      </main>
      <Footer />
    </>
  );
}
