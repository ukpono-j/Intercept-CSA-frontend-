import { useEffect, useRef } from 'react';
import { colors } from '../utils/colors';
import './About.css';
import AboutHero from '../assets/close-up-team-hand-shake.jpg';
import MissionImage from '../assets/mission-image.jpg';
import VisionImage from '../assets/vision-image.jpg';
import StoryImage from '../assets/story-image.jpg';
import ObjectivesImage from '../assets/objectives-image.jpg';
import CtaImage from '../assets/cta-image.jpg';

function About() {
  const sectionsRef = useRef([]);

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

  // Create dynamic gradient styles using brand colors
  const gradientStyle = {
    background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
  };

  const textGradientStyle = {
    background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const buttonStyle = {
    background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
    color: 'white'
  };

  const buttonHoverStyle = {
    background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.secondaryDark})`
  };

  return (
    <>
      {/* Preload critical image */}
      <link rel="preload" href={AboutHero} as="image" fetchpriority="high" />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-0"
          ref={(el) => (sectionsRef.current[0] = el)}
        >
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
              style={{ background: colors.primary }}
            ></div>
            <div 
              className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"
              style={{ background: colors.secondary }}
            ></div>
            <div 
              className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"
              style={{ background: colors.accent }}
            ></div>
          </div>
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <img
            src={AboutHero}
            alt="Team handshake symbolizing unity"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            fetchpriority="high"
            decoding="async"
          />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-28 lg:py-32">
            <div className="text-center">
              <div className="mb-6 mt-10">
                {/* <span className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white backdrop-blur-sm border border-white/20">
                  Who We Are
                </span> */}
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight animate-hero-title">
                About <span className="block" style={textGradientStyle}>Intercept CSA</span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light animate-hero-text">
                A Nigerian movement to prevent child sexual abuse, empower survivors, and transform communities through bold action and compassion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/get-involved"
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:-translate-y-1"
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.background = buttonHoverStyle.background;
                    e.target.style.boxShadow = `0 25px 50px -12px ${colors.primary}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = buttonStyle.background;
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <span className="relative z-10">Join the Movement</span>
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section
          id="mission"
          className="py-16 md:py-24 opacity-0"
          ref={(el) => (sectionsRef.current[1] = el)}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl">
                  <img
                    src={MissionImage}
                    alt="Nigerian community members in a workshop on child protection"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Our <span style={textGradientStyle}>Mission</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  To prevent child sexual abuse, intervene in at-risk lives, and break trauma cycles through education, advocacy, and survivor-centered support, empowering Nigerian communities for lasting change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section
          className="py-16 md:py-24 bg-slate-50 opacity-0"
          ref={(el) => (sectionsRef.current[2] = el)}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <div className="relative h-80 sm:h-96 overflow-hidden rounded-2xl">
                  <img
                    src={VisionImage}
                    alt="Happy Nigerian children playing in a safe environment"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Our <span style={textGradientStyle}>Vision</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  A Nigeria where child sexual abuse is stopped before it starts, interrupted where it occurs, and survivors are empowered to heal, with safety, justice, and restoration for all.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section
          className="py-16 md:py-24 opacity-0"
          ref={(el) => (sectionsRef.current[3] = el)}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Our <span style={textGradientStyle}>Story</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              {[
                { year: '2018', desc: 'Founded to combat the silent epidemic of child sexual abuse in Nigeria.' },
                { year: '2020', desc: 'Launched community education, reaching 5,000+ families.' },
                { year: '2023', desc: 'Expanded survivor support for 500+ individuals.' },
                { year: '2025', desc: 'Targeting 10,000+ lives with prevention initiatives.' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2 p-6"
                  style={{
                    '--hover-shadow': `0 25px 50px -12px ${colors.primary}20`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${colors.primary}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <h3 
                    className="text-xl font-bold mb-2 group-hover:transition-colors"
                    style={{ color: colors.text }}
                    onMouseEnter={(e) => {
                      e.target.style.color = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = colors.text;
                    }}
                  >
                    {item.year}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-2xl">
              <img
                src={StoryImage}
                alt="Nigerian community rally for child protection"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section
          className="py-16 md:py-24 bg-slate-50 opacity-0"
          ref={(el) => (sectionsRef.current[4] = el)}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
              Our <span style={textGradientStyle}>Objectives</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Empower Communities', desc: 'Equip communities with tools to prevent abuse and support survivors.' },
                { title: 'Support Survivors', desc: 'Provide holistic support, addressing stigmas and promoting healing.' },
                { title: 'Create Safe Spaces', desc: 'Foster environments where survivors feel valued and empowered.' },
                { title: 'Engage Allies', desc: 'Empower caregivers and leaders to build a united network.' },
                { title: 'Drive Systemic Change', desc: 'Address root causes of CSA for lasting prevention.' },
              ].map((obj, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2 p-6"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${colors.primary}20`;
                    e.currentTarget.style.borderColor = colors.primary + '40';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <h3 
                    className="text-lg font-bold mb-2 group-hover:transition-colors"
                    style={{ color: colors.text }}
                    onMouseEnter={(e) => {
                      e.target.style.color = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = colors.text;
                    }}
                  >
                    {obj.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 opacity-0"
          ref={(el) => (sectionsRef.current[5] = el)}
        >
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
              style={{ background: colors.primary }}
            ></div>
            <div 
              className="absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
              style={{ background: colors.secondary }}
            ></div>
          </div>
          <img
            src={CtaImage}
            alt="Nigerian community united in support of child protection"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
            loading="lazy"
            decoding="async"
          />
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight animate-cta-title">
              Stand <span className="block" style={textGradientStyle}>With Us</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 animate-cta-text">
              Protect children, empower survivors, and transform Nigeria. Your support fuels our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/get-involved"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:-translate-y-1"
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.target.style.background = buttonHoverStyle.background;
                  e.target.style.boxShadow = `0 25px 50px -12px ${colors.primary}40`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = buttonStyle.background;
                  e.target.style.boxShadow = 'none';
                }}
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
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;