import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '../ui/Buttons';

export const EmptyState = ({
  icon: Icon = HelpCircle,
  title = 'No records found',
  description = 'Add data elements to populate this section.',
  actionLabel,
  onActionClick,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-xl bg-slate-900/10 font-sans ${className}`}>
      <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-500 mb-4 animate-float">
        <Icon className="w-5.5 h-5.5" />
      </div>
      <h3 className="text-sm font-bold font-heading text-white tracking-wide">{title}</h3>
      <p className="text-slate-400 text-xs mt-1 leading-relaxed max-w-sm font-sans">{description}</p>
      
      {actionLabel && onActionClick && (
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={onActionClick}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
export default EmptyState;
