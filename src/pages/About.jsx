import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


// Optimized color palette focused on teal and white
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
const images = {
  hero: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=800&fit=crop',
  mission: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
  vision: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
  community: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop'
};

function About() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const objectives = [
    { title: 'Prevent Abuse', desc: 'Education and awareness programs to stop abuse before it happens', icon: '🛡️' },
    { title: 'Support Survivors', desc: 'Comprehensive care and resources for healing and recovery', icon: '💝' },
    { title: 'Empower Communities', desc: 'Building strong, protective networks across Nigeria', icon: '🤝' },
    { title: 'Drive Change', desc: 'Advocating for policies and systems that protect children', icon: '⚖️' }
  ];

  const timeline = [
    { year: '2018', event: 'Foundation established', desc: 'Started our mission to protect Nigerian children' },
    { year: '2021', event: 'Community programs launched', desc: 'Reached 1,000+ families with education' },
    { year: '2024', event: 'Survivor support expanded', desc: 'Comprehensive care for 500+ individuals' },
    { year: '2025', event: 'National impact', desc: 'Targeting 10,000+ lives across Nigeria' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .section-title { font-size: 2rem !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white section-opacity"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 z-10"></div>
        <img
          src={images.hero}
          alt="Community unity"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            Who We Are
          </div>
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6 leading-tight">
            About <span className="text-teal-300">Intercept CSA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed">
            Protecting Nigerian children, empowering survivors, and transforming communities through prevention and healing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/get-involved"
              className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
              Join Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="py-20 gradient-bg section-opacity"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="text-white">
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Preventing Abuse, <span className="text-teal-200">Empowering Lives</span>
              </h2>
              <p className="text-xl text-teal-50 mb-8 leading-relaxed">
                To prevent child sexual abuse through education, support survivors with compassion,
                and create lasting change in Nigerian communities.
              </p>
              <div className="space-y-4">
                {['Prevention Education', 'Survivor Support', 'Community Empowerment'].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-3 h-3 bg-teal-300 rounded-full mr-4"></div>
                    <span className="text-teal-50">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="inline-block px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-medium mb-6">
                Our Vision
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">
                A Safe Nigeria for Every Child
              </h3>
              <p className="text-teal-50 text-lg leading-relaxed mb-6">
                A Nigeria where child sexual abuse is prevented, survivors are empowered to heal,
                and every child grows up safe, protected, and free to thrive.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300">10K+</div>
                  <div className="text-sm text-teal-100">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300">500+</div>
                  <div className="text-sm text-teal-100">Survivors Supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section
        className="py-20 bg-gray-50 section-opacity"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
              Our Journey
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-gradient">Story</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to transforming communities across Nigeria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="text-center hover-lift">
                <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.event}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section
        className="py-20 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
              Our Focus
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-gradient">Objectives</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic goals driving our mission to protect Nigerian children
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((obj, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-100">
                <div className="text-4xl mb-6">{obj.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{obj.title}</h3>
                <p className="text-gray-600 leading-relaxed">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-20 gradient-bg section-opacity"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Join Our <span className="text-gradient">Movement</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Together, we can protect children, empower survivors, and create a safer Nigeria.
              Your support makes the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-involved"
                className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                Get Involved
              </Link>
              {/* <button className="px-8 py-4 border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-semibold rounded-full transition-all duration-300">
                Donate Now
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;