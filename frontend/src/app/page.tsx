import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { AgentShowcase } from '@/components/AgentShowcase';
import { Stats } from '@/components/Stats';
import { CTA } from '@/components/CTA';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <AgentShowcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
