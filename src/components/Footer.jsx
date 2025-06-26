import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Facebook } from 'lucide-react';
import { colors } from '../utils/colors';
import Logo from '../assets/logo.jpg';

function Footer() {
  const footerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/programs', label: 'Programs' },
    { to: '/get-involved', label: 'Get Involved' },
    { to: '/report-abuse', label: 'Report Abuse' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
    { to: '/resources', label: 'Resources' },
  ];

  const socialLinks = [
    { href: 'https://instagram.com/interceptcsa', label: 'Instagram', icon: Instagram },
    { href: 'https://facebook.com/Intercept-Child-Sexual-Abuse-Foundation', label: 'Facebook', icon: Facebook },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-r from-[#2A8E9D] to-[#237985] py-12 text-white overflow-hidden"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${colors.accent}50, transparent 70%)`,
            left: `${20 + Math.sin(scrollY * 0.005) * 10}%`,
            top: `${10 + Math.cos(scrollY * 0.003) * 15}%`,
          }}
        />
        {/* Floating Elements */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Sparkles className="w-3 h-3 text-white/50" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Logo & Description */}
        <div>
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105">
            <img
              src={Logo}
              alt="Intercept CSA - Child Protection Organization"
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain rounded-full shadow-md border border-white/20"
              onError={(e) => (e.currentTarget.src = Logo)}
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Intercept CSA
            </span>
          </Link>
          <p className="text-sm mt-4 text-white/80 max-w-xs">
            Preventing, confronting, and healing child sexual abuse through education, advocacy, and survivor support.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <h3 className="text-lg font-semibold">Quick Links</h3>
          </div>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/90 hover:bg-gradient-to-r hover:from-[#FF5245] hover:to-[#FFC938] hover:bg-clip-text hover:text-transparent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <h3 className="text-lg font-semibold">Contact Us</h3>
          </div>
          <p className="text-sm text-white/80 mb-2">Email: interceptcsa@gmail.com</p>
          <p className="text-sm text-white/80 mb-4">Phone: 0810 335 0098</p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:bg-gradient-to-r hover:from-[#FF5245] hover:to-[#FFC938] hover:bg-clip-text hover:text-transparent transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <Icon className="w-5 h-5" />
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-white/70 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} Intercept CSA. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;