import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FounderImage from "../assets/founderImage.jpg";

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
  community: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop',
  founder: FounderImage, // Corrected to use the direct string path
};

function About() {
  const sectionsRef = useRef([]);
  const [imageErrors, setImageErrors] = useState({});

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

  const pillars = [
    { title: 'Safe Visibility', desc: 'Children seen as children', icon: '👀' },
    { title: 'Everyday Interceptions', desc: 'Protection where children live and play', icon: '🛡️' },
    { title: 'Voice Culture', desc: 'Shame-free storytelling and listening', icon: '🗣️' },
    { title: 'Faith & Culture Reframing', desc: 'Transform harmful beliefs into tools for protection', icon: '🙏' },
    { title: 'Accountability Loops', desc: 'Let the community report to itself', icon: '🔄' }
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
            Our Why
          </div>
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6 leading-tight">
            About <span className="text-teal-300">Intercept CSA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed">
            We exist because silence protects abusers. We exist because culture often doesn’t know what to say. We exist to teach, to interrupt, and to walk with children, not just for them.
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
                To actively prevent child sexual abuse and disrupt cycles of trauma through education, advocacy, and survivor-centered support.
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
                A Safe World for Every Child
              </h3>
              <p className="text-teal-50 text-lg leading-relaxed mb-6">
                A world where child sexual abuse is prevented before it begins, interrupted where it occurs, and survivors are empowered to heal.
              </p>
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300">10K+</div>
                  <div className="text-sm text-teal-100">Lives Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300">500+</div>
                  <div className="text-sm text-teal-100">Survivors Supported</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        className="py-20 bg-gray-50 section-opacity"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
              Our Story
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-gradient">Story</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              InterceptCSA began with a single spark: a vision to break the silence that protects abusers and to create a world where every child is safe. Founded by Inimfon Sampson, our journey started in response to the urgent need for education, advocacy, and healing in Nigerian communities. From our first community workshop to now impacting thousands, we’ve grown into a movement dedicated to prevention, survivor support, and cultural change.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section
        className="py-20 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
              Meet the Founder
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-gradient">Founder</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <img
              src={images.founder}
              alt="Inimfon Sampson, Founder"
              className="w-48 h-48 rounded-full object-cover shadow-lg"
              onError={(e) => {
                if (!imageErrors['founder']) {
                  e.target.src = '/assets/placeholder.jpg';
                  setImageErrors((prev) => ({ ...prev, founder: images.founder }));
                }
              }}
            />
            <div className="text-center md:text-left">
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                “I started this because I saw the gap between pain and protection — and because I believe every story deserves safety.”
              </p>
              <p className="text-lg font-bold text-gray-800">— Inimfon Sampson, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Pillars */}
      <section
        className="py-20 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
              Our Pillars
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-gradient">Pillars</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The core principles guiding our mission to protect and empower
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {pillars.map((obj, index) => (
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
        ref={(el) => (sectionsRef.current[5] = el)}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Join Our <span className="text-gradient">Movement</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Together, we can protect children, empower survivors, and create a safer world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-involved"
                className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;