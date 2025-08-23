import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Programs.css';

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
              entry.target.classList.add('program-animate-in');
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
        // { label: 'Join a Webinar', to: '/webinar' }
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
    <div className="program-container pt-14 min-h-screen bg-white" id="hero-section">
      {/* Hero Section */}
      <section 
        className="program-section relative min-h-screen flex pt-36 pb-24 items-center justify-center text-white program-section-opacity"
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
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-400/10 rounded-full blur-xl program-floating-element"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-amber-400/10 rounded-full blur-xl program-floating-element" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-teal-300/10 rounded-full blur-xl program-floating-element" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          {/* <div className="program-badge inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full program-text-sm font-medium mb-8 border border-white/30">
            Our Impact Programs
          </div> */}
          <h1 className="program-hero-title font-bold mb-8 leading-tight">
            Transforming Lives Through 
            <span className="block text-teal-300 mt-2">Powerful Programs</span>
          </h1>
          <p className="program-text-lg mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Empowering communities through prevention, education, and healing to combat child sexual abuse and create lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
              className="program-btn-primary px-8 py-3 bg-[#F59E0B] hover:bg-[#F59E0B]-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl program-text-base"
            >
              Explore Programs
            </button>
            <Link 
              to="/get-involved"
              className="program-btn-outline px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-teal-800 font-semibold rounded-full transition-all duration-300 inline-block text-center program-text-base"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        className="program-section py-20 bg-gray-50 program-section-opacity"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="program-section-title font-bold text-gray-800 mb-6">
              Our <span className="program-text-gradient">Programs</span>
            </h2>
            <p className="program-text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive initiatives designed to prevent abuse, support survivors, and empower communities.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {programs.map((program, index) => (
              <article
                key={index}
                className="program-card rounded-2xl overflow-hidden program-hover-lift shadow-lg"
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
                  <div className="absolute top-4 right-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center program-text-lg">
                      {program.icon}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="program-text-xl font-bold mb-4 leading-tight text-gray-800 hover:text-teal-700 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 program-text-sm leading-relaxed mb-6 line-clamp-3">
                    {program.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      {(program.buttons || []).map((button, btnIndex) => (
                        <Link
                          key={btnIndex}
                          to={button.to}
                          className="program-btn-primary inline-flex items-center px-6 py-2.5 bg-[#F59E0B] hover:bg-[#F59E0B]-700 text-white program-text-sm font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
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
                          className="program-btn-primary inline-flex items-center px-6 py-2.5 bg-[#F59E0B] hover:bg-[#F59E0B]-700 text-white program-text-sm font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
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
                      <div className="program-text-sm text-gray-500">Program {index + 1}</div>
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
        className="program-section py-20 program-gradient-bg program-section-opacity"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="program-section-title font-bold text-white mb-6">
                How We <span className="">Create Change</span>
              </h2>
              <p className="program-text-lg text-teal-100 mb-8 leading-relaxed">
                Our comprehensive approach combines prevention, intervention, and healing to create lasting impact in communities.
              </p>
              
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Community Education', desc: 'Raising awareness about CSA prevention through targeted programs' },
                  { step: '02', title: 'Survivor Support', desc: 'Providing comprehensive care and healing resources' },
                  { step: '03', title: 'System Change', desc: 'Advocating for policies and practices that protect children' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold mr-4 group-hover:bg-white group-hover:text-teal-700 transition-all duration-300 program-text-base">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="program-text-base font-bold text-white mb-2 group-hover:text-teal-200 transition-colors">{item.title}</h3>
                      <p className="program-text-sm text-teal-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl transform rotate-3 program-pulse-bg"></div>
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
        className="program-section py-20 bg-white program-section-opacity"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="program-glass-card rounded-2xl p-12">
            <h2 className="program-section-title font-bold text-black mb-6">
              Support Our <span className="text-[#237985]">Programs</span>
            </h2>
            <p className="program-text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Get involved to help us protect children and empower communities. Every contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/get-involved"
                className="program-btn-primary px-8 py-3 bg-[#F59E0B] text-[#fff] font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block program-text-base"
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