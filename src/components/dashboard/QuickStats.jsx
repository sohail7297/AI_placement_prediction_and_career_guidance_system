import React from 'react';
import { Award, FileText, Mic } from 'lucide-react';
import { Card, CardDescription } from '../ui/Cards';

export const QuickStats = () => {
  const stats = [
    { title: 'Current CGPA', value: '8.42', label: 'CSE Department', icon: Award, color: 'text-cyan-400 bg-cyan-500/10' },
    { title: 'Resume ATS Score', value: '84/100', label: 'Optimized v2', icon: FileText, color: 'text-purple-400 bg-purple-500/10' },
    { title: 'Mock Interviews Completed', value: '4 Rounds', label: 'Average Score: 78%', icon: Mic, color: 'text-emerald-400 bg-emerald-500/10' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} hoverEffect={true} className="flex items-center gap-4.5 p-5 border-white/5">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${stat.color}`}>
              <Icon className="w-5.5 h-5.5" />
            </div>
            <div>
              <CardDescription className="text-slate-500 font-medium">{stat.title}</CardDescription>
              <h3 className="text-xl sm:text-2xl font-black font-heading mt-0.5">{stat.value}</h3>
              <span className="text-[10px] text-slate-400 font-sans tracking-wide">{stat.label}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
export default QuickStats;
