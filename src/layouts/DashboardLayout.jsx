import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import { motion } from 'framer-motion';

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#050816] text-white">
      {/* Navigation Header */}
      <Navbar onMenuClick={toggleSidebar} showSidebarToggle={true} />

      {/* Main Container */}
      <div className="flex-1 flex relative">
        {/* Navigation Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Scrollable Content View */}
        <main className="flex-grow w-full max-h-[calc(100vh-60px)] overflow-y-auto px-4.5 sm:px-8 py-6 relative">
          
          {/* Subtle decorative background floating lights */}
          <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-cyan-500/5 filter blur-[80px] pointer-events-none" />
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-500/5 filter blur-[80px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative z-10 max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
