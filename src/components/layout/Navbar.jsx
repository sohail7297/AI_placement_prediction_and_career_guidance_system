import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, Cpu, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = ({ onMenuClick, showSidebarToggle = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { accent } = useTheme();

  const isDashboard = location.pathname !== '/';

  const navLinks = [
    { name: 'Features', path: '/#features' },
    { name: 'Workflow', path: '/#workflow' },
    { name: 'Predictor', path: '/predictor' },
    { name: 'Resume', path: '/resume' },
    { name: 'Interview', path: '/interview' },
  ];

  const notifications = [
    { id: 1, text: 'AI Interview response graded: 82/100', time: '10m ago' },
    { id: 2, text: 'ATS Score optimization complete: 91 ATS score', time: '1h ago' },
    { id: 3, text: 'System Update: New Data Analytics model deployed', time: '1d ago' },
  ];

  const accentColor = accent === 'cyan' ? 'text-cyan-400' : 'text-purple-400';
  const accentBorder = accent === 'cyan' ? 'border-cyan-500/30' : 'border-purple-500/30';
  const accentGlow = accent === 'cyan' ? 'hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]' : 'hover:shadow-[0_0_15px_rgba(139,92,246,0.25)]';
  const accentBg = accent === 'cyan' ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-purple-600 hover:bg-purple-500';

  return (
    <nav className="glass-nav sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 flex items-center justify-between text-white select-none">
      <div className="flex items-center gap-3">
        {showSidebarToggle && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 rounded text-slate-400 hover:text-white cursor-pointer"
          >
            <Menu className="w-5.5 h-5.5" />
          </button>
        )}
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`p-1.5 rounded-lg bg-slate-900 border ${accentBorder} flex items-center justify-center`}>
            <Cpu className={`w-5.5 h-5.5 ${accentColor} group-hover:rotate-12 transition-transform`} />
          </div>
          <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-gradient">
            CAREER<span className={accentColor}>.AI</span>
          </span>
        </Link>
      </div>

      {/* Desktop Links (Marketing layout) */}
      {!isDashboard && (
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              className="text-slate-400 hover:text-white text-sm font-medium font-sans tracking-wide transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4.5">
        <ThemeToggle />

        {/* Notifications (Only inside Dashboard or for all) */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-slate-900/60 border border-white/5 hover:border-white/12 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${accent === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'}`} />
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 z-20 rounded-xl bg-slate-950 border border-white/8 p-3 shadow-xl"
                >
                  <h4 className="text-xs font-bold font-heading tracking-wide uppercase text-slate-400 mb-2">Notifications</h4>
                  <div className="space-y-1.5">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-2 rounded bg-slate-900 border border-white/5 hover:bg-slate-800/40 transition-colors">
                        <p className="text-xs text-white leading-normal font-sans font-medium">{notif.text}</p>
                        <span className="text-[10px] text-slate-500 mt-1 block">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User CTAs */}
        {isDashboard ? (
          <Link
            to="/profile"
            className="flex items-center gap-2 p-1 bg-slate-900/60 border border-white/5 rounded-full pr-3 pl-1.5 hover:border-white/15 transition-all cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border ${accentBorder}`}>
              <User className={`w-3.5 h-3.5 ${accentColor}`} />
            </div>
            <span className="text-xs font-heading font-medium text-slate-300 hidden sm:inline">Sohail</span>
          </Link>
        ) : (
          <Link
            to="/dashboard"
            className={`
              px-4 py-2 text-xs font-heading font-bold text-black rounded-lg transition-all cursor-pointer
              ${accentBg} ${accentGlow}
            `}
          >
            Go to Platform
          </Link>
        )}

        {/* Mobile menu trigger */}
        {!isDashboard && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded text-slate-400 hover:text-white cursor-pointer"
          >
            {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        )}
      </div>

      {/* Mobile Drawer (Only on Home View) */}
      <AnimatePresence>
        {isOpen && !isDashboard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 right-0 z-30 bg-slate-950 border-b border-white/8 px-6 py-4 space-y-3.5 md:hidden flex flex-col"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white font-medium font-sans text-sm tracking-wide block"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={`w-full py-2.5 text-center text-xs font-heading font-bold text-black rounded-lg block ${accentBg}`}
            >
              Launch Platform
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
