import React from 'react';

export const Spinner = ({
  size = 'md', // sm, md, lg
  color = 'cyan', // cyan, purple, white
  className = '',
}) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colors = {
    cyan: 'border-cyan-500/20 border-t-cyan-500',
    purple: 'border-purple-500/20 border-t-purple-500',
    white: 'border-slate-800 border-t-white',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`rounded-full animate-spin ${sizes[size]} ${colors[color]}`}
        style={{
          boxShadow: color !== 'white' ? `0 0 15px rgba(${color === 'cyan' ? '6, 182, 212' : '139, 92, 246'}, 0.15)` : 'none'
        }}
      />
    </div>
  );
};

export const Skeleton = ({
  variant = 'text', // text, circle, rect
  height = 'h-4',
  width = 'w-full',
  className = '',
}) => {
  const variants = {
    text: 'rounded-md',
    circle: 'rounded-full',
    rect: 'rounded-lg',
  };

  return (
    <div
      className={`
        bg-slate-800/40 relative overflow-hidden animate-pulse
        ${variants[variant]} ${height} ${width} ${className}
      `}
    >
      {/* Shimmer overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton variant="text" height="h-8" width="w-48" />
        <Skeleton variant="text" height="h-10" width="w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton variant="rect" height="h-32" />
        <Skeleton variant="rect" height="h-32" />
        <Skeleton variant="rect" height="h-32" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Skeleton variant="rect" height="h-80" />
        </div>
        <div>
          <Skeleton variant="rect" height="h-80" />
        </div>
      </div>
    </div>
  );
};
