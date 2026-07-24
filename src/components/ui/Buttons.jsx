import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary (cyan), secondary (purple), outline, danger, ghost
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  isLoading = false,
  icon,
}) => {
  const baseStyle = "relative inline-flex items-center justify-center font-semibold rounded-lg font-heading transition-all focus:outline-none focus:ring-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none overflow-hidden";
  
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] focus:ring-cyan-500/50",
    secondary: "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] focus:ring-purple-500/50",
    outline: "bg-transparent border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 focus:ring-slate-700/50 hover:bg-slate-800/40",
    danger: "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] focus:ring-red-500/50",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50 focus:ring-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4.5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Background Ripple effect overlay */}
      <span className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      
      <span>{isLoading ? 'Processing...' : children}</span>
    </motion.button>
  );
};
