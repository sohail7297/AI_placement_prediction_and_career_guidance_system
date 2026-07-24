import React from 'react';
import { Award, FileText, Mic, TrendingUp, Bot } from 'lucide-react';
import { Card } from '../ui/Cards';

export const Features = () => {
  const features = [
    {
      icon: Award,
      title: 'Placement Predictor',
      description: 'Leverage student data profiles (CGPA, skills, projects) to forecast hiring outcomes using optimized ML models.',
      color: 'cyan',
    },
    {
      icon: FileText,
      title: 'ATS Resume Analyzer',
      description: 'Scan resumes against industry SDE descriptors to parse missing keywords and optimize structural layout scoring.',
      color: 'purple',
    },
    {
      icon: Mic,
      title: 'AI Mock Interview',
      description: 'Crack coding and behavioral screens in dynamic voice simulators with instantaneous performance report summaries.',
      color: 'blue',
    },
    {
      icon: TrendingUp,
      title: 'Career Analytics',
      description: 'Review branch hiring trends, package statistics, and dynamic job market distributions with Recharts graphs.',
      color: 'cyan',
    },
    {
      icon: Bot,
      title: 'AI Career Assistant',
      description: 'Chat with our tailored career coach bot to draft cover letters, solve coding bugs, or outline study tracks.',
      color: 'purple',
    },
  ];

  return (
    <section id="features" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto w-full select-none">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-gradient">
          Everything You Need to <span className="text-gradient-neon">Crack Placements</span>
        </h2>
        <p className="text-slate-400 text-sm font-sans">
          Our comprehensive dashboard tools are designed to systematically remove hiring friction points.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          const glow = feat.color === 'cyan' ? 'cyan' : 'purple';
          return (
            <Card key={idx} glowColor={glow} className="h-full flex flex-col p-6 border-white/5">
              <div 
                className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-900 border mb-4 
                  ${feat.color === 'cyan' ? 'border-cyan-500/20 text-cyan-400' : 'border-purple-500/20 text-purple-400'}
                `}
              >
                <Icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white tracking-wide mb-2">
                {feat.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans flex-grow">
                {feat.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
export default Features;
