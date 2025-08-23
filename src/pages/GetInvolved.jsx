import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div className="get-involved-container min-h-screen bg-white" id="hero-section">
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
          <div className="absolute top-40 right-20 w-24 h-24 bg-amber-400/10 rounded-full blur-xl floating-element" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-teal-300/10 rounded-full blur-xl floating-element" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <h1 className="hero-title font-bold mb-8 leading-tight">
            Get <span className="block text-teal-300 mt-2">Involved</span>
          </h1>
          <p className="text-lg mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Join Intercept CSA to prevent child sexual abuse, empower survivors, and build safer Nigerian communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => document.getElementById('become-a-first-listener')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Ways
            </button>
            <button
              onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline px-10 py-4 font-semibold rounded-full transition-all duration-300"
            >
              Volunteer Now
            </button>
          </div>
        </div>
      </section>

      {/* Become a First Listener */}
      <section
        id="become-a-first-listener"
        className="py-20 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title font-bold text-gray-800 mb-6">
              Become a <span className="text-gradient">First Listener</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Be the first to listen, support, and guide children and survivors toward safety and healing through our training programs or by offering your space.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <article className="way-card rounded-2xl p-8 hover-lift shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                👥
              </div>
              <div className="mb-4">
                <div className="text-sm text-amber-600 font-semibold">Join our community</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Join a Training</h3>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Participate in our First Listener training to learn how to support children and survivors effectively.
              </p>
              <button
                onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary inline-flex items-center px-6 py-3 font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                <span className="relative z-10">Join Now</span>
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </article>
            <article className="way-card rounded-2xl p-8 hover-lift shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                🏛️
              </div>
              <div className="mb-4">
                <div className="text-sm text-amber-600 font-semibold">Offer your space</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Volunteer Your Space</h3>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Provide a venue for our training sessions or community events to help us reach more people.
              </p>
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center px-6 py-3 font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                <span className="relative z-10">Offer a Space</span>
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Partner With Us */}
      <section
        id="partner-with-us"
        className="py-20 gradient-bg section-opacity"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/50 to-teal-600/50 rounded-2xl transform rotate-3 opacity-20"></div>
              <img
                src={SupportGroup}
                alt="Partnership"
                className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div>
              <h2 className="section-title font-bold text-white mb-6">
                Partner <span className="">With Us</span>
              </h2>
              <p className="text-lg text-gray-50 mb-8 leading-relaxed">
                We collaborate with schools, churches, and other NGOs to create safe environments and promote child protection.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Schools: Implement child safety programs and training.',
                  'Churches: Foster safe communities through education and advocacy.',
                  'NGOs: Partner for joint initiatives and resource sharing.'
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-6 h-6 bg-white text-primary-dark rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-lg text-teal-50">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="btn-primary inline-flex items-center px-8 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                style={{ backgroundColor: themeColors.accent, color: themeColors.text }}
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

      {/* Support Our Work */}
      <section
        id="support-our-work"
        className="py-20 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title font-bold text-gray-800 mb-6">
              Support <span className="text-gradient">Our Work</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We’re building a funding model rooted in impact and care. Until then, email us if you’d like to support.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1">
            <article className="way-card rounded-2xl p-8 hover-lift shadow-lg text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                💝
              </div>
              <div className="mb-4">
                <div className="text-sm text-amber-600 font-semibold">Your contribution matters</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Support Our Mission</h3>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Help us protect children and empower communities by contributing to our mission.
              </p>
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center px-6 py-3 font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                <span className="relative z-10">Reach Out</span>
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section
        id="volunteer"
        className="py-20 gradient-bg section-opacity"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title font-bold text-white mb-6">
              Volunteer <span className="">Application</span>
            </h2>
            <p className="text-lg text-gray-50 leading-relaxed">
              Join our team of dedicated volunteers making a real difference in children's lives.
            </p>
          </div>

          <div className="form-card rounded-2xl shadow-2xl p-8 sm:p-12" style={{ background: 'rgba(15, 118, 110, 0.2)' }}>
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
                    className={`w-full outline-none border-b-2 ${errors.name ? 'border-red-400' : 'border-teal-50'
                      } focus:border-teal-50 text-teal-50 bg-transparent placeholder-teal-50/70 pb-2 text-base`}
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
                    className={`w-full outline-none border-b-2 ${errors.email ? 'border-red-400' : 'border-teal-50'
                      } focus:border-teal-50 text-teal-50 bg-transparent placeholder-teal-50/70 pb-2 text-base`}
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
                  className="w-full outline-none border-b-2 border-teal-50 focus:border-teal-50 text-teal-50 bg-transparent placeholder-teal-50/70 pb-2 min-h-24 text-base"
                />
              </div>

              <Button
                type="submit"
                className="btn-primary w-full font-bold py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: themeColors.accent, color: themeColors.text }}
              >
                Submit Application
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-white section-opacity"
        ref={(el) => (sectionsRef.current[5] = el)}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card rounded-2xl p-12">
            <h2 className="section-title font-bold text-gray-800 mb-6">
              Ready to Make a <span className="text-[#DC4A05]">Difference?</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Join thousands of Nigerians working together to protect children and support survivors. Your involvement matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => document.getElementById('volunteer')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-10 py-4 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Volunteer Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetInvolved;