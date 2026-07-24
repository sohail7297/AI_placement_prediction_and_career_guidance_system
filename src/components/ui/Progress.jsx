import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({
  value,
  max = 100,
  color = 'cyan', // cyan, purple, green, yellow, red
  height = 'h-2', // h-1, h-2, h-3
  label,
  subLabel,
  showPercentage = true,
  animate = true,
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const colors = {
    cyan: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]',
    purple: 'bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]',
    green: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    yellow: 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
    red: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  };

  return (
    <div className="w-full flex flex-col gap-1.5 font-sans">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs">
          {label && <span className="text-slate-300 font-medium">{label}</span>}
          {showPercentage && <span className="text-white font-bold">{percentage}%</span>}
        </div>
      )}
      
      <div className={`w-full bg-slate-900 border border-white/5 rounded-full overflow-hidden ${height}`}>
        <motion.div
          initial={animate ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors[color]}`}
        />
      </div>

      {subLabel && <span className="text-[10px] text-slate-500 mt-0.5">{subLabel}</span>}
    </div>
  );
};

export const CircularProgress = ({
  value,
  max = 100,
  size = 120, // diameter in px
  strokeWidth = 10,
  color = 'cyan', // cyan, purple, green
  centerLabel = '',
  centerSubLabel = '',
}) => {
  const percentage = Math.round((value / max) * 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    cyan: {
      stroke: '#06B6D4',
      glow: 'rgba(6, 182, 212, 0.4)',
    },
    purple: {
      stroke: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
    green: {
      stroke: '#10B981',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
  };

  return (
    <div className="relative flex items-center justify-center font-sans select-none" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        
        {/* Glowing Indicator circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={colors[color].stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 6px ${colors[color].glow})`,
          }}
        />
      </svg>
      
      {/* Center text indicators */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold font-heading text-white leading-none">
          {centerLabel || `${percentage}%`}
        </span>
        {centerSubLabel && (
          <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-1">
            {centerSubLabel}
          </span>
        )}
      </div>
    </div>
  );
};
