import React from 'react';
import { motion } from 'framer-motion';

export const Stats = () => {
  const stats = [
    { value: '94%', label: 'Placement Accuracy', desc: 'Validated SDE models' },
    { value: '180K+', label: 'Students Guided', desc: 'Across 40+ engineering college centers' },
    { value: '35%+', label: 'Average Salary Hike', desc: 'Post resume & prep training' },
  ];

  return (
    <section className="border-y border-white/5 bg-slate-950/20 py-12 px-6 sm:px-12 w-full font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center space-y-1">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold font-heading text-gradient-neon"
            >
              {stat.value}
            </motion.h3>
            <h4 className="text-white text-sm font-semibold tracking-wide uppercase mt-1">{stat.label}</h4>
            <p className="text-slate-500 text-xs">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Stats;
