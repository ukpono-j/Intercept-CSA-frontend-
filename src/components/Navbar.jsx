import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { colors } from '../utils/colors';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/programs', label: 'What We Do' },
    { to: '/get-involved', label: 'Get Involved' },
    { to: '/report-abuse', label: 'Report Abuse' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl sm:text-2xl font-bold text-black">
          Intercept CSA
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-50 text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium px-2 py-1 transition-colors duration-200 ${
                    isActive
                      ? `text-[${colors.primary}] border-b-2 border-[${colors.primary}]`
                      : `text-gray-700 hover:text-[${colors.primaryDark}]`
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out lg:hidden shadow-lg z-40`}
        >
          <div className="p-6">
            <ul className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block text-base font-medium ${
                        isActive
                          ? `text-[${colors.primary}] border-b-2 border-[${colors.primary}]`
                          : `text-gray-800 hover:text-[${colors.primaryDark}]`
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
