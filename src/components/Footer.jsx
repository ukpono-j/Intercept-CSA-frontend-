import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Instagram, Facebook } from 'lucide-react';

// Your brand colors
const colors = {
  primary: '#374050', // deep navy-gray
  secondary: '#2A8E9D', // teal
  accent: '#FFC938', // golden yellow
  coral: '#FF5245', // coral-red
  text: '#374050',
  white: '#ffffff'
};

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
    <>
      <style jsx>{`
        /* Typography - Mobile First (320px+) */
        .footer-text-sm {
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .footer-text-base {
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .footer-text-lg {
          font-size: 1rem;
          line-height: 1.6;
        }

        .footer-text-xl {
          font-size: 1.125rem;
          line-height: 1.6;
        }

        /* Small Mobile (375px+) */
        @media (min-width: 375px) {
          .footer-text-sm { font-size: 0.8125rem; }
          .footer-text-base { font-size: 0.9375rem; }
          .footer-text-lg { font-size: 1.125rem; }
          .footer-text-xl { font-size: 1.25rem; }
        }

        /* Large Mobile (425px+) */
        @media (min-width: 425px) {
          .footer-text-sm { font-size: 0.875rem; }
          .footer-text-base { font-size: 1rem; }
          .footer-text-lg { font-size: 1.25rem; }
          .footer-text-xl { font-size: 1.375rem; }
        }

        /* Small Tablet (640px+) */
        @media (min-width: 640px) {
          .footer-text-sm { font-size: 0.9375rem; }
          .footer-text-base { font-size: 1.0625rem; }
          .footer-text-lg { font-size: 1.375rem; }
          .footer-text-xl { font-size: 1.5rem; }
        }

        /* Medium Tablet (768px+) */
        @media (min-width: 768px) {
          .footer-text-sm { font-size: 1rem; }
          .footer-text-base { font-size: 1.125rem; }
          .footer-text-lg { font-size: 1.5rem; }
          .footer-text-xl { font-size: 1.625rem; }
        }

        /* Large Tablet (1024px+) */
        @media (min-width: 1024px) {
          .footer-text-sm { font-size: 0.875rem; }
          .footer-text-base { font-size: 1rem; }
          .footer-text-lg { font-size: 1.25rem; }
          .footer-text-xl { font-size: 1.375rem; }
        }

        /* Desktop (1280px+) */
        @media (min-width: 1280px) {
          .footer-text-sm { font-size: 0.9375rem; }
          .footer-text-base { font-size: 1.0625rem; }
          .footer-text-lg { font-size: 1.3rem; }
          .footer-text-xl { font-size: 1.5rem; }
        }

        .footer-logo-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-logo-link:hover {
          opacity: 0.8;
          transform: scale(1.05);
        }

        .footer-nav-link {
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-nav-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: ${colors.accent};
          transition: width 0.3s ease;
        }

        .footer-nav-link:hover::before {
          width: 100%;
        }

        .footer-social-link {
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-social-link:hover {
          transform: translateY(-2px);
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      <footer
        ref={footerRef}
        className="relative overflow-hidden py-16 text-white"
        style={{ backgroundColor: colors.secondary }}
      >
        {/* Dynamic Background Effects - Your original animations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated Gradient Orbs */}
          <div
            className="absolute w-48 h-48 rounded-full opacity-20 blur-3xl transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${colors.accent}50, transparent 70%)`,
              left: `${20 + Math.sin(scrollY * 0.005) * 10}%`,
              top: `${10 + Math.cos(scrollY * 0.003) * 15}%`,
            }}
          />
          <div
            className="absolute w-32 h-32 rounded-full opacity-15 blur-2xl transition-all duration-700"
            style={{
              background: `radial-gradient(circle, ${colors.coral}40, transparent 60%)`,
              right: `${15 + Math.cos(scrollY * 0.004) * 8}%`,
              bottom: `${20 + Math.sin(scrollY * 0.006) * 12}%`,
            }}
          />

          {/* Floating Elements - Your original sparkles */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `bounce ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <Sparkles className="w-3 h-3 text-white/50" />
            </div>
          ))}
        </div>

        {/* Main Content - Improved Structure */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">

            {/* Logo & Description - Better spacing */}
            <div className="lg:col-span-2">
              <p className="footer-text-base text-white/90 max-w-md leading-relaxed mb-8">
                Preventing, confronting, and healing child sexual abuse through education, advocacy, and survivor support.
              </p>

              {/* Contact Info - Better organized */}
              <div className="space-y-3">
                <div className="footer-text-sm text-white/80">
                  <strong style={{ color: colors.accent }}>Email:</strong> interceptcsa@gmail.com
                </div>
                <div className="footer-text-sm text-white/80">
                  <strong style={{ color: colors.accent }}>Phone:</strong> 0810 335 0098
                </div>
              </div>
            </div>

            {/* Navigation Links - Better layout */}
            <div>
              <h3
                className="footer-text-lg font-semibold mb-6"
                style={{ color: colors.accent }}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <a
                      href={link.to}
                      className="footer-nav-link footer-text-sm text-white/90 hover:text-white block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media - Better presentation */}
            <div>
              <h3
                className="footer-text-lg font-semibold mb-6"
                style={{ color: colors.accent }}
              >
                Connect With Us
              </h3>
              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link footer-text-sm text-white/90 hover:text-white"
                    >
                      <Icon className="w-5 h-5" />
                      <span>{social.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Emergency Notice */}
              {/* <div
                className="mt-8 p-4 rounded-lg border-l-4"
                style={{
                  backgroundColor: 'rgba(255, 82, 69, 0.15)',
                  borderLeftColor: colors.coral
                }}
              >
                <p className="footer-text-sm text-white">
                  <span style={{ color: colors.coral, fontWeight: 'bold' }}>Emergency:</span>
                  <span className="block mt-1">If you or a child is in immediate danger, contact emergency services.</span>
                </p>
              </div> */}
            </div>
          </div>

          {/* Copyright - Cleaner design */}
          <div className="pt-8 border-t border-white/20 text-center">
            <p className="footer-text-sm text-white/70">
              © {new Date().getFullYear()} Intercept CSA. All rights reserved.
              <span className="mx-2">•</span>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="mx-2">•</span>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;