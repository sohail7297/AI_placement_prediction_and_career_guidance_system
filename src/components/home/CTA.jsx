import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Zap } from 'lucide-react';
import { Button } from '../ui/Buttons';

export const CTA = ({ accentText }) => {
  return (
    <section className="pb-24 px-6 sm:px-12 w-full font-sans select-none">
      <div className="max-w-4xl mx-auto rounded-2xl glass-card border border-white/10 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        {/* Glowing visual indicators */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-cyan-500/10 filter blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-purple-500/10 filter blur-3xl" />

        <Brain className={`w-12 h-12 ${accentText} mx-auto animate-float`} />
        
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient leading-tight">
          Ready to Predictions-Check & Crack Your Placements?
        </h2>
        
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Gain immediate access to SDE capability scoring, custom AI interview analysis, and career coaching boards. Try it today.
        </p>

        <div>
          <Link to="/dashboard" aria-label="Get Started SDE Platform">
            <Button variant="primary" size="lg" icon={<Zap className="w-4 h-4 text-black" />}>
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CTA;
