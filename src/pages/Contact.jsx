import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { colors } from '../utils/colors';

// Custom SVG Icons (unchanged)
const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 0 00-2-2H5a2 0 00-2 2v10a2 0 002 2z" />
  </svg>
);

const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MapPin = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Instagram = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const Facebook = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Send = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const MessageCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const Clock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={10} />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const Globe = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={10} />
    <line x1={2} y1={12} x2={22} y2={12} />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const WhatsApp = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.297-.347.446-.52.149-.174.297-.372.297-.595 0-.223-.074-.445-.223-.595-.149-.149-.595-.669-1.291-.669-.694 0-1.041.074-1.34.223-.297.149-1.14.669-1.14 1.635 0 .966.694 1.933.992 2.132.297.199 1.785 2.707 4.335 3.803 1.487.645 2.677.694 3.596.595.992-.099 3.174-1.29 3.621-2.536.446-1.246-.074-2.29-.67-2.536zM12.116 2c5.468 0 9.892 4.424 9.892 9.892 0 5.467-4.424 9.891-9.892 9.891-1.736 0-3.416-.446-4.902-1.29l-.372-.149-3.621.992.992-3.621-.149-.372c-.844-1.487-1.29-3.167-1.29-4.902 0-5.468 4.424-9.892 9.892-9.892z"/>
  </svg>
);

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    // console.log('Form submitted:', formData);
    setSuccess('Message sent! We’ll get back to you soon, sharp sharp!');
    setError('');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'interceptcsa@gmail.com',
      href: 'mailto:interceptcsa@gmail.com',
      description: 'Drop us a message anytime',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '0810 335 0098',
      href: 'tel:+2348103350098',
      description: 'Monday - Friday, 9AM - 5PM',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Lagos, Nigeria',
      href: '#map',
      description: 'Our base in the heart of Lagos',
    },
    {
      icon: Clock,
      title: 'Office Hours',
      content: 'Mon - Fri, 9AM - 5PM',
      href: null,
      description: 'We reply quick quick',
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com/interceptcsa',
      label: 'Instagram',
      color: 'from-[#FECB0A] to-[#F97316]',
    },
    {
      icon: Facebook,
      href: 'https://facebook.com/Intercept-Child-Sexual-Abuse-Foundation',
      label: 'Facebook',
      color: 'from-[#FECB0A] to-[#F97316]',
    },
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email',
      content: 'interceptcsa@gmail.com',
      href: 'mailto:interceptcsa@gmail.com',
    },
    {
      icon: WhatsApp,
      title: 'WhatsApp',
      content: '0810 335 0098',
      href: 'https://wa.me/+2348103350098',
    },
  ];

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Programs', href: '/programs' },
    { title: 'Podcast', href: '/podcast' },
    { title: 'Blog', href: '/blog' },
    { title: 'Get Involved', href: '/get-involved' },
    { title: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] overflow-hidden" id="hero-section">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#FECB0A]/30 to-[#F97316]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-[#F97316]/30 to-[#FECB0A]/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FECB0A' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className={`text-center transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2937] mb-4">
                Connect with Us
              </h1>
              <p className="text-lg sm:text-xl text-[#1F2937] max-w-2xl mx-auto leading-relaxed">
                Let’s join hands to protect our children and build safer communities. Reach out now!
              </p>
              <div className="mt-6 flex justify-center">
                {/* <div className="h-1 w-24 bg-gradient-to-r from-[#FECB0A] to-[#F97316] rounded-full"></div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Cards Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div
                    key={index}
                    className={`group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
                      hoveredCard === index ? 'scale-105' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#FECB0A] group-hover:to-[#F97316] rounded-xl transition-all duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2A8E9D] to-[#2A8E9D] rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-[#1F2937] mb-1">{info.title}</h3>
                      <p className="text-sm text-[#1F2937] mb-2">{info.description}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-[#1F2937] hover:text-[#F97316] font-semibold text-sm transition-colors duration-300"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <span className="text-[#1F2937] font-semibold text-sm">{info.content}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4 relative bg-gradient-to-br from-[#FECB0A]/10 to-[#F97316]/10 rounded-[2rem] mx-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <h2 className="text-2xl font-extrabold text-[#2A8E9D] mb-4 text-center">
                    Send a Message
                  </h2>
                  <p className="text-[#1F2937] text-center mb-6 text-sm">
                    Invite us to speak. Ask a question. Or just say hi.
                  </p>
                  {error && (
                    <div className="flex items-center bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="flex items-center bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-600 text-sm">{success}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                      <label className="absolute -top-2 left-4 bg-white px-2 text-sm font-semibold text-[#1F2937] transform -translate-y-1/2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#2A8E9D] rounded-xl focus:border-[#F97316] focus:ring-0 focus:scale-105 transition-all duration-300 shadow-sm group-hover:shadow-md"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="relative group">
                      <label className="absolute -top-2 left-4 bg-white px-2 text-sm font-semibold text-[#1F2937] transform -translate-y-1/2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border-2 border-[#2A8E9D] rounded-xl focus:border-[#F97316] focus:ring-0 focus:scale-105 transition-all duration-300 shadow-sm group-hover:shadow-md"
                        placeholder="Your email"
                      />
                    </div>
                    <div className="relative group">
                      <label className="absolute -top-2 left-4 bg-white px-2 text-sm font-semibold text-[#1F2937] transform -translate-y-1/2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-white border-2 border-[#2A8E9D] rounded-xl focus:border-[#F97316] focus:ring-0 focus:scale-100 transition-all duration-300 shadow-sm min-h-[120px] resize-y group-hover:shadow-md"
                        placeholder="What’s on your mind?"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#2A8E9D] to-[#2A8E9D] text-white font-semibold py-3 rounded-full hover:shadow-xl hover:shadow-orange-400/30 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" />
                      Send It!
                    </button>
                  </form>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <h2 className="text-2xl font-extrabold text-[#2A8E9D] mb-4 rounded-full">
                    Find Us
                  </h2>
                  <p className="text-[#1F2937] mb-6 text-sm">
                    We’re chilling in Lagos, Nigeria. Come say hi!
                  </p>
                  <div className="relative h-48 sm:h-64 bg-gray-100 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FECB0A]/20 to-[#F97316]/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-lg p-4 text-center shadow-md">
                        <MapPin className="w-6 h-6 text-[#F97316] mx-auto mb-2" />
                        <p className="text-[#1F2937] text-sm font-semibold">Lagos, Nigeria</p>
                        <a
                          href="https://maps.google.com/?q=Lagos,Nigeria"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 px-3 py-1 bg-[#2A8E9D] text-[#fff] rounded-lg text-xs hover:bg-[#F97316] hover:text-white transition-colors duration-300"
                        >
                          Open in Maps
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Globe className="w-4 h-4 text-[#FECB0A]" />
                      <p className="text-sm text-[#1F2937]">Serving all of Nigeria</p>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <MessageCircle className="w-4 h-4 text-[#F97316]" />
                      <p className="text-sm text-[#1F2937]">Fast reply, 24 hours max</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-extrabold text-[#2A8E9D] mb-6 text-center">
              Other Ways to Reach Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <a
                    key={index}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#FECB0A] group-hover:to-[#F97316] rounded-xl transition-all duration-300"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2A8E9D] to-[#2A8E9D] rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F2937]">{option.title}</h3>
                        <p className="text-sm text-[#F59E0B] font-semibold">{option.content}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-extrabold text-[#2A8E9D] mb-4">
              Follow Our Vibes
            </h2>
            <p className="text-lg text-[#1F2937] mb-8">
              Stay updated with our mission on social media
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-10 h-10 bg-[#2A8E9D] ${social.color} rounded-lg flex items-center justify-center hover:shadow-md transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                    <div className="absolute -bottom-6 bg-[#F97316] text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {social.label}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="bg-gradient-to-r from-[#2A8E9D] to-[#2A8E9D] rounded-2xl p-8 text-white">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                Ready to Make Impact?
              </h2>
              <p className="text-base leading-relaxed mb-6">
                Join us to create safer spaces for our kids. Let’s do this!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <a
                  href="/get-involved"
                  className="px-6 py-3 bg-white text-[#000] font-semibold rounded-full hover:bg-[#F3F4F6] hover:shadow-md transition-all duration-300"
                >
                  Get Involved
                </a>
                <a
                  href="/about"
                  className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#F97316] hover:shadow-md transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;