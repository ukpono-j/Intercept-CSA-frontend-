import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Heart,
  Users,
  ArrowRight,
  HandHeart
} from 'lucide-react';
import './WhyOurWorkMatters.css';

const colors = {
  primary: '#0D9488', // Teal
  primaryLight: '#14B8A6', // Lighter teal
  white: '#FFFFFF',
  darkTeal: '#134E4A',
  gray: '#6B7280',
  lightGray: '#F9FAFB',
  orange: '#F59E0B', // Hero button orange
  orangeHover: '#F59E0B' // Hero button hover orange
};

const WhyOurWorkMatters = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cards = [
    {
      id: 'prevention',
      icon: Shield,
      title: 'Prevention & Training',
      description: 'We empower communities with tools to recognize and prevent abuse early, creating protection around our children.',
      stats: '85%',
      statsLabel: 'Prevention Success Rate'
    },
    {
      id: 'healing',
      icon: Heart,
      title: 'Survivor Support',
      description: 'Our safe spaces and creative programs help survivors heal, rebuild confidence, and embrace their future.',
      stats: '200+',
      statsLabel: 'Lives Transformed'
    },
    {
      id: 'partnerships',
      icon: Users,
      title: 'Faith & Culture Partnerships',
      description: 'By partnering with faith and cultural institutions, we build a network that protects every child.',
      stats: '50+',
      statsLabel: 'Communities United'
    },
    {
      id: 'safe-environments',
      icon: Shield,
      title: 'Safe Environments',
      description: 'We create safe environments through education and advocacy, ensuring children are protected in their communities.',
      stats: '100+',
      statsLabel: 'Safe Spaces Created'
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="why-our-work-matters py-16 bg-white"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: colors.primary }}>
            Our Goal
          </h1>

          <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: colors.gray }}>
            To actively prevent child sexual abuse from spreading within communities, intervene in the lives of at-risk children, and disrupt cycles of trauma for survivors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="bg-white border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-300"
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: isVisible ? 'slideInUp 0.8s ease-out forwards' : 'none'
                }}
              >
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg" style={{ backgroundColor: colors.lightGray }}>
                    <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.darkTeal }}>
                    {card.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: colors.gray }}>
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-6">
            <a href="/about">
              <button
                className="text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: colors.orange }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.orangeHover;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.orange;
                }}
              >
                <span className="flex items-center gap-3">
                  <HandHeart className="w-5 h-5" />
                  Who We Are
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyOurWorkMatters;