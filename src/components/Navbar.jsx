import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/logo.png';
import './Navbar.css';

const colors = {
  primary: '#374050', // deep navy-gray
  secondary: '#2A8E9D', // teal
  accent: '#FFC938', // golden yellow
  coral: '#FF5245', // coral-red (used sparingly)
  text: '#374050',
  lightGray: '#f8fafc',
  white: '#ffffff',
};

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Track current route

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Sync active link with current route
  useEffect(() => {
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname]);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/programs', label: 'What We Do' },
    { to: '/get-involved', label: 'Get Involved' },
    { to: '/report-abuse', label: 'Report Abuse' },
    { to: '/podcast', label: 'Podcast' },
    { to: '/resources', label: 'Resources' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      className={`w-full transition-all duration-300 ${
        scrolled ? 'navbar-scrolled' : 'bg-white'
      } ${isMobileMenuOpen ? 'fixed top-0 z-50' : ''}`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
        <div className="flex items-center justify-between h-20 lg:h-28">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                src={Logo}
                alt="InterceptCSA Logo"
                className="navbar-logo h-14 lg:h-14 max-w-[220px] object-contain"
                onError={(e) => {
                  e.currentTarget.src = Logo; // Fallback to same logo
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link px-3 py-2 text-[15px] font-medium ${
                    location.pathname === item.to ? 'active' : ''
                  }`}
                  style={{
                    color: location.pathname === item.to ? colors.primary : colors.text,
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.to) {
                      e.target.style.color = colors.secondary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.to) {
                      e.target.style.color = colors.text;
                    }
                  }}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
              style={{ color: colors.text }}
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        {/* Overlay */}
        <div
          className={`mobile-overlay fixed inset-0 bg-black/50 z-40 ${
            isMobileMenuOpen ? 'open' : ''
          }`}
          onClick={closeMobileMenu}
          style={{
            visibility: isMobileMenuOpen ? 'visible' : 'hidden',
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          }}
          aria-hidden="true"
        />

        {/* Menu Panel */}
        <div
          className={`mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 ${
            isMobileMenuOpen ? 'open' : ''
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold" style={{ color: colors.primary }}>
                Navigation
              </h2>
              <button
                onClick={closeMobileMenu}
                className="mobile-menu-close-button p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
                style={{ color: colors.text }}
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-6">
              <nav className="space-y-1" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`mobile-nav-link block px-6 py-4 text-base font-medium ${
                      location.pathname === item.to ? 'active' : ''
                    }`}
                    style={{
                      color: location.pathname === item.to ? colors.primary : colors.text,
                    }}
                    onClick={closeMobileMenu}
                    aria-current={location.pathname === item.to ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center">
                © {new Date().getFullYear()} InterceptCSA
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;