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
import './ImpactfulPrograms.css';

const colors = {
  primary: '#0F766E',
  primaryLight: '#14B8A6',
  yellow: '#F59E0B',
  darkTeal: '#134E4A',
  mediumTeal: '#0D9488',
  white: '#FFFFFF',
  gray: '#6B7280'
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
    { icon: Users, value: '1 in 4', label: 'Girls Affected' },
    { icon: Shield, value: '1 in 6', label: 'Boys Affected' },
    { icon: Target, value: '90%', label: 'Know Their Abuser' }
  ];

  const pillars = [
    {
      title: 'First Listener Training',
      description: 'Community-based survivor-informed advocacy training.',
      icon: BookOpen
    },
    {
      title: 'Podcast',
      description: 'CSA awareness and education through honest conversations.',
      icon: Heart
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-20 impactful-programs"
      style={{
        background: `linear-gradient(135deg, ${colors.darkTeal} 0%, ${colors.primary} 50%, ${colors.mediumTeal} 100%)`
      }}
    >
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
            Programs & Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Our programs empower communities and support survivors through education and advocacy.
          </p>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-white/70" />
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
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <StatIcon className="w-10 h-10 text-white/60 mx-auto mb-4" />
                  <div className="text-3xl font-bold mb-2 text-white">
                    {stat.value}
                  </div>
                  <div className="text-base text-white/80 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Target className="w-6 h-6 text-white/70" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Our Approach</h2>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We provide targeted programs to educate, support, and empower communities and survivors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: colors.primaryLight }}>
                      <PillarIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">{pillar.title}</h3>
                      <p className="text-base text-white/80 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center">
            <CheckCircle className="w-12 h-12 text-white/70 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Together, We Can End Child Abuse
            </h3>
            <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Through evidence-based prevention programs, community education, and comprehensive support for survivors, we're creating lasting change that protects children and heals communities.
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="space-y-6">
            <button
              className="font-bold py-3 px-6 rounded-full text-base hover:opacity-90 transition-opacity duration-300 shadow-lg text-white"
              style={{ backgroundColor: colors.yellow }}
              onClick={() => window.location.href = '/get-involved'}
            >
              <span className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                Get Involved
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactfulPrograms;