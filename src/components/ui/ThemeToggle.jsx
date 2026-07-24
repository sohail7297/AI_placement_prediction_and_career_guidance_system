import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const { accent, toggleAccent } = useTheme();

  return (
    <motion.button
      onClick={toggleAccent}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 px-3 rounded-lg bg-slate-900/60 border border-white/5 hover:border-white/15 cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 font-heading transition-colors"
      title="Switch accent theme color"
    >
      {accent === 'cyan' ? (
        <>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-bold tracking-wide">Cyan Neon</span>
        </>
      ) : (
        <>
          <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="text-purple-400 font-bold tracking-wide">Purple Neon</span>
        </>
      )}
    </motion.button>
  );
};
export default ThemeToggle;
