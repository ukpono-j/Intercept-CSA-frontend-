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

const ImpactfulPrograms = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Users, value: '1 in 4', label: 'Girls Affected', color: 'text-rose-300' },
    { icon: Shield, value: '1 in 6', label: 'Boys Affected', color: 'text-cyan-300' },
    { icon: Target, value: '90%', label: 'Know Their Abuser', color: 'text-amber-300' }
  ];

  const pillars = [
    {
      title: 'Prevention',
      description: 'Educating communities to recognize warning signs and create protective environments for children.',
      icon: Shield,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'Protection',
      description: 'Establishing safe reporting systems and child-friendly spaces where victims can seek help.',
      icon: Heart,
      color: 'from-teal-400 to-teal-600'
    },
    {
      title: 'Support',
      description: 'Providing comprehensive trauma-informed care for survivors and their families.',
      icon: HandHeart,
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      title: 'Empowerment',
      description: 'Building resilient communities with the knowledge and tools to protect their children.',
      icon: Users,
      color: 'from-blue-400 to-blue-600'
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
      {/* Simple Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.primaryLight}, transparent 70%)`,
            left: '10%',
            top: '20%',
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.accent}, transparent 70%)`,
            right: '10%',
            bottom: '20%',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <Heart className="w-5 h-5 text-rose-400" />
            <span className="text-white font-semibold">Our Mission</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Why We Deal with Child Abuse
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Every child deserves protection, healing, and hope. We exist to break the cycle of abuse through prevention, protection, and empowerment.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Reality We Face</h2>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Child sexual abuse is more common than many realize. These statistics drive our commitment to action.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300">
                  <StatIcon className="w-12 h-12 text-white/60 mx-auto mb-4" />
                  <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-lg text-white/80 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="w-6 h-6 text-teal-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Our Model of Change</h2>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We believe lasting change happens through a comprehensive approach that addresses prevention, protection, support, and empowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const PillarIcon = pillar.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${pillar.color} flex-shrink-0`}>
                      <PillarIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                      <p className="text-white/80 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Statement */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 text-center">
            <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Together, We Can End Child Abuse
            </h3>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Through evidence-based prevention programs, community education, and comprehensive support for survivors, we're creating lasting change that protects children and heals communities.
            </p>
            <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-300">500+</div>
                <div className="text-white/70">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300">50+</div>
                <div className="text-white/70">Communities Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300">85%</div>
                <div className="text-white/70">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="space-y-6">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <Link to="/get-involved">
                <button className="relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-lg border-2 border-white/20">
                  <span className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    Learn About Our Programs
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactfulPrograms;