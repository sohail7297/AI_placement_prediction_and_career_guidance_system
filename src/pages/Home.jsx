import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useTheme } from '../context/ThemeContext';

// Subcomponents imports
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import Workflow from '../components/home/Workflow';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

export const Home = () => {
  const { accent } = useTheme();

  const accentText = accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400';
  const accentBorder = accent === 'cyan' ? 'border-cyan-500/20' : 'border-purple-500/20';
  const accentBg = accent === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-purple-600 hover:bg-purple-500';
  const accentGlow = accent === 'cyan' ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'shadow-[0_0_20px_rgba(139,92,246,0.3)]';

  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />

      <Hero 
        accentText={accentText} 
        accentBorder={accentBorder} 
        accentBg={accentBg} 
        accentGlow={accentGlow} 
      />
      
      <Stats />
      
      <Features />
      
      <Workflow 
        accentText={accentText} 
        accentBorder={accentBorder} 
      />
      
      <Testimonials 
        accentText={accentText} 
        accentBorder={accentBorder} 
      />
      
      <CTA accentText={accentText} />

      <Footer />
    </div>
  );
};
export default Home;
