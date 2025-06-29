import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../utils/colors';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './GetInvolved.css';
import SupportGroup from "../assets/people-meeting-support-group.jpg";

// Optimized color palette matching Programs component
const themeColors = {
  primary: '#0f766e',
  primaryLight: '#14b8a6',
  primaryDark: '#134e4a',
  accent: '#f59e0b',
  text: '#1f2937',
  textLight: '#6b7280',
  white: '#ffffff',
  gray50: '#f9fafb',
  teal50: '#f0fdfa',
};

function GetInvolved() {
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const sectionsRef = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!volunteerForm.name.trim()) newErrors.name = 'Full name is required';
    if (!volunteerForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(volunteerForm.email)) {
      newErrors.email = 'Invalid email address';
    }
    return newErrors;
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    alert('Thank you for your interest! We will contact you soon.');
    setVolunteerForm({ name: '', email: '', message: '' });
  };

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

    return () => observer.disconnect();
  }, []);

  const ways = [
    {
      title: 'Volunteer',
      description: 'Join our team of dedicated volunteers helping to protect children and support survivors.',
      icon: '🤝',
      action: 'Start Here',
      link: '#volunteer',
      stats: '800+ volunteers',
      category: 'Direct Impact'
    },
    {
      title: 'Partner',
      description: 'Collaborate with us to create safe environments in your community or organization.',
      icon: '🤝',
      action: 'Partner Now',
      link: '/contact',
      stats: '150+ partners',
      category: 'Collaboration'
    },
    {
      title: 'Donate',
      description: 'Support our mission with financial contributions to fund programs and resources.',
      icon: '💝',
      action: 'Coming Soon',
      link: '/contact',
      stats: 'Every ₦ counts',
      category: 'Support'
    }
  ];

  const impact = [
    { number: '1,000+', label: 'Volunteers Trained', icon: '👥' },
    { number: '150+', label: 'Organizations Partnered', icon: '🤝' },
    { number: '5,000+', label: 'People Educated', icon: '📚' },
    { number: '500+', label: 'Survivors Supported', icon: '💝' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .section-opacity {
          opacity: 0;
        }

        .gradient-bg {
          background: linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.primaryLight} 100%);
        }

        .text-gradient {
          background: linear-gradient(135deg, ${themeColors.primary}, ${themeColors.primaryLight});
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
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
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .way-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
          border: 1px solid rgba(15, 118, 110, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .way-card:hover {
          background: rgba(255,255,255,0.95);
          border-color: ${themeColors.primaryLight};
        }

        .category-badge {
          background: linear-gradient(135deg, ${themeColors.primary}20, ${themeColors.primaryLight}20);
          color: ${themeColors.primary};
          border: 1px solid ${themeColors.primary}30;
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .form-card {
          background: linear-gradient(145deg, rgba(15, 118, 110, 0.95), rgba(20, 184, 166, 0.9));
          backdrop-filter: blur(10px);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .section-title { font-size: 2rem !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex pt-36 pb-24 items-center justify-center text-white section-opacity"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop" 
          alt="Get Involved" 
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
            Make a Difference
          </div>
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Get <span className="block text-teal-300 mt-2">Involved</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Join Intercept CSA to prevent child sexual abuse, empower survivors, and build safer Nigerian communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => document.getElementById('ways')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Ways
            </button>
            <button 
              onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-teal-800 font-semibold rounded-full transition-all duration-300"
            >
              Volunteer Now
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section 
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
      </section>

      {/* Ways to Get Involved */}
      <section
        id="ways"
        className="py-20 bg-gray-50 section-opacity"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
              Ways to Help
            </div>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ways to <span className="text-gradient">Get Involved</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose how you'd like to make a difference in protecting children and supporting survivors.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {ways.map((way, index) => (
              <article
                key={index}
                className="way-card rounded-2xl p-8 hover-lift shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                  {way.icon}
                </div>
                
                <div className="mb-4">
                  <span className="category-badge inline-block px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm mb-2">
                    {way.category}
                  </span>
                  <div className="text-sm text-amber-600 font-semibold">{way.stats}</div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-800">{way.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{way.description}</p>
                
                <a
                  href={way.link}
                  className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
                >
                  <span className="relative z-10">{way.action}</span>
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section
        id="volunteer"
        className="py-20 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Volunteer <span className="text-gradient">Application</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Join our team of dedicated volunteers making a real difference in children's lives.
            </p>
          </div>
          
          <div className="form-card rounded-2xl shadow-2xl p-8 sm:p-12 text-white">
            <form onSubmit={handleVolunteerSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FormInput
                    label="Full Name"
                    type="text"
                    name="name"
                    value={volunteerForm.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full border-b-2 ${
                      errors.name ? 'border-red-400' : 'border-white/50'
                    } focus:border-white text-white bg-transparent placeholder-white/70 pb-2`}
                  />
                  {errors.name && <p className="text-red-300 text-sm mt-2">{errors.name}</p>}
                </div>
                
                <div>
                  <FormInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={volunteerForm.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full border-b-2 ${
                      errors.email ? 'border-red-400' : 'border-white/50'
                    } focus:border-white text-white bg-transparent placeholder-white/70 pb-2`}
                  />
                  {errors.email && <p className="text-red-300 text-sm mt-2">{errors.email}</p>}
                </div>
              </div>
              
              <div>
                <FormInput
                  label="Why do you want to volunteer with us?"
                  type="textarea"
                  name="message"
                  value={volunteerForm.message}
                  onChange={handleInputChange}
                  className="w-full border-b-2 border-white/50 focus:border-white text-white bg-transparent placeholder-white/70 pb-2 min-h-24"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-white text-teal-700 hover:bg-gray-100 font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section
        className="py-20 bg-gray-50 section-opacity"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl transform rotate-3 opacity-20"></div>
              <img
                src={SupportGroup}
                alt="Partnership"
                className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div>
              <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
                Partnership
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Partner <span className="text-gradient">With Us</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We collaborate with churches, schools, and organizations to create safe environments and promote child protection.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Training and capacity building',
                  'Resource development and sharing',
                  'Joint advocacy and awareness campaigns',
                  'Safe environment consultations'
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <span className="relative z-10">Start Partnership</span>
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 gradient-bg section-opacity"
        ref={(el) => (sectionsRef.current[5] = el)}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Ready to Make a <span className="text-teal-700">Difference?</span>
            </h2>
            <p className="text-xl text-black mb-10 leading-relaxed max-w-3xl mx-auto">
              Join thousands of Nigerians working together to protect children and support survivors. Your involvement matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Volunteer Today
              </button>
              <Link
                to="/contact"
                className="px-10 py-4 border-2 border-teal-700 text-black hover:bg-white hover:text-teal-600 font-semibold rounded-full transition-all duration-300 inline-block"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetInvolved;