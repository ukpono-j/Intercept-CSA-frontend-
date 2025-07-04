import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Quote, Star, Play, Sparkles, ArrowRight, Users } from 'lucide-react';

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

const StoryOfHope = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stories = [
    {
      id: 1,
      quote: "Through Intercept CSA's programs, I found a safe space to heal and the courage to speak out. Now, I'm helping others do the same.",
      author: "A Survivor",
      role: "Transformed Advocate",
      highlight: "found a safe space to heal",
      emotion: "healing",
      color: colors.primary,
      gradient: "from-cyan-400 to-teal-600",
      bgGradient: "from-cyan-50 to-teal-100",
      icon: Heart,
      stats: "6 months",
      statsLabel: "Journey to Healing"
    },
    {
      id: 2,
      quote: "The workshops gave me the tools to recognize and prevent abuse in my community. I feel empowered to make a difference.",
      author: "A Community Leader",
      role: "Prevention Champion",
      highlight: "empowered to make a difference",
      emotion: "empowerment",
      color: colors.accent,
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-50 to-orange-100",
      icon: Star,
      stats: "50+",
      statsLabel: "Lives Impacted"
    },
    {
      id: 3,
      quote: "Intercept CSA's support helped my child regain confidence. We're forever grateful for their care and dedication.",
      author: "A Parent",
      role: "Grateful Family",
      highlight: "regain confidence",
      emotion: "gratitude",
      color: colors.secondary,
      gradient: "from-rose-400 to-red-500",
      bgGradient: "from-rose-50 to-red-100",
      icon: Users,
      stats: "100%",
      statsLabel: "Recovery Success"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStory((prev) => (prev + 1) % stories.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, stories.length]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
    setIsPlaying(false);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
    setIsPlaying(false);
  };

  const currentStoryData = stories[currentStory];
  const StoryIcon = currentStoryData.icon;

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 overflow-hidden py-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full opacity-20 animate-bounce"
            style={{
              backgroundColor: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.accent : colors.secondary,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}

        <div 
          className="absolute w-96 h-96 rounded-full opacity-5 pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, ${currentStoryData.color}30, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: `scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-gray-200/50 shadow-lg">
            <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-gray-700 font-semibold">Advocacy. Education. Storytelling. Empowerment.</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-gray-900">Who </span>
            <span 
              className={`bg-gradient-to-r ${currentStoryData.gradient} bg-clip-text text-transparent transition-all duration-1000`}
            >
              We Are
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advocacy. Education. Storytelling. Empowerment.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div 
              className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.005) * 10}px)`
              }}
            >
              <div className="absolute inset-0 opacity-5">
                <div 
                  className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${currentStoryData.gradient} rounded-full blur-3xl`}
                />
                <div 
                  className={`absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr ${currentStoryData.gradient} rounded-full blur-3xl`}
                />
              </div>

              <div className="relative p-8 md:p-16">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <div 
                      className={`p-4 rounded-2xl bg-gradient-to-br ${currentStoryData.gradient} shadow-lg`}
                    >
                      <StoryIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{currentStoryData.emotion}</h3>
                      <p className="text-gray-600 font-medium">{currentStoryData.role}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block text-right">
                    <div className={`text-3xl font-black bg-gradient-to-r ${currentStoryData.gradient} bg-clip-text text-transparent`}>
                      {currentStoryData.stats}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">{currentStoryData.statsLabel}</div>
                  </div>
                </div>

                <div className="relative mb-12">
                  <Quote className="absolute -top-4 -left-2 w-16 h-16 text-gray-200" />
                  <blockquote className="text-2xl md:text-4xl lg:text-5xl text-gray-800 font-light leading-relaxed italic pl-12">
                    "{currentStoryData.quote}"
                  </blockquote>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-16 bg-gradient-to-b ${currentStoryData.gradient} rounded-full`} />
                    <div>
                      <cite className="text-xl md:text-2xl font-bold text-gray-900 not-italic">
                        {currentStoryData.author}
                      </cite>
                      <p className="text-gray-600">{currentStoryData.role}</p>
                    </div>
                  </div>
                  
                  <div className="md:hidden text-right">
                    <div className={`text-2xl font-black bg-gradient-to-r ${currentStoryData.gradient} bg-clip-text text-transparent`}>
                      {currentStoryData.stats}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{currentStoryData.statsLabel}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 -left-16 -right-16 flex justify-between pointer-events-none">
              <button
                onClick={prevStory}
                className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 hover:scale-110 transition-all duration-300 pointer-events-auto group"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </button>
              <button
                onClick={nextStory}
                className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 hover:scale-110 transition-all duration-300 pointer-events-auto group"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-12 gap-4">
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => {
                  setCurrentStory(index);
                  setIsPlaying(false);
                }}
                className={`relative w-16 h-16 rounded-2xl transition-all duration-500 ${
                  index === currentStory ? 'scale-110 shadow-lg' : 'scale-90 opacity-60'
                }`}
                style={{
                  background: index === currentStory 
                    ? `linear-gradient(135deg, ${story.color}, ${story.color}cc)` 
                    : '#e5e7eb'
                }}
              >
                <story.icon className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                {index === currentStory && (
                  <div className="absolute inset-0 rounded-2xl animate-ping" style={{ backgroundColor: `${story.color}40` }} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-20">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-rose-500 to-amber-500 text-white font-bold rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <span className="flex items-center gap-3">
                Read More Stories
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-rose-400 to-amber-400 rounded-full blur-lg opacity-50 -z-10 animate-pulse" />
            </button>
            
            <button className="text-gray-700 hover:text-gray-900 font-semibold text-lg transition-colors duration-300 hover:underline flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Share Your Story
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default StoryOfHope;