import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Heart,
  Users,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Target,
  CheckCircle,
  HandHeart,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const colors = {
  primary: '#0F766E', // Dark teal
  primaryLight: '#14B8A6',
  secondary: '#FF5245',
  accent: '#FFC938',
  darkTeal: '#134E4A',
  mediumTeal: '#0D9488',
};

const WhyOurWorkMatters = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    {
      id: 'prevention',
      icon: Shield,
      title: 'Prevention',
      subtitle: 'Saves Lives',
      description: 'We empower communities with cutting-edge tools to recognize and prevent abuse early, creating an unbreakable shield around our children.',
      gradient: 'from-emerald-400 to-emerald-600',
      stats: '85%',
      statsLabel: 'Prevention Success Rate'
    },
    {
      id: 'healing',
      icon: Heart,
      title: 'Healing',
      subtitle: 'Restores Hope',
      description: 'Our innovative safe spaces and transformative creative programs help survivors heal completely, rebuild unshakeable confidence, and embrace an extraordinary future.',
      gradient: 'from-rose-400 to-rose-600',
      stats: '200+',
      statsLabel: 'Lives Transformed'
    },
    {
      id: 'unity',
      icon: Users,
      title: 'Unity',
      subtitle: 'Creates Change',
      description: 'By forging powerful alliances between families, schools, and communities, we build an unstoppable network that protects every child.',
      gradient: 'from-blue-400 to-blue-600',
      stats: '50+',
      statsLabel: 'Communities United'
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-20"
      style={{
        background: `linear-gradient(135deg, ${colors.darkTeal} 0%, ${colors.primary} 50%, ${colors.mediumTeal} 100%)`
      }}
    >
      {/* Background Effects - Matching ImpactfulPrograms */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.primaryLight}, transparent 70%)`,
            left: '10%',
            top: '20%',
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.accent}, transparent 70%)`,
            right: '10%',
            bottom: '20%',
            transform: `translateY(${-scrollY * 0.05}px)`,
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-5 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}, transparent 70%)`,
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translateY(${scrollY * 0.03}px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {/* Header Section - Enhanced */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-white font-semibold">Our Impact Story</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Why Our Work{' '}
            <span
              className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease-in-out infinite'
              }}
            >
              Matters
            </span>
          </h1>

          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Child sexual abuse is a hidden crisis. We're <span className="text-amber-300 font-semibold">breaking the silence</span> through
            education, healing, and united action to <span className="text-teal-300 font-semibold">protect and empower</span> our children.
          </p>
        </div>

        {/* Cards Section - Redesigned to match ImpactfulPrograms style */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isActive = activeCard === card.id;

            return (
              <div
                key={card.id}
                className={`group relative cursor-pointer transition-all duration-700 ${isActive ? 'scale-105 z-20' : 'hover:scale-102'
                  }`}
                onMouseEnter={() => setActiveCard(card.id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none'
                }}
              >
                {/* Card Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                  style={{ backgroundColor: colors.accent }}
                />

                {/* Main Card */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full overflow-hidden group-hover:bg-white/15 transition-all duration-500">

                  {/* Icon Section */}
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${card.gradient}`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                      <p className={`text-lg font-medium bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {card.subtitle}
                      </p>
                    </div>

                    <p className="text-white/80 leading-relaxed">
                      {card.description}
                    </p>

                    {/* Stats */}
                    <div className="pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                            {card.stats}
                          </div>
                          <div className="text-sm text-white/70 font-medium">{card.statsLabel}</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section - Enhanced to match ImpactfulPrograms */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-6">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <Link to="/programs">
                <button className="relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-lg border-2 border-white/20">
                  <span className="flex items-center gap-3">
                    <HandHeart className="w-5 h-5" />
                    Join Our Mission
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
            </div>
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
      `}</style>
    </div>
  );
};

export default WhyOurWorkMatters;