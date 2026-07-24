import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Brain, ArrowRight } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Cards';
import { Button } from '../components/ui/Buttons';
import { Spinner } from '../components/ui/Loaders';
import { useTheme } from '../context/ThemeContext';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area 
} from 'recharts';

// Subcomponents imports
import QuickStats from '../components/dashboard/QuickStats';
import CapabilityCard from '../components/dashboard/CapabilityCard';
import RecentEvaluations from '../components/dashboard/RecentEvaluations';
import ErrorBoundary from '../components/common/ErrorBoundary';

export const Dashboard = () => {
  const { accent } = useTheme();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);

  // Theme properties
  const accentColor = accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400';
  const accentBorder = accent === 'cyan' ? 'border-cyan-500/20' : 'border-purple-500/20';
  const activeGlow = accent === 'cyan' ? 'glow-cyan' : 'glow-purple';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiService.getCareerAnalytics();
        setAnalyticsData(data);
      } catch (error) {
        toast.error('Failed to load dashboard insights.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
          <Spinner size="lg" color={accent} />
          <p className="text-slate-400 text-xs font-heading font-semibold tracking-wider">Syncing your cockpit...</p>
        </div>
      </DashboardLayout>
    );
  }

  const trends = analyticsData?.placementTrends || [];
  const skills = analyticsData?.skillDistribution || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-gradient tracking-tight">
              Welcome Back, Sohail
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
              Review your placement diagnostics, skill roadmaps, and optimization checks.
            </p>
          </div>
          <Link to="/predictor" aria-label="Run SDE Prediction Checklist">
            <Button variant="primary" size="md" icon={<Zap className="w-4 h-4 text-black animate-pulse" />}>
              Run Prediction Check
            </Button>
          </Link>
        </div>

        {/* Modularized Stats widgets */}
        <QuickStats />

        {/* Score & Skill vector charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CapabilityCard accent={accent} activeGlow={activeGlow} />

          <ErrorBoundary>
            <Card hoverEffect={false} className="lg:col-span-2 p-6 flex flex-col border-white/5">
              <CardHeader>
                <div>
                  <CardTitle>Skills Vector Profile</CardTitle>
                  <CardDescription>Target competencies mapping across disciplines</CardDescription>
                </div>
              </CardHeader>
              <div className="flex-1 min-h-[250px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" radius="80%" data={skills}>
                    <PolarGrid stroke="rgba(255,255,255,0.06)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#475569', fontSize: 9 }} />
                    <Radar
                      name="Skills Index"
                      dataKey="value"
                      stroke={accent === 'cyan' ? '#06B6D4' : '#8B5CF6'}
                      fill={accent === 'cyan' ? '#06B6D4' : '#8B5CF6'}
                      fillOpacity={0.15}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </ErrorBoundary>
        </div>

        {/* History charts & Evaluator cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ErrorBoundary>
            <Card hoverEffect={false} className="lg:col-span-2 p-6 flex flex-col border-white/5">
              <CardHeader>
                <div>
                  <CardTitle>Preparation Index Trends</CardTitle>
                  <CardDescription>Placement eligibility trajectory over time</CardDescription>
                </div>
              </CardHeader>
              <div className="flex-1 min-h-[250px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={accent === 'cyan' ? '#06B6D4' : '#8B5CF6'} stopOpacity={0.25}/>
                        <stop offset="95%" stopColor={accent === 'cyan' ? '#06B6D4' : '#8B5CF6'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis dataKey="year" stroke="#475569" fontSize={11} />
                    <YAxis stroke="#475569" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff', fontFamily: 'sans-serif' }}
                      labelStyle={{ color: '#94a3b8', fontSize: 11 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="placementRate"
                      name="Hiring Score Index"
                      stroke={accent === 'cyan' ? '#06B6D4' : '#8B5CF6'}
                      fillOpacity={1}
                      fill="url(#colorTrend)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </ErrorBoundary>

          <RecentEvaluations />
        </div>

        {/* AI Recommendations panel */}
        <Card hoverEffect={false} glowColor={accent} className="p-6 border-white/5">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className={`p-2 rounded-lg bg-slate-900 border ${accentBorder} flex items-center justify-center flex-shrink-0`}>
              <Brain className={`w-6 h-6 ${accentColor} animate-pulse`} />
            </div>
            
            <div className="space-y-2 flex-grow font-sans">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold font-heading text-white tracking-wide">
                  AI Career Coach Recommendation
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
                  Active Optimization Alert
                </span>
              </div>
              
              <p className="text-slate-300 text-xs leading-relaxed">
                {analyticsData?.aiInsights || 'Loading coach recommendations...'}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/resume" aria-label="Review resume using ATS scanners">
                  <span className={`text-xs font-bold ${accentColor} hover:underline inline-flex items-center gap-1 cursor-pointer`}>
                    Analyze Resume in ATS Engine <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link to="/assistant" aria-label="Chat SDE Career bot">
                  <span className="text-xs font-bold text-slate-400 hover:text-white hover:underline inline-flex items-center gap-1 cursor-pointer">
                    Ask Assistant <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
};
export default Dashboard;
