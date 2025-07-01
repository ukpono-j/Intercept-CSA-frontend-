import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Optimized color palette matching About component
const colors = {
  primary: '#0f766e',      // Teal-700
  primaryLight: '#14b8a6', // Teal-500
  primaryDark: '#134e4a',  // Teal-800
  accent: '#f59e0b',       // Amber-500
  text: '#1f2937',         // Gray-800
  textLight: '#6b7280',    // Gray-500
  white: '#ffffff',
  gray50: '#f9fafb',
  teal50: '#f0fdfa',
};

// Dummy images - replace with your actual images
const programImages = {
  training: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  workshops: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
  survivor: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
  faith: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop',
  hero: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=800&fit=crop'
};

function Programs() {
  const sectionsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      title: 'First Listener Training',
      description: 'A safe-space response training for everyday people on how to listen without harm when a child discloses abuse.',
      image: programImages.training,
      icon: '👂',
      stats: '800+ trained',
      category: 'Training',
      buttons: [
        { label: 'Book a Training', to: '/book-training' },
        { label: 'Join a Webinar', to: '/webinar' }
      ]
    },
    {
      title: 'Community Workshops',
      description: 'From neighborhoods to schools, our training brings child protection into everyday life.',
      image: programImages.workshops,
      icon: '🏘️',
      stats: '50+ communities',
      category: 'Workshops'
    },
    {
      title: 'Survivor Support (Coming Soon)',
      description: 'We’re building survivor-centered partnerships to offer trauma-informed counseling, legal aid, and long-term healing options.',
      image: programImages.survivor,
      icon: '💝',
      stats: 'In Development',
      category: 'Healing'
    },
    {
      title: 'Faith + Cultural Allyship',
      description: 'We work with faith leaders, men, and caregivers to rewrite the stories that often protect abusers instead of children.',
      image: programImages.faith,
      icon: '🙏',
      stats: '150+ partners',
      category: 'Partnership'
    }
  ];

  const impact = [
    { number: '10,000+', label: 'Lives Impacted', icon: '👥' },
    { number: '500+', label: 'Survivors Supported', icon: '💝' },
    { number: '200+', label: 'Communities Reached', icon: '🏘️' },
    { number: '1,000+', label: 'Volunteers Trained', icon: '🙋‍♀️' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .slide-in {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .gradient-bg {
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
        }

        .text-gradient {
          background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-opacity {
          opacity: 0;
        }

        .program-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
          border: 1px solid rgba(15, 118, 110, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .program-card:hover {
          background: rgba(255,255,255,0.95);
          border-color: ${colors.primaryLight};
        }

        .category-badge {
          background: linear-gradient(135deg, ${colors.primary}20, ${colors.primaryLight}20);
          color: ${colors.primary};
          border: 1px solid ${colors.primary}30;
        }

        .stats-badge {
          background: linear-gradient(135deg, ${colors.accent}, #f97316);
          color: white;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .section-title { font-size: 2rem !important; }
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .pulse-bg {
          animation: pulse-bg 4s ease-in-out infinite;
        }

        @keyframes pulse-bg {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex pt-36 pb-24 items-center justify-center text-white section-opacity"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 z-10"></div>
        <img 
          src={programImages.hero} 
          alt="Our Programs" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Floating background elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-400/10 rounded-full blur-xl floating-element"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-amber-400/10 rounded-full blur-xl floating-element" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-teal-300/10 rounded-full blur-xl floating-element" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/30">
            Our Impact Programs
          </div>
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Transforming Lives Through 
            <span className="block text-teal-300 mt-2">Powerful Programs</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Empowering communities through prevention, education, and healing to combat child sexual abuse and create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Programs
            </button>
            <Link 
              to="/get-involved"
              className="px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-teal-800 font-semibold rounded-full transition-all duration-300 inline-block text-center"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      {/* <section 
        className="py-16 gradient-bg section-opacity"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-teal-200">{stat.number}</div>
                <div className="text-lg text-teal-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Programs Section */}
      <section
        id="programs"
        className="py-20 bg-gray-50 section-opacity"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
              Our Initiatives
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-gradient">Programs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive initiatives designed to prevent abuse, support survivors, and empower communities.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((program, index) => (
              <article
                key={index}
                className="program-card rounded-2xl overflow-hidden hover-lift shadow-lg"
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category and Stats Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="category-badge inline-block px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm">
                      {program.category}
                    </span>
                    <span className="stats-badge inline-block px-3 py-1 text-xs font-bold rounded-full">
                      {program.stats}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl">
                      {program.icon}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 leading-tight text-gray-800 hover:text-teal-700 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      {(program.buttons || []).map((button, btnIndex) => (
                        <Link
                          key={btnIndex}
                          to={button.to}
                          className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
                          aria-label={button.label}
                        >
                          <span className="relative z-10">{button.label}</span>
                          <svg
                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      ))}
                      {!program.buttons && (
                        <Link
                          to="/resources"
                          className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
                          aria-label={`Learn more about ${program.title}`}
                        >
                          <span className="relative z-10">Learn More</span>
                          <svg
                            className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Program {index + 1}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section 
        className="py-20 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
                Our Approach
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                How We <span className="text-gradient">Create Change</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our comprehensive approach combines prevention, intervention, and healing to create lasting impact in communities.
              </p>
              
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Community Education', desc: 'Raising awareness about CSA prevention through targeted programs' },
                  { step: '02', title: 'Survivor Support', desc: 'Providing comprehensive care and healing resources' },
                  { step: '03', title: 'System Change', desc: 'Advocating for policies and practices that protect children' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold mr-4 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl transform rotate-3 pulse-bg"></div>
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=500&fit=crop"
                alt="Community impact" 
                className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 gradient-bg section-opacity"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-2xl p-12">
            <div className="inline-block px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-black mb-6">
              Join Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Support Our <span className="text-[#237985]">Programs</span>
            </h2>
            <p className="text-xl text-black mb-10 leading-relaxed max-w-3xl mx-auto">
              Get involved to help us protect children and empower communities. Every contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/get-involved"
                className="px-10 py-4 bg-teal-700 text-[#fff] font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Programs;