import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { api } from '../utils/api';

// Optimized color palette matching Programs component
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

function ReportAbuse() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isAnonymous: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const sectionsRef = useRef([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      setError('Please provide details of the report.');
      return;
    }
    try {
      const payload = formData.isAnonymous
        ? { message: formData.message }
        : { ...formData };
      await api.post('/reports', payload);
      setSuccess('Report submitted successfully. Thank you for breaking the silence.');
      setError('');
      setFormData({ name: '', email: '', message: '', isAnonymous: false });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report. Please try again.');
      setSuccess('');
    }
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

  const supportInfo = [
    { icon: '🔒', title: 'Confidential', desc: 'All reports are handled with complete confidentiality' },
    { icon: '⚡', title: 'Swift Action', desc: 'We respond to reports within 24 hours' },
    { icon: '💝', title: 'Compassionate Care', desc: 'Professional support throughout the process' },
    { icon: '🛡️', title: 'Safe Environment', desc: 'Your safety and privacy are our top priorities' }
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
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
        }

        .text-gradient {
          background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
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

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex pt-40 pb-32 items-center justify-center text-white section-opacity"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=800&fit=crop" 
          alt="Report Abuse - Break the Silence" 
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
            Break the Silence
          </div>
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Report 
            <span className="block text-teal-300 mt-2">Abuse</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Your voice can make a difference. Report suspicious behavior or known abuse with confidence and confidentiality.
          </p>
          <button 
            onClick={() => document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Submit a Report
          </button>
        </div>
      </section>

      {/* Support Info */}
      <section 
        className="py-16 gradient-bg section-opacity"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportInfo.map((info, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-teal-200">{info.title}</h3>
                <p className="text-teal-100">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Form Section */}
      <section
        id="report-form"
        className="py-20 bg-gray-50 section-opacity"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium mb-6">
              Confidential Reporting
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Submit Your <span className="text-gradient">Report</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              All reports are handled with care and confidentiality. Provide as much detail as possible to help us take action.
            </p>
          </div>

          <div className="form-card rounded-2xl shadow-2xl p-8 sm:p-12">
            {error && (
              <div className="flex items-center bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <svg className="w-6 h-6 text-red-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="flex items-center bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">
                  Your Name (Optional)
                </label>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={formData.isAnonymous}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 transition-all duration-300 ${
                    formData.isAnonymous ? 'bg-gray-100' : 'bg-white hover-lift'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white">
                  Details of the Report
                </label>
                <FormInput
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 transition-all duration-300 bg-white min-h-[150px] resize-y hover-lift"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center text-white text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                    className="mr-3 w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  Submit Anonymously
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-teal-700 hover:bg-gray-100 font-semibold py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Submit Report
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 gradient-bg"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-2xl p-12">
            <div className="inline-block px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-black mb-6">
              Join Our Mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Be Part of the <span className="text-teal-700">Change</span>
            </h2>
            <p className="text-xl text-black mb-10 leading-relaxed max-w-3xl mx-auto">
              Your report is a step toward protecting children and empowering communities. Explore more ways to get involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/get-involved"
                className="px-10 py-4 bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block"
              >
                Get Involved
              </Link>
              <Link
                to="/resources"
                className="px-10 py-4 border-2 border-teal-700 text-black hover:bg-white hover:text-teal-600 font-semibold rounded-full transition-all duration-300 inline-block"
              >
                View Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReportAbuse;