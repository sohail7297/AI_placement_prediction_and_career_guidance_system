import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('career-intel-accent') || 'cyan';
  });

  useEffect(() => {
    localStorage.setItem('career-intel-accent', accent);
    // Apply variables to document body if needed, or simply let class states handle it
  }, [accent]);

  const toggleAccent = () => {
    setAccent((prev) => (prev === 'cyan' ? 'purple' : 'cyan'));
  };

  return (
    <ThemeContext.Provider value={{ accent, setAccent, toggleAccent }}>
      <div className={`theme-${accent} min-h-screen text-white bg-[#050816] transition-colors duration-300`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
