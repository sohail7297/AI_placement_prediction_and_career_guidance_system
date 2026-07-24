import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Cards';
import { Button } from '../ui/Buttons';
import { CircularProgress } from '../ui/Progress';

export const InterviewEvaluation = ({ evalScore, evaluationFeedback, resetInterview, accent }) => {
  return (
    <div className="space-y-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <Card glowColor="cyan" hoverEffect={false} className="lg:col-span-1 p-6 flex flex-col items-center justify-center text-center glow-cyan border-white/5">
          <CircularProgress 
            value={evalScore} 
            size={160} 
            strokeWidth={12} 
            color="cyan"
            centerLabel={`${evalScore}%`}
            centerSubLabel="Average Score"
          />
          <h3 className="text-lg font-black font-heading text-gradient-neon mt-5">SDE Ready Status</h3>
          <p className="text-slate-400 text-xs mt-1 font-sans">You performed competitive reasoning matching Tier-1 specs.</p>
        </Card>

        {/* Feedback deck */}
        <div className="lg:col-span-2 space-y-4">
          {evaluationFeedback.map((item, idx) => (
            <Card key={idx} hoverEffect={false} className="p-4.5 border-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-2">
                <h4 className="text-xs font-bold text-white font-heading tracking-wide flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-cyan-400" /> {item.metric}
                </h4>
                <span className="text-xs font-black font-heading text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {item.score}%
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-2.5 leading-relaxed">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center flex-wrap gap-4 pt-4 border-t border-white/5">
        <Button variant="outline" size="md" onClick={resetInterview} icon={<RefreshCw className="w-4 h-4" />}>
          Start New Session
        </Button>
        <div className="flex gap-3">
          <Link to="/dashboard" aria-label="Navigate to home cockpit">
            <Button variant="outline" size="md">
              Go Dashboard
            </Button>
          </Link>
          <Link to="/assistant" aria-label="Ask Career assistant chatbot SDE queries">
            <Button variant="primary" size="md">
              Ask Coaching AI
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default InterviewEvaluation;
