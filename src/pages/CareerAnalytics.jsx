import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Award, DollarSign, Activity, Sparkles, 
  BarChart2, ShieldAlert, Cpu, BookOpen, AlertCircle
} from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Cards';
import { Spinner } from '../components/ui/Loaders';
import { useTheme } from '../context/ThemeContext';
import { apiService } from '../services/api';
import toast from 'react-hot-toast';
import { 
  ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area,
  BarChart, Bar, Legend, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import ErrorBoundary from '../components/common/ErrorBoundary';

export const CareerAnalytics = () => {
  const { accent } = useTheme();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  const accentColor = accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400';
  const accentBorder = accent === 'cyan' ? 'border-cyan-500/25' : 'border-purple-500/25';
  const activeGlow = accent === 'cyan' ? 'glow-cyan' : 'glow-purple';

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await apiService.getCareerAnalytics();
        setAnalytics(data);
      } catch (error) {
        toast.error('Failed to retrieve cohort analytics datasets.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
          <Spinner size="lg" color={accent} />
          <p className="text-slate-400 text-xs font-heading font-semibold tracking-wider">Compiling analytical metrics...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Fallbacks if data fails
  const trends = analytics?.placementTrends || [];
  const branchData = analytics?.branchComparison || [];
  const skillData = analytics?.skillDistribution || [];
  const tierData = analytics?.collegeTierPlacements || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-gradient tracking-tight flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-cyan-400" /> Career Analytics
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-sans mt-0.5">
              Explore SDE hiring metrics, annual packages, and skill distributions across college branch clusters.
            </p>
          </div>
        </div>

        {/* Major Analytics Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Branch-wise Salary and Placements BarChart */}
          <Card hoverEffect={false} className="lg:col-span-2 p-5 flex flex-col border-white/5">
            <CardHeader>
              <div>
                <CardTitle className="text-sm">Branch Comparison Index</CardTitle>
                <CardDescription>Hiring rates (%) vs Average Packages (LPA) across major disciplines</CardDescription>
              </div>
            </CardHeader>
            <div className="flex-1 min-h-[260px] w-full mt-2 font-sans text-xs">
              <ErrorBoundary>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchData} margin={{ top: 20, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="branch" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: 10 }} />
                    <Bar dataKey="placedRate" name="Placement Rate (%)" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="avgPackage" name="Avg Package (LPA)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ErrorBoundary>
            </div>
          </Card>

          {/* College Tier Pie Chart */}
          <Card hoverEffect={false} className="lg:col-span-1 p-5 flex flex-col justify-between border-white/5">
            <CardHeader>
              <div>
                <CardTitle className="text-sm">Cohort Tier Dispersions</CardTitle>
                <CardDescription>Average SDE placement ratios by college tier grouping</CardDescription>
              </div>
            </CardHeader>
            
            <div className="flex-1 min-h-[180px] w-full relative flex items-center justify-center font-sans mt-2">
              <ErrorBoundary>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tierData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="percentage"
                    >
                      {tierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ErrorBoundary>
              
              {/* Legend overlay */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tier Distribution</span>
                <span className="text-lg font-black text-white mt-0.5">3 Classes</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-4 text-xs font-sans">
              {tierData.map((entry, idx) => (
                <div key={idx} className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    {entry.name}
                  </span>
                  <span className="text-white font-bold">{entry.percentage}% Placed</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Analytical Trends Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recharts Area Chart - Trends */}
          <Card hoverEffect={false} className="lg:col-span-2 p-5 flex flex-col border-white/5">
            <CardHeader>
              <div>
                <CardTitle className="text-sm">Historical Placement Rates</CardTitle>
                <CardDescription>Trajectory tracking college placement rates over the last 5 years</CardDescription>
              </div>
            </CardHeader>
            <div className="flex-1 min-h-[250px] w-full mt-2 font-sans text-xs">
              <ErrorBoundary>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRates" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="year" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px', color: '#fff' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="placementRate"
                      name="Placement %"
                      stroke="#06B6D4"
                      fillOpacity={1}
                      fill="url(#colorRates)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ErrorBoundary>
            </div>
          </Card>

          {/* AI Insights Card */}
          <Card glowColor={accent} hoverEffect={false} className={`lg:col-span-1 p-5 flex flex-col justify-between border-white/5 ${activeGlow}`}>
            <CardHeader className="mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg bg-slate-900 border ${accentBorder} flex items-center justify-center text-cyan-400`}>
                  <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div>
                  <CardTitle className="text-sm">AI Placement Insights</CardTitle>
                  <CardDescription>Market intelligence summaries</CardDescription>
                </div>
              </div>
            </CardHeader>

            <div className="space-y-4 text-xs font-sans flex-grow flex flex-col justify-center">
              <p className="text-slate-300 leading-relaxed bg-slate-900/60 border border-white/5 p-4 rounded-xl">
                "{analytics?.aiInsights || 'Loading analytics coaching guides...'}"
              </p>
              
              <div className="p-3.5 rounded-lg bg-slate-900/30 border border-white/5 flex items-center gap-2.5 text-slate-400">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Model recommendation: Prioritize backend systems (Go/Python) and Docker virtualization to crack current core drives.</span>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
};
export default CareerAnalytics;
