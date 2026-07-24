import React from 'react';

export const Workflow = ({ accentText, accentBorder }) => {
  const steps = [
    {
      number: '01',
      title: 'Sync Profile Data',
      desc: 'Input academic records, programming competencies, and project history.',
    },
    {
      number: '02',
      title: 'Run AI Prediction',
      desc: 'Identify your target placement bracket and outline structural vulnerabilities.',
    },
    {
      number: '03',
      title: 'Audit & Optimize',
      desc: 'Optimize ATS resume scoring and complete mock oral practice rounds.',
    },
    {
      number: '04',
      title: 'Land Your Dream SDE Role',
      desc: 'Execute tailored placement action guides and achieve your career milestone.',
    },
  ];

  return (
    <section id="workflow" className="border-t border-white/5 bg-slate-950/10 py-20 px-6 sm:px-12 w-full select-none">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-gradient">
            The Placement <span className="text-gradient-neon">Workflow Engine</span>
          </h2>
          <p className="text-slate-400 text-sm font-sans">
            Four streamlined stages to progress from core engineering basics to an enterprise tech role.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative font-sans">
          {steps.map((step, idx) => (
            <div key={idx} className="relative space-y-3 p-6 glass-card rounded-xl border border-white/5 group">
              <span className={`absolute top-2 right-4 text-5xl font-heading font-black opacity-[0.03] group-hover:opacity-[0.06] transition-opacity ${accentText}`}>
                {step.number}
              </span>
              
              <div className={`w-7 h-7 rounded-full bg-slate-900 border ${accentBorder} flex items-center justify-center text-xs font-bold ${accentText}`}>
                {step.number}
              </div>
              
              <h3 className="text-sm font-bold font-heading text-white tracking-wide">
                {step.title}
              </h3>
              
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Workflow;
