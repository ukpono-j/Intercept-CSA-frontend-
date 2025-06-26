import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { colors } from '../utils/colors';

const Solution = () => {
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 md:py-16 text-center relative z-10">
        {/* Header Section */}
        {/* <div className="inline-flex items-center gap-3 bg-gray-100/50 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-200/50">
          <Heart className="w-5 h-5 text-red-400" />
          <span className="text-gray-800 font-semibold">Make a Difference</span>
        </div> */}
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Be a <span className="block bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">Part of the Solution</span>
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
          Your support can change lives. Join us to <span className="text-cyan-500 font-semibold">protect children</span> and <span className="text-rose-500 font-semibold">empower survivors</span> across Nigeria.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/get-involved"
            className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`,
              boxShadow: `0 20px 40px ${colors.secondary}25`
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = `0 25px 50px ${colors.secondary}40`;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = `0 20px 40px ${colors.secondary}25`;
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Volunteer Now
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </span>
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: `linear-gradient(to right, ${colors.secondaryDark}, ${colors.accent})` }}
            />
          </Link>
          <Link
            to="/resources"
            className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
              boxShadow: `0 20px 40px ${colors.primary}25`
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = `0 25px 50px ${colors.primary}40`;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = `0 20px 40px ${colors.primary}25`;
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Resources
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </span>
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Solution;