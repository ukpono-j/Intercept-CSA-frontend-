import React, { useState, useEffect } from 'react';
import { Shield, Heart, Users, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const colors = {
  primary: '#2A8E9D',
  primaryDark: '#237985',
  secondary: '#FF5245',
  secondaryDark: '#E04339',
  accent: '#FFC938',
  text: '#374050',
  warm50: '#FFF7ED',
  warm100: '#FEEBC8',
};

const WhyOurWorkMatters = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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
      color: colors.primary,
      gradient: 'from-cyan-400 to-teal-600',
      bgGradient: 'from-cyan-50 to-teal-100',
      stats: '85%',
      statsLabel: 'Prevention Success Rate'
    },
    {
      id: 'healing',
      icon: Heart,
      title: 'Healing',
      subtitle: 'Restores Hope',
      description: 'Our innovative safe spaces and transformative creative programs help survivors heal completely, rebuild unshakeable confidence, and embrace an extraordinary future.',
      color: colors.secondary,
      gradient: 'from-rose-400 to-red-500',
      bgGradient: 'from-rose-50 to-red-100',
      stats: '200+',
      statsLabel: 'Lives Transformed'
    },
    {
      id: 'unity',
      icon: Users,
      title: 'Unity',
      subtitle: 'Creates Change',
      description: 'By forging powerful alliances between families, schools, and communities, we build an unstoppable network that protects every child.',
      color: colors.accent,
      gradient: 'from-amber-400 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-100',
      stats: '50+',
      statsLabel: 'Communities United'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.primary}40, transparent 70%)`,
            top: '10%',
            left: '5%',
            transform: `translateY(${scrollY * 0.1}px)`,
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-25 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.accent}40, transparent 70%)`,
            top: '60%',
            right: '10%',
            transform: `translateY(${-scrollY * 0.15}px)`,
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-30 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}40, transparent 70%)`,
            top: '30%',
            right: '30%',
            transform: `translateY(${scrollY * 0.05}px)`,
            animation: 'float 10s ease-in-out infinite'
          }}
        />
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-white opacity-30 rotate-45 animate-bounce" style={{animationDelay: '0s'}} />
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-cyan-400 opacity-40 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-rose-400 opacity-35 rotate-12 animate-bounce" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-20 w-2 h-2 bg-amber-400 opacity-50 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 text-sm font-medium">Our Impact Story</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="text-white">Why Our Work</span>
            <br />
            <span 
              className="bg-gradient-to-r from-cyan-400 via-rose-400 to-amber-400 bg-clip-text text-transparent animate-pulse"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease-in-out infinite'
              }}
            >
              Matters
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
            Child sexual abuse is a hidden crisis in Nigeria. We're <span className="text-cyan-400 font-semibold">breaking the silence</span> through 
            education, healing, and united action to <span className="text-rose-400 font-semibold">protect and empower</span> our children.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isActive = activeCard === card.id;
            
            return (
              <div
                key={card.id}
                className={`group relative cursor-pointer transition-all duration-700 ${
                  isActive ? 'scale-105 z-20' : 'hover:scale-102'
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
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl`}
                  style={{ backgroundColor: card.color }}
                />
                
                {/* Main Card */}
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full overflow-hidden group-hover:bg-white/15 transition-all duration-500">
                  {/* Card Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className={`w-full h-full bg-gradient-to-br ${card.gradient} rounded-full blur-2xl`} />
                  </div>
                  
                  {/* Icon Section */}
                  <div className="relative mb-6">
                    <div 
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/30 rounded-full animate-ping" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{card.title}</h3>
                      <p className={`text-lg font-medium bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {card.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {card.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`text-3xl font-black bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                            {card.stats}
                          </div>
                          <div className="text-xs text-white/60 font-medium">{card.statsLabel}</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block relative group">
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-rose-400 to-amber-400 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            
            {/* Main Button */}
            <button className="relative bg-gradient-to-r from-cyan-500 via-rose-500 to-amber-500 text-white font-bold py-6 px-12 rounded-full text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-white/20 backdrop-blur-sm">
              <span className="flex items-center gap-3">
                Join Our Mission
                <div className="flex items-center gap-1">
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  <Sparkles className="w-5 h-5 animate-spin" />
                </div>
              </span>
            </button>
          </div>
          
          <p className="mt-6 text-white/60 font-medium">
            Together, we can create a safer future for every child
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
};

export default WhyOurWorkMatters;