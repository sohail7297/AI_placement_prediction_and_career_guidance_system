import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Cards';
import { CircularProgress } from '../ui/Progress';

export const CapabilityCard = ({ accent, activeGlow }) => {
  return (
    <Card glowColor={accent} hoverEffect={false} className={`flex flex-col justify-between p-6 border-white/5 ${activeGlow}`}>
      <div>
        <CardHeader className="mb-0">
          <div>
            <CardTitle>Placement Capability</CardTitle>
            <CardDescription>Aggregate target readiness index</CardDescription>
          </div>
        </CardHeader>
      </div>
      
      <div className="flex justify-center py-6">
        <CircularProgress 
          value={82.5} 
          size={170} 
          strokeWidth={14} 
          color={accent === 'cyan' ? 'cyan' : 'purple'}
          centerLabel="82.5%"
          centerSubLabel="Tier 1 Readiness"
        />
      </div>

      <div className="space-y-3.5 border-t border-white/5 pt-4 font-sans text-xs">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Academics Filter Status
          </span>
          <span className="text-white font-semibold">Cleared (CGPA &gt; 7.5)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Active Backlogs
          </span>
          <span className="text-white font-semibold">0 Outstanding</span>
        </div>
      </div>
    </Card>
  );
};
export default CapabilityCard;
