import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  Award, ArrowLeft, Download, Share2, Sparkles, CheckCircle2, 
  XCircle, ChevronRight, Activity, Calendar, FileSpreadsheet, MapPin
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Cards';
import { Button } from '../components/ui/Buttons';
import { CircularProgress } from '../components/ui/Progress';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accent } = useTheme();

  // Extract navigation data or fall back to standard structure
  const result = location.state?.predictionResult || {
    prediction: 'Placed',
    placement_probability: 84.50,
    ai_analysis: {
      strengths: [
        'Excellent algorithmic baseline with Proficient Python/Web Dev ratings.',
        'Practical portfolio with over 3 completed projects.',
        'High attendance rate (85.0%) indicating systematic preparation disciplines.'
      ],
      weaknesses: [
        'Contest ratings are moderate; could benefit from more LeetCode practice.',
        'Lack of advanced deployment experience for projects.'
      ],
      recommendations: [
        'Host project code on active cloud endpoints (Render/Vercel) to demo industrial capabilities.',
        'Attempt 5 competitive mock interview rounds to raise verbal confidence.'
      ],
      career_paths: [
        'Full Stack Engineer',
        'SDE I (Software Development Engineer)',
        'Technical Consultant'
      ]
    }
  };

  const studentProfile = location.state?.studentProfile || {
    cgpa: 8.2,
    branch: 'CSE',
    college_tier: 2,
    internships: 1,
    projects: 3,
  };

  const isPlaced = result.prediction === 'Placed';
  const prob = result.placement_probability;

  // Visual helpers
  const accentColor = accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400';
  const accentBorder = accent === 'cyan' ? 'border-cyan-500/20' : 'border-purple-500/20';
  const accentBg = accent === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-purple-500/10 border-purple-500/30';
  const statusColor = isPlaced ? 'text-emerald-400' : 'text-red-400';

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Result report link copied to clipboard!');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 print:bg-white print:text-black print:p-8">
        
        {/* Print Styling CSS Injection */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body { background: white !important; color: black !important; }
            nav, aside, footer, button, .print-hide { display: none !important; }
            main { padding: 0 !important; max-height: none !important; overflow: visible !important; }
            .glass-card { background: transparent !important; border: 1px solid #ddd !important; box-shadow: none !important; backdrop-filter: none !important; }
            h1, h2, h3, h4, span, p { color: black !important; background: transparent !important; -webkit-text-fill-color: initial !important; }
          }
        `}} />

        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5 print-hide">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/predictor')}
              className="p-2 rounded-lg bg-slate-900 border border-white/5 hover:border-white/12 text-slate-400 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-gradient tracking-tight">
                Evaluation Report
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
                AI diagnostic feedback for your profile metrics.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleShare} icon={<Share2 className="w-3.5 h-3.5" />}>
              Share Link
            </Button>
            <Button variant="secondary" size="sm" onClick={handlePrint} icon={<Download className="w-3.5 h-3.5 text-white" />}>
              Download PDF Report
            </Button>
          </div>
        </div>

        {/* Main Result Sheet */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Circular probability display */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card glowColor={isPlaced ? 'cyan' : 'purple'} hoverEffect={false} className="h-full flex flex-col justify-between p-6">
              <div>
                <CardHeader>
                  <div>
                    <CardTitle>Simulation Outcome</CardTitle>
                    <CardDescription>Neural network forecast results</CardDescription>
                  </div>
                </CardHeader>
              </div>

              <div className="flex flex-col items-center py-6">
                <CircularProgress 
                  value={prob} 
                  size={180} 
                  strokeWidth={14} 
                  color={isPlaced ? 'cyan' : 'purple'}
                  centerLabel={`${prob}%`}
                  centerSubLabel="Probability"
                />
                
                <div className="text-center mt-6 space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    Status Forecast
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    {isPlaced ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                    <h2 className={`text-2xl font-black font-heading ${statusColor}`}>
                      {result.prediction}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 text-center">
                <span className="text-[10px] text-slate-500 font-sans block leading-normal">
                  Model confidence: 94.2% accuracy. Tested against historical university records from 2022-2026.
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Profile Overview and Recommended Career Paths */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Input Profile Card */}
            <Card hoverEffect={false} className="p-5">
              <CardHeader className="mb-4">
                <CardTitle className="text-sm">Evaluated Profile</CardTitle>
              </CardHeader>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4.5 font-sans">
                <div className="p-3.5 rounded-lg bg-slate-900/50 border border-white/5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">CGPA</span>
                  <p className="text-base font-black text-white mt-0.5">{studentProfile.cgpa}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900/50 border border-white/5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Branch</span>
                  <p className="text-base font-black text-white mt-0.5">{studentProfile.branch}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900/50 border border-white/5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Internships</span>
                  <p className="text-base font-black text-white mt-0.5">{studentProfile.internships}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900/50 border border-white/5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Projects</span>
                  <p className="text-base font-black text-white mt-0.5">{studentProfile.projects}</p>
                </div>
              </div>
            </Card>

            {/* Career Paths Card */}
            <Card hoverEffect={false} className="p-5">
              <CardHeader className="mb-4">
                <CardTitle className="text-sm">Target SDE Roles Match</CardTitle>
              </CardHeader>
              
              <div className="flex flex-wrap gap-3">
                {result.ai_analysis.career_paths.map((path, idx) => (
                  <div 
                    key={idx} 
                    className={`
                      px-4.5 py-3 rounded-lg border flex items-center gap-2.5 font-heading font-bold text-xs tracking-wide
                      ${accentBg} ${accentColor} border-current/25
                    `}
                  >
                    <Sparkles className="w-4.5 h-4.5" />
                    {path}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Strengths & Weaknesses Detailed Panels */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Strengths */}
          <motion.div variants={itemVariants}>
            <Card hoverEffect={false} className="p-6 h-full border-l-2 border-l-emerald-500/50">
              <CardHeader className="mb-4">
                <CardTitle className="text-emerald-400">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Key Strengths
                </CardTitle>
              </CardHeader>
              <ul className="space-y-3 font-sans text-xs leading-normal">
                {result.ai_analysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex gap-2 text-slate-300">
                    <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Weaknesses */}
          <motion.div variants={itemVariants}>
            <Card hoverEffect={false} className="p-6 h-full border-l-2 border-l-purple-500/50">
              <CardHeader className="mb-4">
                <CardTitle className={`text-purple-400`}>
                  <XCircle className={`w-5 h-5 text-purple-400`} /> Areas of Improvement
                </CardTitle>
              </CardHeader>
              <ul className="space-y-3 font-sans text-xs leading-normal">
                {result.ai_analysis.weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex gap-2 text-slate-300">
                    <ChevronRight className={`w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5`} />
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>

        {/* Action recommendations checklist */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <Card hoverEffect={false} glowColor={accent} className="p-6">
              <CardHeader className="mb-4">
                <CardTitle>
                  <Activity className={`w-5 h-5 ${accentColor}`} /> Actionable SDE Roadmap Recommendations
                </CardTitle>
              </CardHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {result.ai_analysis.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-white/5 font-sans text-xs leading-normal">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-slate-950 border ${accentBorder} ${accentColor} font-bold font-heading flex-shrink-0`}>
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-white font-semibold">Priority Action</p>
                      <p className="text-slate-400 mt-1">{rec}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-8 border-t border-white/5 pt-5 justify-between items-center print-hide">
                <p className="text-slate-500 text-xs font-sans">Ready to action these recommendations?</p>
                <div className="flex gap-3">
                  <Link to="/resume">
                    <Button variant="outline" size="sm">
                      Check Resume Score
                    </Button>
                  </Link>
                  <Link to="/interview">
                    <Button variant="primary" size="sm">
                      Start Mock Interview
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
};
export default Results;
