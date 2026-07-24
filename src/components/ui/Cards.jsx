import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  glowColor = 'none', // cyan, purple, blue, none
  hoverEffect = true,
  onClick,
}) => {
  const glowStyles = {
    none: 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
    cyan: 'shadow-[0_0_30px_rgba(6,182,212,0.08)] border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.18)]',
    purple: 'shadow-[0_0_30px_rgba(139,92,246,0.08)] border-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.18)]',
    blue: 'shadow-[0_0_30px_rgba(59,130,246,0.08)] border-blue-500/20 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]',
  };

  const cardClasses = `
    glass-card rounded-xl p-5 border border-white/6 relative overflow-hidden
    ${glowStyles[glowColor]}
    ${hoverEffect ? 'glass-card-hover' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (hoverEffect && !onClick) {
    return (
      <motion.div
        className={cardClasses}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
    );
  }

  if (onClick) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={cardClasses}>{children}</div>;
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 flex items-center justify-between ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold font-heading text-white tracking-wide flex items-center gap-2 ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-slate-400 text-xs font-sans mt-0.5 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);
