import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy loading SDE pages with named export resolutions
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const PlacementPredictor = lazy(() => import('./pages/PlacementPredictor').then(m => ({ default: m.PlacementPredictor })));
const ResumeAnalyzer = lazy(() => import('./pages/ResumeAnalyzer').then(m => ({ default: m.ResumeAnalyzer })));
const AIMockInterview = lazy(() => import('./pages/AIMockInterview').then(m => ({ default: m.AIMockInterview })));
const CareerAnalytics = lazy(() => import('./pages/CareerAnalytics').then(m => ({ default: m.CareerAnalytics })));
const AICareerAssistant = lazy(() => import('./pages/AICareerAssistant').then(m => ({ default: m.AICareerAssistant })));
const Results = lazy(() => import('./pages/Results').then(m => ({ default: m.Results })));

// Futuristic Page transition concentric loaders
const PageLoader = () => (
  <div className="w-full min-h-screen bg-[#050816] flex flex-col items-center justify-center gap-4 font-sans select-none">
    <div className="relative flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-cyan-500/10 border-t-cyan-500 animate-spin shadow-[0_0_20px_rgba(6,182,212,0.2)]" />
      <div className="absolute w-10 h-10 rounded-full border-4 border-purple-500/15 border-t-purple-500 animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
    </div>
    <span className="text-slate-500 text-[10px] font-heading font-bold tracking-widest uppercase animate-pulse">Syncing interface...</span>
  </div>
);

export const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public marketing home */}
              <Route path="/" element={<Home />} />
              
              {/* Platform cockpit views */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/predictor" element={<PlacementPredictor />} />
              <Route path="/resume" element={<ResumeAnalyzer />} />
              <Route path="/interview" element={<AIMockInterview />} />
              <Route path="/analytics" element={<CareerAnalytics />} />
              <Route path="/assistant" element={<AICareerAssistant />} />
              <Route path="/results" element={<Results />} />
              
              {/* Redirect to main landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ErrorBoundary>
      
      {/* Toast Notification engine */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'glass-card border border-white/10 text-white font-sans text-sm font-semibold py-3 px-4.5 rounded-lg shadow-xl shadow-black/40',
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#000',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#000',
            },
          },
        }}
      />
    </ThemeProvider>
  );
};
export default App;
