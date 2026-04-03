import { Link as ScrollLink } from 'react-scroll';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import profileImg from '../assets/amarjeetmaurya.png';
import resumePDF from '/Amarjeet_Resume.pdf';

const navItems = [
  { path: '/home', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/achievements', label: 'Achievements' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-600/10 dark:bg-black/10 border-b border-black/20 dark:border-white/20"
    >
      <div className="max-w-6.5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name with Profile Photo */}
          <Link to="/home" className="flex items-center space-x-3" onClick={closeMenu}>
            <div className="w-12 h-12 rounded-full overflow-hidden border-purple-400">
              <img
                src={profileImg}
                alt="Amarjeet Maurya"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-purple-400 text-sm">AM</span>';
                }}
              />
            </div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold hidden sm:inline">
              Amarjeet Maurya
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-purple-400 ${isActive ? 'text-purple-400' : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Theme Toggle, Resume Button & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Resume download button - text version */}
            <a
              href={resumePDF}
              download="Amarjeet_Maurya_Resume.pdf"
              className="text-sm p-2 bg-purple-600 dark:bg-gray-700 border border-purple-400 rounded-full text-white dark:text-white hover:bg-gray-300/20 hover:text-black dark:hover:text-white dark:hover:bg-gray-600/20 transition"
              aria-label="Download Resume"
            >
              My Resume
            </a>
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-gray-600/10 dark:bg-black/10 backdrop-blur-md border-t border-black/20 dark:border-white/20"
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-purple-400 ${isActive
                      ? 'text-purple-400 bg-purple-500/10'
                      : 'text-gray-700 dark:text-gray-300'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}