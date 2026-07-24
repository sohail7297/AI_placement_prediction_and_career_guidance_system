import React from 'react';
import { AlertTriangle, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Cards';
import { Button } from '../ui/Buttons';
import { CircularProgress } from '../ui/Progress';

export const ResumeATSOverview = ({ analysisResult, accent, activeGlow }) => {
  return (
    <div className="space-y-6">
      {/* Score and summary executive card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card glowColor={accent} hoverEffect={false} className={`md:col-span-1 p-5 flex flex-col items-center justify-center text-center border-white/5 ${activeGlow}`}>
          <CircularProgress 
            value={analysisResult.ats_score} 
            size={130} 
            strokeWidth={10} 
            color={analysisResult.ats_score >= 80 ? 'green' : 'purple'}
            centerLabel={`${analysisResult.ats_score}`}
            centerSubLabel="ATS Score"
          />
          <span className="text-[10px] text-slate-400 font-sans tracking-wide uppercase mt-4 block">
            ATS Index: {analysisResult.ats_score >= 80 ? 'Competitive' : 'Needs Optimization'}
          </span>
        </Card>

        <Card hoverEffect={false} className="md:col-span-2 p-5 flex flex-col justify-between border-white/5 font-sans">
          <CardHeader className="mb-2">
            <CardTitle className="text-sm">Executive Overview</CardTitle>
          </CardHeader>
          <p className="text-xs text-slate-300 leading-relaxed">
            {analysisResult.summary}
          </p>
          <div className="flex justify-end pt-4 border-t border-white/5 mt-4">
            <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} onClick={() => window.print()}>
              Download Report Details
            </Button>
          </div>
        </Card>
      </div>

      {/* Keywords & Suggestions layout panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Missing Keywords */}
        <Card hoverEffect={false} className="p-5 border-l-2 border-l-purple-500/50 border-white/5">
          <CardHeader className="mb-3">
            <CardTitle className="text-sm text-purple-400">
              <AlertTriangle className="w-4.5 h-4.5 text-purple-400" /> Missing ATS Keywords
            </CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-2 mt-2">
            {analysisResult.missing_keywords.map((kw, idx) => (
              <span 
                key={idx} 
                className="px-2.5 py-1.5 rounded-md bg-slate-900 border border-purple-500/20 text-purple-400 text-xs font-bold font-heading"
              >
                + {kw}
              </span>
            ))}
            {analysisResult.missing_keywords.length === 0 && (
              <span className="text-slate-400 text-xs italic font-sans">No critical missing keywords. Great density!</span>
            )}
          </div>
        </Card>

        {/* Format Check suggestions */}
        <Card hoverEffect={false} className="p-5 border-l-2 border-l-cyan-500/50 border-white/5">
          <CardHeader className="mb-3">
            <CardTitle className="text-sm text-cyan-400">
              <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400" /> Format Optimization Checks
            </CardTitle>
          </CardHeader>
          <ul className="space-y-3 font-sans text-xs leading-normal">
            {analysisResult.suggestions.map((sug, idx) => (
              <li key={idx} className="flex gap-2 text-slate-300">
                <ChevronRight className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block font-heading">{sug.category}</span>
                  <span className="text-slate-400 text-[11px] mt-0.5 block leading-normal">{sug.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};
export default ResumeATSOverview;
