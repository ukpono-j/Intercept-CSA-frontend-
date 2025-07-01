import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Quote, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import HoldingHands from '../assets/close-up-people-holding-hands.jpg';
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

const Voices = () => {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight * 0.8);
      }
    };

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-12 md:py-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${colors.primary}60, transparent 70%)`,
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
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10 pointer-events-none transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}40, transparent 70%)`,
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            transform: `scale(${isHovered ? 1.5 : 1})`
          }}
        />
        {[...Array(6)].map((_, i) => (
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
              <div className="w-3 h-3 bg-gray-300 rounded-full" />
            ) : (
              <Sparkles className="w-4 h-4 text-gray-400" />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200/50">
            <Quote className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-800 font-semibold">Voices of Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Voices of{' '}
            <span 
              className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease-in-out infinite'
              }}
            >
              Change
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Hear the stories of those whose lives have been transformed through our work, creating a ripple effect of hope and protection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={HoldingHands}
              alt="Community members uniting for child protection"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-200/50">
            <Quote className="w-8 h-8 text-yellow-500 mb-4 mx-auto" />
            <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
              “Intercept CSA’s training transformed our school. We now know how to protect our students and support those who need help.” – A Teacher
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/blog">
                <Button variant="primary">Hear More Voices</Button>
              </Link>
              <Link to="/stories" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                More Stories
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
      `}</style>
    </section>
  );
};

export default Voices;