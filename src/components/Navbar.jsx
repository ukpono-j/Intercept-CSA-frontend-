import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Heart, AlertCircle, Mic, BookOpen, FileText, Mail } from 'lucide-react';
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

  // Toggle body scroll when mobile menu opens/closes
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About Us', icon: Users },
    { to: '/programs', label: 'What We Do', icon: Heart },
    { to: '/get-involved', label: 'Get Involved', icon: Users },
    { to: '/report-abuse', label: 'Report Abuse', icon: AlertCircle },
    { to: '/podcast', label: 'Podcast', icon: Mic },
    { to: '/resources', label: 'Resources', icon: BookOpen },
    { to: '/blog', label: 'Blog', icon: FileText },
    { to: '/contact', label: 'Contact Us', icon: Mail },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Spacer div to prevent content from hiding behind fixed navbar */}
      <div className="navbar-spacer"></div>
      
      <nav
        className={`navbar-fixed w-full transition-all duration-300 ${
          scrolled ? 'navbar-scrolled' : 'bg-white'
        }`}
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
          {/* Backdrop */}
          <div
            className={`mobile-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Redesigned Sidebar Menu */}
          <div
            className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Sidebar Header */}
            <div className="sidebar-header">
              <div className="sidebar-logo-section">
                <img
                  src={Logo}
                  alt="InterceptCSA"
                  className="sidebar-logo"
                />
              </div>
              <button
                onClick={closeMobileMenu}
                className="sidebar-close-btn"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="sidebar-nav">
              <div className="nav-section">
                <h3 className="nav-section-title">Navigation</h3>
                <div className="nav-links">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={`sidebar-nav-link ${
                          location.pathname === item.to ? 'active' : ''
                        }`}
                        onClick={closeMobileMenu}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        aria-current={location.pathname === item.to ? 'page' : undefined}
                      >
                        <div className="nav-link-content">
                          <IconComponent size={20} className="nav-link-icon" />
                          <span className="nav-link-text">{item.label}</span>
                        </div>
                        {location.pathname === item.to && (
                          <div className="active-indicator"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;