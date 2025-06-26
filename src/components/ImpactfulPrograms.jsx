import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Palette, 
  ArrowRight, 
  Sparkles, 
  Target, 
  Heart,
  BookOpen,
  Shield,
  Lightbulb,
  Award,
  TrendingUp
} from 'lucide-react';
import CSAWorkshop from '../assets/support-group.jpg';
import CreativeHealing from '../assets/creative-healing.jpg';

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

const ImpactfulPrograms = () => {
  const [activeProgram, setActiveProgram] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
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

  const programs = [
    {
      id: 'community-education',
      title: 'Community Education',
      subtitle: 'Building Awareness Together',
      description: 'Comprehensive workshops that empower communities with knowledge, tools, and strategies to recognize, prevent, and respond to child sexual abuse effectively.',
      image: CSAWorkshop,
      icon: Users,
      color: colors.primary,
      gradient: 'from-cyan-400 to-teal-600',
      bgGradient: 'from-cyan-50 to-teal-100',
      features: [
        'Interactive Workshops',
        'Community Training',
        'Prevention Strategies',
        'Awareness Campaigns'
      ],
      impact: {
        number: '500+',
        label: 'Community Members Trained'
      },
      stats: [
        { icon: Target, value: '85%', label: 'Awareness Increase' },
        { icon: Users, value: '50+', label: 'Communities Reached' },
        { icon: TrendingUp, value: '200%', label: 'Engagement Growth' }
      ]
    },
    {
      id: 'creative-healing',
      title: 'Creative Healing',
      subtitle: 'Art Therapy & Recovery',
      description: 'Innovative therapeutic programs using art, music, and creative expression to help survivors heal, rebuild confidence, and discover their inner strength.',
      image: CreativeHealing,
      icon: Palette,
      color: colors.secondary,
      gradient: 'from-rose-400 to-red-500',
      bgGradient: 'from-rose-50 to-red-100',
      features: [
        'Art Therapy Sessions',
        'Music & Movement',
        'Creative Expression',
        'Trauma Recovery'
      ],
      impact: {
        number: '150+',
        label: 'Survivors Supported'
      },
      stats: [
        { icon: Heart, value: '95%', label: 'Recovery Success' },
        { icon: Sparkles, value: '300+', label: 'Healing Sessions' },
        { icon: Award, value: '100%', label: 'Participant Satisfaction' }
      ]
    }
  ];

  const currentProgram = programs[activeProgram];
  const ProgramIcon = currentProgram.icon;

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden py-20"
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${currentProgram.color}60, transparent 70%)`,
            left: `${20 + Math.sin(scrollY * 0.005) * 10}%`,
            top: `${10 + Math.cos(scrollY * 0.003) * 15}%`,
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${colors.accent}50, transparent 70%)`,
            right: `${10 + Math.sin(scrollY * 0.007) * 15}%`,
            bottom: `${20 + Math.cos(scrollY * 0.004) * 10}%`,
          }}
        />

        {/* Interactive Mouse Effect */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10 pointer-events-none transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${currentProgram.color}40, transparent 70%)`,
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            transform: `scale(${isHovered ? 1.5 : 1})`
          }}
        />

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
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
            {i % 2 === 0 ? (
              <div className="w-3 h-3 bg-white rounded-full" />
            ) : (
              <Sparkles className="w-4 h-4 text-white" />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <Target className="w-5 h-5 text-cyan-400" />
            <span className="text-white/90 font-semibold">Transforming Lives</span>
            <Lightbulb className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">Our </span>
            <span 
              className={`bg-gradient-to-r ${currentProgram.gradient} bg-clip-text text-transparent transition-all duration-1000`}
            >
              Impactful Programs
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Innovative solutions designed to <span className="text-cyan-400 font-semibold">educate communities</span>, 
            <span className="text-rose-400 font-semibold"> heal survivors</span>, and 
            <span className="text-amber-400 font-semibold"> create lasting change</span>.
          </p>
        </div>

        {/* Program Showcase */}
        <div className="max-w-7xl mx-auto">
          {/* Program Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <button
                    key={program.id}
                    onClick={() => setActiveProgram(index)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-500 ${
                      index === activeProgram 
                        ? 'bg-white/20 text-white shadow-lg scale-105' 
                        : 'text-white/70 hover:text-white/90 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold hidden sm:block">{program.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Program Display */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Program Content */}
              <div className="space-y-8">
                {/* Program Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div 
                      className={`p-4 rounded-2xl bg-gradient-to-br ${currentProgram.gradient} shadow-lg`}
                    >
                      <ProgramIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {currentProgram.title}
                      </h2>
                      <p className={`text-lg bg-gradient-to-r ${currentProgram.gradient} bg-clip-text text-transparent font-semibold`}>
                        {currentProgram.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-white/80 leading-relaxed">
                    {currentProgram.description}
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {currentProgram.features.map((feature, index) => (
                    <div 
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentProgram.gradient}`} />
                        <span className="text-white/90 font-medium">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  {currentProgram.stats.map((stat, index) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <StatIcon className="w-5 h-5 text-white/60" />
                        <div>
                          <div className={`text-2xl font-bold bg-gradient-to-r ${currentProgram.gradient} bg-clip-text text-transparent`}>
                            {stat.value}
                          </div>
                          <div className="text-sm text-white/60">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Program Visual */}
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl blur-xl" />
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 overflow-hidden">
                    {/* Image Display */}
                    <div 
                      className="relative h-80 rounded-2xl overflow-hidden"
                    >
                      <img 
                        src={currentProgram.image} 
                        alt={currentProgram.title} 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Animated Overlay */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${currentProgram.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                      />
                    </div>

                    {/* Impact Card */}
                    <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-center">
                        <div className={`text-4xl font-black bg-gradient-to-r ${currentProgram.gradient} bg-clip-text text-transparent`}>
                          {currentProgram.impact.number}
                        </div>
                        <div className="text-white/70 font-medium mt-1">
                          {currentProgram.impact.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400/20 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400/20 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="space-y-8">
            {/* Main CTA */}
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-rose-400 to-amber-400 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <button className="relative bg-gradient-to-r from-cyan-500 via-rose-500 to-amber-500 text-white font-bold py-6 px-12 rounded-full text-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-white/20">
                <span className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Discover All Programs
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="text-white/80 hover:text-white font-semibold text-lg transition-colors duration-300 hover:underline flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Join a Program
              </button>
              <span className="text-white/40 hidden sm:block">•</span>
              <button className="text-white/80 hover:text-white font-semibold text-lg transition-colors duration-300 hover:underline flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Support Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactfulPrograms;