import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sparkles, Menu, X, ChevronDown } from 'lucide-react';
import { colors } from '../utils/colors';
import Logo from '../assets/logo.jpg';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/programs', label: 'What We Do' },
    // {
    //   label: 'Get Help',
    //   dropdown: [
    //     { to: '/get-involved', label: 'Get Involved' },
    //     { to: '/report-abuse', label: 'Report Abuse' },
    //   ]
    // },
    { to: '/get-involved', label: 'Get Involved' },
    { to: '/report-abuse', label: 'Report Abuse' },
    { to: '/podcast', label: 'Podcast' },
    { to: '/resources', label: 'Resources' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Fixed function to handle dropdown item clicks
  const handleDropdownClick = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-30 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-96 h-96 rounded-full opacity-5 blur-3xl transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${colors.primary}, transparent 70%)`,
              left: `${10 + Math.sin(scrollY * 0.003) * 20}%`,
              top: `${-50 + Math.cos(scrollY * 0.002) * 10}%`,
            }}
          />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${10 + (i * 25)}%`,
                top: `${30 + (i * 5)}%`,
                animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            >
              <Sparkles className="w-2 h-2 text-gray-300" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-300"
            >
              <img
                src={Logo}
                alt="InterceptCSA Logo"
                className="h-14 w-14 object-contain rounded-full shadow-lg border-2 border-white"
                onError={(e) => { e.currentTarget.src = Logo; }}
              />
              <span
                className="text-2xl font-bold tracking-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`
                }}
              >
                InterceptCSA
              </span>
            </Link>

            <div className="hidden lg:flex items-center" ref={dropdownRef}>
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                        style={{ color: colors.text }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {activeDropdown === index && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[110]">
                          {item.dropdown.map((dropdownItem, dropIndex) => (
                            <NavLink
                              key={dropdownItem.to}
                              to={dropdownItem.to}
                              onClick={handleDropdownClick}
                              className={({ isActive }) =>
                                `block px-6 py-3 text-sm font-medium transition-all duration-200 ${isActive
                                  ? 'font-semibold'
                                  : 'text-gray-700 hover:bg-gray-50'
                                }`
                              }
                              style={({ isActive }) => ({
                                color: isActive ? colors.primary : undefined,
                                borderLeft: isActive ? `4px solid ${colors.primary}` : 'none'
                              })}
                            >
                              {dropdownItem.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200"
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
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
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
            className="fixed inset-0 bg-black/50 z-[200] lg:hidden"
            onClick={closeMobileMenu}
          />

          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-white to-gray-50 shadow-2xl z-[250] lg:hidden transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <span className="text-xl font-semibold text-gray-800 tracking-wide">Menu</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-3 px-6">
                  {navItems.map((item, index) => (
                    <div key={index}>
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="flex items-center justify-between w-full px-4 py-3 text-left text-base font-medium text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 shadow-sm"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                            />
                          </button>

                          {activeDropdown === index && (
                            <div className="mt-2 ml-4 space-y-1">
                              {item.dropdown.map((dropdownItem) => (
                                <NavLink
                                  key={dropdownItem.to}
                                  to={dropdownItem.to}
                                  onClick={handleDropdownClick}
                                  className="block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                >
                                  {dropdownItem.label}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <NavLink
                          to={item.to}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            `block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 shadow-sm ${isActive
                              ? 'font-semibold bg-gray-100'
                              : 'text-gray-800 hover:bg-gray-100'
                            }`
                          }
                          style={({ isActive }) => ({
                            color: isActive ? colors.primary : undefined,
                            backgroundColor: isActive ? `${colors.primary}10` : undefined
                          })}
                        >
                          {item.label}
                        </NavLink>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  );
}

export default Navbar;