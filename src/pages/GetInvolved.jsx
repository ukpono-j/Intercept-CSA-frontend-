import { useState, useEffect, useRef } from 'react';
import { colors } from '../utils/colors';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './GetInvolved.css';
import SupportGroup from "../assets/people-meeting-support-group.jpg";

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
    console.log('Volunteer form submitted:', volunteerForm);
    alert('Thank you for your interest! We will contact you soon.');
    setVolunteerForm({ name: '', email: '', message: '' });
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
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-0"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
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
              {/* <span className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white backdrop-blur-sm border border-white/20">
                Make a Difference
              </span> */}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight animate-hero-title">
              Get <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Involved</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light animate-hero-text">
              Join Intercept CSA to prevent child sexual abuse, empower survivors, and build safer Nigerian communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#volunteer"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10">Volunteer Now</span>
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
              {/* <a
                href="#partner"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Partner With Us
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section
        id="volunteer"
        className="relative py-16 md:py-24 opacity-0"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        {/* <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div> */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="container  mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6 text-center">
            Volunteer With Us
          </h2>
          <p className="text-black text-lg leading-relaxed mb-8 text-center">
            Your time and skills can help protect children and support survivors. Fill out the form to join our mission.
          </p>
          <div className="relative bg-gradient-to-br from-slate-900 text-white via-slate-800 to-slate-900  rounded-2xl shadow-2xl p-8 sm:p-10">
            <form onSubmit={handleVolunteerSubmit} className="relative z-10 space-y-6">
              <div className="relative">
                <FormInput
                  label="Full Name"
                  type="text"
                  name="name"
                  value={volunteerForm.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full border-b-2 ${
                    errors.name ? 'border-red-500' : 'border-white'
                  } focus:border-white text-white bg-transparent placeholder-white/50 transition-all duration-300 animate-input`}
                  style={{ animationDelay: '0s' }}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="relative">
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={volunteerForm.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full border-b-2 ${
                    errors.email ? 'border-red-500' : 'border-white'
                  } focus:border-white text-white bg-transparent placeholder-white/50 transition-all duration-300 animate-input`}
                  style={{ animationDelay: '0.1s' }}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <FormInput
                  label="Why do you want to volunteer?"
                  type="textarea"
                  name="message"
                  value={volunteerForm.message}
                  onChange={handleInputChange}
                  className={`w-full border-b-2 border-white focus:border-white text-white bg-transparent placeholder-white/50 transition-all duration-300 animate-input break-words`}
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
              <Button
                type="submit"
                className={`w-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 text-white hover:shadow-xl hover:shadow-${colors.primary}/25 transition-all duration-300 rounded-full py-3 text-lg font-semibold transform hover:-translate-y-0.5 animate-pulse-button`}
                aria-label="Submit volunteer form"
              >
                Submit
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

      {/* Partner Section */}
      <section
        id="partner"
        className="relative py-16 md:py-24 opacity-0"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Partner With Us
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                We collaborate with churches, schools, and organizations to create safe environments and promote child protection. Reach out to discuss partnership opportunities.
              </p>
              <a
                href="/contact"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
                aria-label="Contact us to discuss partnership opportunities"
              >
                <span className="relative z-10">Contact Us</span>
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
            <div className="md:w-1/2">
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl">
                <img
                  src={SupportGroup}
                  alt="Partnership"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 opacity-0"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
          <div className="mb-6">
            {/* <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/60 text-slate-700 backdrop-blur-sm border border-slate-200">
              Support Our Mission
            </span> */}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Donate to <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Protect Children</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Your donations help us provide resources, support survivors, and educate communities. Donation options coming soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10">Stay Updated</span>
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
            {/* <a
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
            </a> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetInvolved;