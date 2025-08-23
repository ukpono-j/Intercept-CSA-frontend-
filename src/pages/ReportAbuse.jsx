import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Professional color palette optimized for NGO
const colors = {
  primary: '#0f766e',      // Teal-700
  primaryLight: '#14b8a6', // Teal-500
  primaryDark: '#134e4a',  // Teal-800
  accent: '#f59e0b',       // Amber-500 (your preferred button color)
  accentHover: '#d97706',  // Amber-600
  text: '#1f2937',         // Gray-800
  textLight: '#6b7280',    // Gray-500
  white: '#ffffff',
  gray50: '#f9fafb',
  teal50: '#f0fdfa',
};

// Mock FormInput component
const FormInput = ({ type, className, ...props }) => {
  if (type === 'textarea') {
    return <textarea className={className} {...props} />;
  }
  return <input type={type} className={className} {...props} />;
};

// Mock Button component
const Button = ({ children, className, ...props }) => {
  return <button className={className} {...props}>{children}</button>;
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
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Report submitted successfully. Thank you for breaking the silence.');
      setError('');
      setFormData({ name: '', email: '', message: '', isAnonymous: false });
    } catch (err) {
      setError('Failed to submit report. Please try again.');
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

        /* Form section specific styling */
        .form-section-bg {
          background: linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #059669 100%);
          position: relative;
        }

        .form-section-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.05"/><circle cx="80" cy="40" r="1" fill="white" opacity="0.05"/><circle cx="40" cy="60" r="1" fill="white" opacity="0.05"/><circle cx="90" cy="80" r="1" fill="white" opacity="0.05"/><circle cx="10" cy="90" r="1" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
          pointer-events: none;
        }

        .form-decorative-element {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .form-decorative-1 {
          top: 5%;
          left: 8%;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.1);
          animation: float 10s ease-in-out infinite;
        }

        .form-decorative-2 {
          top: 15%;
          right: 12%;
          width: 80px;
          height: 80px;
          background: rgba(245, 158, 11, 0.15);
          animation: float 10s ease-in-out infinite reverse;
          animation-delay: 3s;
        }

        .form-decorative-3 {
          bottom: 20%;
          left: 10%;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.08);
          animation: float 10s ease-in-out infinite;
          animation-delay: 6s;
        }

        .form-decorative-4 {
          bottom: 10%;
          right: 5%;
          width: 60px;
          height: 60px;
          background: rgba(245, 158, 11, 0.12);
          animation: float 10s ease-in-out infinite reverse;
          animation-delay: 1s;
        }

        .form-card {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
        }

        .form-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .btn-primary {
          background-color: ${colors.accent};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary:hover {
          background-color: ${colors.accentHover};
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
        }

        .btn-secondary {
          border: 2px solid ${colors.accent};
          color: ${colors.accent};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-secondary:hover {
          background-color: ${colors.accent};
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(245, 158, 11, 0.2);
        }

        /* Responsive Typography */
        @media (max-width: 640px) {
          .hero-title { 
            font-size: 2.5rem !important; 
            line-height: 1.1 !important;
          }
          .hero-subtitle { 
            font-size: 1.125rem !important; 
          }
          .section-title { 
            font-size: 2rem !important; 
          }
          .section-subtitle { 
            font-size: 1rem !important; 
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .hero-title { 
            font-size: 3.5rem !important; 
          }
          .hero-subtitle { 
            font-size: 1.25rem !important; 
          }
          .section-title { 
            font-size: 2.5rem !important; 
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-title { 
            font-size: 4rem !important; 
          }
          .hero-subtitle { 
            font-size: 1.375rem !important; 
          }
          .section-title { 
            font-size: 3rem !important; 
          }
        }

        @media (min-width: 1025px) {
          .hero-title { 
            font-size: 4.5rem !important; 
          }
          .hero-subtitle { 
            font-size: 1.5rem !important; 
          }
          .section-title { 
            font-size: 3.5rem !important; 
          }
        }

        /* Enhanced form styling */
        .form-input {
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .form-input:focus {
          border-color: ${colors.accent};
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
          outline: none;
        }

        .form-input:disabled {
          background-color: rgba(255, 255, 255, 0.5);
          cursor: not-allowed;
        }

        /* Improved mobile spacing */
        @media (max-width: 640px) {
          .mobile-px { padding-left: 1rem; padding-right: 1rem; }
          .mobile-py { padding-top: 1rem; padding-bottom: 1rem; }
        }

        /* Professional animations */
        .scale-hover {
          transition: transform 0.2s ease-in-out;
        }

        .scale-hover:hover {
          transform: scale(1.02);
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* CTA section specific styling */
        .cta-card {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 253, 250, 0.9));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(15, 118, 110, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .cta-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .cta-icon {
          display: inline-block;
          margin-right: 0.5rem;
          font-size: 1.2em;
        }

        .decorative-element {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .decorative-1 {
          top: 10%;
          left: 5%;
          width: 80px;
          height: 80px;
          background: ${colors.primary};
          animation: float 8s ease-in-out infinite;
        }

        .decorative-2 {
          top: 20%;
          right: 10%;
          width: 60px;
          height: 60px;
          background: ${colors.accent};
          animation: float 8s ease-in-out infinite reverse;
          animation-delay: 2s;
        }

        .decorative-3 {
          bottom: 15%;
          left: 15%;
          width: 100px;
          height: 100px;
          background: ${colors.primaryLight};
          animation: float 8s ease-in-out infinite;
          animation-delay: 4s;
        }
      `}</style>

      {/* Hero Section */}
      <section 
      id="hero-section"
        className="relative min-h-screen flex items-center justify-center text-white section-opacity"
        style={{ paddingTop: '8rem', paddingBottom: '4rem' }}
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
        
        <div className="relative z-20 text-center mobile-px max-w-6xl mx-auto">
          <h1 className="hero-title font-bold mb-6 md:mb-8 leading-tight">
            Report 
            <span className="block text-teal-300 mt-2">Abuse</span>
          </h1>
          <p className="hero-subtitle mb-8 md:mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Your voice can make a difference. Report suspicious behavior or known abuse with confidence and confidentiality.
          </p>
          <button 
            onClick={() => document.getElementById('report-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary px-8 md:px-10 py-3 md:py-4 text-white font-semibold rounded-full scale-hover shadow-lg text-sm md:text-base"
          >
            Submit a Report
          </button>
        </div>
      </section>

      {/* Support Info */}
      <section 
        className="py-12 md:py-16 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="max-w-7xl mx-auto mobile-px">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {supportInfo.map((info, index) => (
              <div key={index} className="text-center text-gray-800 p-4 rounded-lg scale-hover">
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{info.icon}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2 text-teal-700">{info.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Form Section */}
      <section
        id="report-form"
        className="py-16 md:py-20 form-section-bg section-opacity relative overflow-hidden"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        {/* Decorative background elements */}
        <div className="form-decorative-element form-decorative-1"></div>
        <div className="form-decorative-element form-decorative-2"></div>
        <div className="form-decorative-element form-decorative-3"></div>
        <div className="form-decorative-element form-decorative-4"></div>
        
        <div className="max-w-4xl mx-auto mobile-px relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="mb-4 md:mb-6">
              <span className="text-4xl md:text-5xl">📝</span>
            </div>
            <h2 className="section-title font-bold text-white mb-4 md:mb-6">
              Submit Your <span className="text-amber-300">Report</span>
            </h2>
            <p className="section-subtitle text-teal-100 max-w-3xl mx-auto leading-relaxed">
              All reports are handled with care and confidentiality. Provide as much detail as possible to help us take action.
            </p>
          </div>

          <div className="form-card rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12">
            {error && (
              <div className="flex items-start bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <svg className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="flex items-start bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Your Name (Optional)
                </label>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={formData.isAnonymous}
                  className={`form-input w-full px-4 py-3 rounded-lg text-gray-900 text-sm md:text-base ${
                    formData.isAnonymous 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : 'bg-white hover-lift'
                  }`}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address (Optional)
                </label>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={formData.isAnonymous}
                  className={`form-input w-full px-4 py-3 rounded-lg text-gray-900 text-sm md:text-base ${
                    formData.isAnonymous 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : 'bg-white hover-lift'
                  }`}
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Details of the Report <span className="text-red-500">*</span>
                </label>
                <FormInput
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-input w-full px-4 py-3 rounded-lg text-gray-900 text-sm md:text-base bg-white min-h-[120px] md:min-h-[150px] resize-y hover-lift"
                  placeholder="Please provide as much detail as possible about the incident or concern..."
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center text-gray-700 text-sm font-medium cursor-pointer hover:text-gray-900 transition-colors">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                    className="mr-3 w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                  />
                  Submit this report anonymously
                </label>
              </div>

              <Button
                onClick={handleSubmit}
                className="btn-primary w-full text-white font-semibold py-3 md:py-4 rounded-full shadow-lg text-sm md:text-base hover-lift"
              >
                <span className="inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Report
                </span>
              </Button>
              
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your report is completely secure and confidential
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated with white background */}
      <section
        className="py-16 md:py-20 bg-white section-opacity relative overflow-hidden"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        {/* Decorative background elements */}
        <div className="decorative-element decorative-1"></div>
        <div className="decorative-element decorative-2"></div>
        <div className="decorative-element decorative-3"></div>
        
        <div className="max-w-4xl mx-auto mobile-px text-center relative z-10">
          <div className="cta-card rounded-2xl p-8 md:p-12 hover-lift">
            <div className="mb-6 md:mb-8">
              <span className="cta-icon">🤝</span>
              <h2 className="section-title font-bold text-gray-800 mb-4 md:mb-6 inline-block">
                Be Part of the <span className="text-gradient">Change</span>
              </h2>
            </div>
            
            <p className="section-subtitle text-gray-600 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
              Your report is a crucial step toward protecting children and empowering communities. Together, we can create a safer world for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <Link
                to="/get-involved"
                className="btn-primary px-8 md:px-10 py-3 md:py-4 text-white font-semibold rounded-full scale-hover shadow-lg inline-block text-sm md:text-base"
              >
                <span className="cta-icon">🌟</span>
                Get Involved
              </Link>
              <Link
                to="/resources"
                className="btn-secondary px-8 md:px-10 py-3 md:py-4 font-semibold rounded-full inline-block text-sm md:text-base"
              >
                <span className="cta-icon">📚</span>
                View Resources
              </Link>
            </div>
            
            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 leading-relaxed">
                <span className="cta-icon">🔒</span>
                All reports are handled with strict confidentiality and professional care
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReportAbuse;