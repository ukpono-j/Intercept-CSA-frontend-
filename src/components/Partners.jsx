import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Sparkles, ChevronDown, Users } from 'lucide-react';
import PartnerLogo from '../assets/partner_logo.png';
import { colors } from '../utils/colors';

const Button = ({ variant, children }) => {
  const baseStyles = 'relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:-translate-y-1';
  const variantStyles = variant === 'primary' 
    ? {
        background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`,
        boxShadow: `0 20px 40px ${colors.secondary}25`
      }
    : {
        background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
        boxShadow: `0 20px 40px ${colors.primary}25`
      };

  return (
    <button
      className={`${baseStyles} group`}
      style={variantStyles}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = `0 25px 50px ${variant === 'primary' ? colors.secondary : colors.primary}40`;
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = `0 20px 40px ${variant === 'primary' ? colors.secondary : colors.primary}25`;
      }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </span>
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, ${variant === 'primary' ? colors.secondaryDark : colors.primaryDark}, ${variant === 'primary' ? colors.accent : colors.primary})` }}
      />
    </button>
  );
};

const Partners = () => {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activePartner, setActivePartner] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight * 0.8);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const partners = [
    {
      id: 'partner1',
      name: 'SafeFuture Foundation',
      description: 'Pioneering child safety education with innovative programs.',
      logo: PartnerLogo,
      gradient: 'from-yellow-400 to-orange-600',
      impact: '100+ Schools Reached',
      story: 'Trained 500+ educators in 2024, reducing incidents by 30%.'
    },
    {
      id: 'partner2',
      name: 'ProtectKids Network',
      description: 'Creating safe spaces and resources for vulnerable children.',
      logo: PartnerLogo,
      gradient: 'from-teal-400 to-cyan-600',
      impact: '50+ Communities Served',
      story: 'Supported 1,000+ families through community hubs in 2023.'
    },
    {
      id: 'partner3',
      name: 'Hope Alliance',
      description: 'Driving change through prevention and survivor support.',
      logo: PartnerLogo,
      gradient: 'from-rose-400 to-red-600',
      impact: '200+ Lives Impacted',
      story: 'Helped 200+ survivors rebuild confidence with healing programs.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-24"
      style={{ 
        background: `linear-gradient(135deg, ${colors.darkTeal} 0%, ${colors.primary} 50%, ${colors.mediumTeal} 100%)` 
      }}
    >
      <div className="absolute inset-0 bg-[#237985] pointer-events-none">
        <div 
          className="absolute w-96  h-96 rounded-full opacity-10 blur-3xl transition-all duration-1000"
          style={{
            left: `${15 + Math.sin(scrollY * 0.004) * 10}%`,
            top: `${20 + Math.cos(scrollY * 0.002) * 15}%`,
            transform: `translateY(${scrollY * 0.05}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${colors.accent}20, transparent 70%)`,
            right: `${15 + Math.sin(scrollY * 0.006) * 10}%`,
            bottom: `${20 + Math.cos(scrollY * 0.003) * 10}%`,
            transform: `translateY(${-scrollY * 0.05}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-08 blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}25, transparent 70%)`,
            right: `${30 + Math.cos(scrollY * 0.005) * 15}%`,
            top: `${25 + Math.sin(scrollY * 0.003) * 10}%`,
            transform: `translateY(${scrollY * 0.04}px)`
          }}
        />
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-15 animate-float"
            style={{
              left: i % 2 === 0 ? `${Math.random() * 40}%` : `${60 + Math.random() * 40}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            {i % 2 === 0 ? (
              <div className="w-4 h-4 bg-white/20 rounded-full" />
            ) : (
              <Sparkles className="w-5 h-5 text-white/30" />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl py-12">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-100 shadow-sm">
            <Shield className="w-6 h-6 text-orange-500" />
            <span className="text-gray-800 font-semibold text-lg">Our Partners</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            United for{' '}
            <span 
              className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease-in-out infinite'
              }}
            >
              Child Safety
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Our partners are the cornerstone of our mission, uniting expertise and passion to protect children and empower communities.
          </p>
        </div>

        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className={`group relative max-w-sm w-full transition-all duration-700 ${
                  activePartner === partner.id ? 'scale-105 z-20' : 'hover:scale-102'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none'
                }}
                onMouseEnter={() => setActivePartner(partner.id)}
                onMouseLeave={() => setActivePartner(null)}
              >
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl`}
                  style={{ background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})` }}
                />
                
                <div className="relative bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${partner.gradient}`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  {/* <p className={`text-lg font-medium bg-gradient-to-r ${partner.gradient} bg-clip-text text-transparent`}>
                    {partner.impact}
                  </p> */}
                  <p className="text-gray-600 text-base leading-relaxed mt-3 mb-4">{partner.description}</p>
                  {/* <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 italic">"{partner.story}"</p>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Partners;