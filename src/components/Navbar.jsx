import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { colors } from '../utils/colors';
import Logo from '../assets/logo.jpg';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/programs', label: 'What We Do' },
    { to: '/get-involved', label: 'Get Involved' },
    { to: '/report-abuse', label: 'Report Abuse' },
    { to: '/podcast', label: 'Podcast' },
    { to: '/resources', label: 'Resources' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-30 bg-white/95 shadow-lg navbar">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-96 h-96 rounded-full opacity-5 blur-xl transition-all duration-300"
            style={{
              background: `radial-gradient(circle, ${colors.primary}, transparent 70%)`,
              left: `${10 + Math.sin(scrollY * 0.003) * 20}%`,
              top: `${-50 + Math.cos(scrollY * 0.002) * 10}%`,
            }}
          />
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${10 + (i * 30)}%`,
                top: `${30 + (i * 5)}%`,
                animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <Sparkles className="w-2 h-2 text-gray-300" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-300"
            >
              <img
                src={Logo}
                alt="InterceptCSA Logo"
                className="h-12 w-12 object-contain rounded-full shadow-lg border-2 border-white"
                onError={(e) => { e.currentTarget.src = Logo; }}
              />
              <span
                className="text-xl font-bold tracking-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                }}
              >
                InterceptCSA
              </span>
            </Link>

            <div className="hidden custom-lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300"
                  style={{ color: colors.text }}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={isActive ? 'font-semibold' : ''}
                        style={{ color: isActive ? colors.primary : colors.text }}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="custom-lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[200] custom-lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-0 right-0 h-full w-[80vw] max-w-[300px] bg-gradient-to-b from-white to-gray-50 shadow-2xl z-[250] custom-lg:hidden transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-5 border-b border-gray-200">
                <span className="text-xl font-semibold text-gray-800 tracking-wide">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-5 px-4">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 shadow-sm min-w-48 ${
                          isActive ? 'font-semibold bg-gray-100' : 'text-gray-800 hover:bg-gray-100'
                        }`
                      }
                      style={({ isActive }) => ({
                        color: isActive ? colors.primary : undefined,
                        backgroundColor: isActive ? `${colors.primary}10` : undefined,
                      })}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;