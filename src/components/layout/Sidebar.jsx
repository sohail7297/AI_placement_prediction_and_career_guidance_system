import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Award, FileText, Mic, TrendingUp, Bot, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export const Sidebar = ({ isOpen, onClose }) => {
  const { accent } = useTheme();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Placement Predictor', path: '/predictor', icon: Award },
    { name: 'Resume Analyzer', path: '/resume', icon: FileText },
    { name: 'AI Mock Interview', path: '/interview', icon: Mic },
    { name: 'Career Analytics', path: '/analytics', icon: TrendingUp },
    { name: 'AI Career Assistant', path: '/assistant', icon: Bot },
  ];

  const activeAccentText = accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400';
  const activeAccentBg = accent === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-purple-500/10 border-purple-500/30';
  const accentGlow = accent === 'cyan' ? 'shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'shadow-[0_0_15px_rgba(139,92,246,0.15)]';

  const sidebarVariants = {
    open: { x: 0, opacity: 1, width: 260 },
    closed: { x: -260, opacity: 0, width: 0 },
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#02040a]/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`
          glass-sidebar fixed lg:sticky top-[60px] bottom-0 left-0 z-30 
          h-[calc(100vh-60px)] lg:w-[260px] flex flex-col font-sans select-none
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Navigation list */}
        <div className="flex-1 px-4.5 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/predictor' && location.pathname === '/results');
            
            return (
              <NavLink
                key={idx}
                to={item.path}
                onClick={onClose}
                className={({ isActive: linkActive }) => `
                  flex items-center gap-3.5 px-4.5 py-3 rounded-lg border text-sm font-semibold tracking-wide
                  transition-all duration-200 cursor-pointer group
                  ${isActive 
                    ? `${activeAccentText} ${activeAccentBg} ${accentGlow} border-current/25` 
                    : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-900/50'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className={`absolute left-0 w-1.5 h-6 rounded-r-full ${accent === 'cyan' ? 'bg-cyan-500' : 'bg-purple-500'}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-4.5 border-t border-white/5 bg-slate-950/40">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to landing page
          </NavLink>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
