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
    { href: 'https://www.instagram.com/interceptcsa?igsh=MTAxOTN3bTdkdjU5Mw%3D%3D&utm_source=qr', label: 'Instagram', icon: Instagram },
    { href: 'https://www.facebook.com/share/1PDukbzU5g/?mibextid=wwXIfr', label: 'Facebook', icon: Facebook },
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
        {/* Dynamic Background Effects */}
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

          {/* Floating Elements */}
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

        {/* Main Content */}
        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
          {/* Top Section - Mission Statement */}
          <div className="mb-16 text-left">
            <h2 className="footer-text-xl font-bold mb-4" style={{ color: colors.accent }}>
              Intercept CSA Foundation
            </h2>
            <p className="footer-text-base text-white/90 max-w-2xl leading-relaxed">
              Preventing, confronting, and healing child sexual abuse through education, advocacy, and survivor support.
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

            {/* Quick Links */}
            <div className="lg:col-span-4">
              <h3 className="footer-text-lg font-bold mb-6" style={{ color: colors.accent }}>
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.to}
                    href={link.to}
                    className="footer-nav-link footer-text-sm text-white/90 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-4">
              <h3 className="footer-text-lg font-bold mb-6" style={{ color: colors.accent }}>
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="footer-text-sm font-semibold text-white mb-1">Email</div>
                  <a 
                    href="mailto:interceptcsa@gmail.com"
                    className="footer-text-sm text-white/80 hover:text-white transition-colors"
                  >
                    interceptcsa@gmail.com
                  </a>
                </div>
                <div>
                  <div className="footer-text-sm font-semibold text-white mb-1">Phone</div>
                  <a 
                    href="tel:08103350098"
                    className="footer-text-sm text-white/80 hover:text-white transition-colors"
                  >
                    0810 335 0098
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="lg:col-span-4">
              <h3 className="footer-text-lg font-bold mb-6" style={{ color: colors.accent }}>
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
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="footer-text-sm text-white/70">
                © {new Date().getFullYear()} Intercept CSA. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="/privacy" className="footer-text-sm text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="footer-text-sm text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;