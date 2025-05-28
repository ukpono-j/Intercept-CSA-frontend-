import { useState, useEffect, useRef } from 'react';
import { colors } from '../utils/colors';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { api } from '../utils/api';
import './ReportAbuse.css';

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
    setFormData((prev) => ({
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
              entry.target.classList.add('animate-section');
            }, index * 250);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black opacity-0"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-yellow-300 to-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-28 lg:py-32">
          <div className="text-center">
            <div className="mb-6 mt-10">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20">
                Break the Silence
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight animate-hero-title">
              Report <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Abuse</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light animate-hero-text">
              Your voice can make a difference. Report suspicious behavior or known abuse with confidence and confidentiality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#report-form"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10">Submit a Report</span>
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Report Form Section */}
      <section
        id="report-form"
        className="relative py-16 md:py-24 opacity-0"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-slate-100">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-2xl blur opacity-20 transition duration-1000"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              Submit Your Report
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 text-center">
              All reports are handled with care and confidentiality. Provide as much detail as possible to help us take action.
            </p>
            {error && (
              <div className="flex items-center bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <svg
                  className="w-6 h-6 text-red-600 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="flex items-center bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <svg
                  className="w-6 h-6 text-green-600 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Your Name (Optional)
                </label>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={formData.isAnonymous}
                  className={`w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 animate-input ${
                    formData.isAnonymous ? 'bg-slate-50' : 'bg-white'
                  }`}
                  style={{ animationDelay: '0s' }}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Your Email (Optional)
                </label>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={formData.isAnonymous}
                  className={`w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 animate-input ${
                    formData.isAnonymous ? 'bg-slate-50' : 'bg-white'
                  }`}
                  style={{ animationDelay: '0.1s' }}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Details of the Report
                </label>
                <FormInput
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 bg-white min-h-[150px] resize-y animate-input"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center text-slate-600 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                    className="mr-2 w-4 h-4 text-yellow-500 border-slate-300 focus:ring-yellow-500 rounded"
                  />
                  Submit Anonymously
                </label>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 rounded-full py-3 text-lg font-semibold"
                aria-label="Submit report form"
              >
                Submit Report
              </Button>
            </form>
          </div>
        </div>
        <svg
          className="absolute bottom-0 w-full h-24 text-slate-100 opacity-50"
          viewBox="0 0 1440 80"
        >
          <path
            fill="currentColor"
            d="M0,40C48,60,96,20,144,40C192,60,240,20,288,40C336,60,384,20,432,40C480,60,528,20,576,40C624,60,672,20,720,40C768,60,816,20,864,40C912,60,960,20,1008,40C1056,60,1104,20,1152,40C1200,60,1248,20,1296,40C1344,60,1392,20,1440,40V80H0Z"
          />
        </svg>
      </section>

      {/* Call to Action Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 opacity-0"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/60 text-slate-700 backdrop-blur-sm border border-slate-200">
              Join Our Mission
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Be Part of the <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Change</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Your report is a step toward protecting children and empowering communities. Explore more ways to get involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/get-involved"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10">Get Involved</span>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/resources"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-slate-700 bg-white rounded-full border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              View Resources
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReportAbuse;