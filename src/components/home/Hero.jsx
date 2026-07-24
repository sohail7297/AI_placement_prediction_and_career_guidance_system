import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Buttons';
import heroImage from '../../assets/hero.png';

export const Hero = ({ accentText, accentBorder, accentBg, accentGlow }) => {
  return (
    <section className="relative pt-12 md:pt-20 pb-20 px-6 sm:px-12 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 overflow-hidden select-none">
      {/* Aurora glow light maps */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-purple-500/10 filter blur-[110px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-cyan-500/10 filter blur-[110px] animate-pulse-slow pointer-events-none" />

      <div className="flex-1 space-y-6 text-center lg:text-left z-10 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border ${accentBorder} text-xs font-semibold ${accentText} tracking-wide uppercase`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini-2.5-Flash
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading leading-tight tracking-tight text-gradient">
          Accelerate Your SDE Career With <span className="text-gradient-neon">Predictive AI</span>
        </h1>
        
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Predict placement outcomes, analyze resumes with industrial ATS scanners, and complete live AI voice mocks. Empowering engineering cohorts to land premium software jobs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link to="/dashboard">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4.5 h-4.5" />}>
              Launch Platform
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg">
              Explore Features
            </Button>
          </a>
        </div>
      </div>

      <div className="flex-1 relative z-10 w-full max-w-md lg:max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative rounded-2xl border border-white/8 overflow-hidden bg-slate-950/60 p-2 shadow-2xl animate-float"
        >
          <img 
            src={heroImage} 
            alt="AI Placement Illustration" 
            className="w-full h-auto object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity"
            loading="eager"
          />
          <div className={`absolute inset-0 border border-current/15 rounded-2xl pointer-events-none ${accentText}`} />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
