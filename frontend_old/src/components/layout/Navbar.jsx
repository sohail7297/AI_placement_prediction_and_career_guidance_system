import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../common/ThemeToggle";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Predictor", path: "/predictor" },
    { name: "Resume", path: "/resume" },
    { name: "Interview", path: "/interview" },
    { name: "Analytics", path: "/analytics" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600">
            <BrainCircuit className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
              CareerPilot AI
            </h1>

            <p className="text-xs text-slate-400">
              Career Intelligence Platform
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">

          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `transition font-medium ${
                  isActive
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <ThemeToggle />

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? (
            <X className="text-white" />
          ) : (
            <Menu className="text-white" />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="lg:hidden bg-slate-900 border-t border-slate-800"
          >

            <div className="flex flex-col p-6 gap-5">

              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-300"
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <ThemeToggle />

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.nav>
  );
}

export default Navbar;