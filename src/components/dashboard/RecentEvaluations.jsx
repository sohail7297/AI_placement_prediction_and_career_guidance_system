import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/Cards';
import { Button } from '../ui/Buttons';

export const RecentEvaluations = () => {
  const recentPredictions = [
    { id: 1, role: 'Software Engineer', date: '2 hours ago', probability: 82.5, status: 'Placed' },
    { id: 2, role: 'Data Scientist', date: '2 days ago', probability: 48.0, status: 'Not Placed' },
    { id: 3, role: 'Frontend Developer', date: '5 days ago', probability: 91.2, status: 'Placed' }
  ];

  return (
    <Card hoverEffect={false} className="p-6 flex flex-col justify-between border-white/5">
      <div>
        <CardHeader>
          <div>
            <CardTitle>Recent Evaluations</CardTitle>
            <CardDescription>Latest simulated results</CardDescription>
          </div>
        </CardHeader>

        <div className="space-y-4 mt-2 font-sans">
          {recentPredictions.map((pred) => (
            <div key={pred.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-white/5">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white font-heading">{pred.role}</h4>
                <p className="text-[10px] text-slate-500">{pred.date}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-black font-heading ${pred.status === 'Placed' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {pred.probability}%
                </span>
                <span className="text-[9px] text-slate-400 font-medium block">{pred.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 pt-4 mt-6">
        <Link to="/predictor" aria-label="Evaluate student profile SDE">
          <Button variant="outline" size="md" className="w-full text-center" icon={<ArrowRight className="w-4 h-4" />}>
            Run Detailed Predictor
          </Button>
        </Link>
      </div>
    </Card>
  );
};
export default RecentEvaluations;
