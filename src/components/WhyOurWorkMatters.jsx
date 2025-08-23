import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Heart,
  Users,
  ArrowRight,
  HandHeart,
  Sparkles,
  Target
} from 'lucide-react';

const WhyOurWorkMatters = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
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

  const cards = [
    {
      id: 'prevention',
      icon: Shield,
      title: 'Our Vision',
      description: 'A world where child sexual abuse is prevented before it begins.',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      id: 'healing',
      icon: Heart,
      title: 'Our Mission',
      description: 'To actively prevent child sexual abuse, intervene in at-risk communities, support survivors, and foster safe environments through advocacy and holistic systemic support.',
      gradient: 'from-red-400 to-red-500'
    },
    {
      id: 'partnerships',
      icon: Users,
      title: 'The Five Pillars',
      description: 'Our InterceptCSA Model is built on Safe Visibility, Everyday Interceptions, Voice Culture, Faith & Culture-Rooted Reframing, and Accountability Loops to create resilient, protective communities.',
      gradient: 'from-yellow-400 to-yellow-500'
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="relative py-16 lg:py-20 overflow-hidden"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/20"></div>

      {/* Reduced Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-200/30 to-teal-300/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-yellow-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Compact Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
              Our Goal
            </span>
          </h1>

          <p className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed text-slate-600 font-light">
            To achieve our vision through Intervention & Prevention, Survivor Support, Safe Environments, Allyship, and Holistic Systemic Support, disrupting cycles of trauma and protecting vulnerable children.
          </p>
        </div>

        {/* Compact Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className={`group relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 lg:p-7 h-full shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Section */}
                  <div className="mb-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-md transform transition-all duration-300 group-hover:scale-105`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-sm lg:text-base leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>

                  {/* Subtle Hover Effect Arrow */}
                  <div className={`mt-4 transform transition-all duration-300 ${hoveredCard === card.id ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-0'
                    }`}>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-4">
            <button className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-full text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              {/* Button Content */}
              <span className="relative flex items-center gap-3">
                <HandHeart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span>Who We Are</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>

              {/* Subtle Shine Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyOurWorkMatters;