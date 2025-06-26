import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Quote } from 'lucide-react';
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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-12 md:py-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Gradient Orbs */}
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

        {/* Interactive Mouse Effect */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10 pointer-events-none transition-all duration-500"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}40, transparent 70%)`,
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            transform: `scale(${isHovered ? 1.5 : 1})`
          }}
        />

        {/* Floating Elements */}
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

      {/* Image Section */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={HoldingHands}
          alt="Community members uniting for child protection"
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center relative -mt-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto border border-gray-200/50">
          <div className="inline-flex items-center gap-3 bg-gray-100/50 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-200/50">
            <Quote className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-800 font-semibold">Voices of Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Voices of <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Change</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8 italic">
            “Intercept CSA’s training transformed our school. We now know how to protect our students and support those who need help.” – A Teacher
          </p>
          <Link to="/blog">
            <Button variant="primary">Hear More Voices</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Voices;