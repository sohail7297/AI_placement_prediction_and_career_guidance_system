import React from 'react';
import { Cpu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Footer = () => {
  const { accent } = useTheme();

  return (
    <footer className="border-t border-white/5 bg-slate-950/30 px-6 sm:px-12 py-10 text-slate-400 text-xs font-sans select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo and Tag */}
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-md bg-slate-900 border border-white/10 flex items-center justify-center">
            <Cpu className={`w-4 h-4 ${accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
          </div>
          <span className="font-heading font-extrabold text-sm tracking-widest text-gradient">
            CAREER<span className={accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}>.AI</span>
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
          <a href="/predictor" className="hover:text-white transition-colors">Predictor</a>
          <a href="/resume" className="hover:text-white transition-colors">Resume Engine</a>
          <a href="/interview" className="hover:text-white transition-colors">Mock Prep</a>
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-center md:text-right">
          &copy; {new Date().getFullYear()} Career.AI Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
