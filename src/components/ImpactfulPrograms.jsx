import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Heart,
  ArrowRight,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  HandHeart,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const colors = {
  primary: '#0F766E',
  primaryLight: '#14B8A6',
  yellow: '#FFC938',
  darkTeal: '#2A8E9D',
  mediumTeal: '#2A8E9D',
  white: '#FFFFFF',
  gray: '#6B7280'
};

const ImpactfulPrograms = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users, value: '1 in 4', label: 'Girls Affected', description: 'Young girls face disproportionate risks' },
    { icon: Shield, value: '1 in 6', label: 'Boys Affected', description: 'Boys are also vulnerable to abuse' },
    { icon: Target, value: '90%', label: 'Know Their Abuser', description: 'Most cases involve trusted individuals' }
  ];

  const programs = [
    {
      title: 'First Listener Training',
      description: 'Comprehensive community-based survivor-informed advocacy training that equips individuals with the skills to provide initial support and create safe spaces for disclosure.',
      icon: BookOpen,
      features: ['Community-based approach', 'Survivor-informed', 'Professional certification']
    },
    {
      title: 'Educational Podcast',
      description: 'Breaking the silence through honest, educational conversations about child sexual abuse awareness, prevention strategies, and healing journeys.',
      icon: Heart,
      features: ['Expert interviews', 'Survivor stories', 'Prevention education']
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.darkTeal} 0%, ${colors.primary} 50%, ${colors.mediumTeal} 100%)`
      }}
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Hero Section with Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" style={{ color: colors.yellow }} />
              <span className="text-sm font-semibold uppercase tracking-wider text-white/70">Our Impact</span>
            </div> */}
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              Programs That
              <span className="block" style={{ color: colors.yellow }}>Transform Lives</span>
            </h1>

            <p className="text-lg text-white/80 leading-relaxed mb-8">
              We believe in the power of education, advocacy, and community support to create lasting change. Our evidence-based programs are designed to prevent abuse and support healing.
            </p>

            <Link to="/programs">
              <button
                className="group inline-flex items-center gap-3 font-semibold py-4 px-8 rounded-full text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 relative overflow-hidden"
                style={{ backgroundColor: colors.yellow, color: colors.primary }}
              >
                <BookOpen className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                Explore Programs
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />

                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </Link>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 rounded-3xl backdrop-blur-sm"></div>
              <div className="relative p-8 rounded-3xl border border-white/10">
                <CheckCircle className="w-12 h-12 mb-6" style={{ color: colors.yellow }} />
                <h3 className="text-2xl font-bold text-white mb-4">Making a Difference</h3>
                <p className="text-white/80 leading-relaxed">
                  Through evidence-based prevention programs, community education, and comprehensive support, we're creating protective environments where children can thrive safely.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tabs */}
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'stats'
                  ? 'bg-white text-gray-700 shadow-lg'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                The Challenge
              </button>
              <button
                onClick={() => setActiveTab('programs')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'programs'
                  ? 'bg-white text-gray-700 shadow-lg'
                  : 'text-white/70 hover:text-white'
                  }`}
              >
                Our Solutions
              </button>
            </div>
          </div>

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Understanding the Reality</h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  These sobering statistics fuel our determination to create change
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {stats.map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:transform hover:scale-105"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="text-center">
                        <div className="inline-flex p-3 rounded-full mb-4" style={{ backgroundColor: colors.primaryLight + '40' }}>
                          <StatIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-4xl font-bold mb-2 text-white">
                          {stat.value}
                        </div>
                        <div className="text-lg font-semibold mb-2" style={{ color: colors.yellow }}>
                          {stat.label}
                        </div>
                        <p className="text-sm text-white/70">{stat.description}</p>
                      </div>

                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <div className="animate-fade-in">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Our Strategic Programs</h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto">
                  Comprehensive approaches to prevention, education, and support
                </p>
              </div>

              <div className="space-y-8">
                {programs.map((program, index) => {
                  const ProgramIcon = program.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/8 transition-all duration-500"
                    >
                      <div className="grid lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl" style={{ backgroundColor: colors.yellow }}>
                              <ProgramIcon className="w-6 h-6" style={{ color: colors.primary }} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                          </div>
                          <p className="text-base text-white/80 leading-relaxed mb-6">
                            {program.description}
                          </p>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="font-semibold text-white mb-4">Key Features:</h4>
                          <ul className="space-y-2">
                            {program.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                                <CheckCircle className="w-4 h-4" style={{ color: colors.yellow }} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <HandHeart className="w-16 h-16 mx-auto mb-6" style={{ color: colors.yellow }} />
          <h3 className="text-3xl font-bold text-white mb-4">Join Our Mission</h3>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Every action counts in the fight against child sexual abuse. Together, we can create safer communities and brighter futures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <button
                className="group font-semibold py-3 px-8 rounded-full text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 relative overflow-hidden"
                style={{ backgroundColor: colors.yellow, color: colors.primary }}
              >
                Get Involved Today
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactfulPrograms;