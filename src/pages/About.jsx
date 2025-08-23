import { useEffect, useRef, useState } from 'react';
import FounderImage from "../assets/founderImage.jpg";
import './About.css';
import { Link } from 'react-router-dom';

// Professional NGO color palette
const colors = {
  primary: '#0f766e',      // Teal-700
  primaryLight: '#14b8a6', // Teal-500
  primaryDark: '#134e4a',  // Teal-800
  accent: '#DC4A05',       // Orange for buttons
  accentHover: '#B8370A',  // Darker orange for hover
  text: '#1f2937',         // Gray-800
  textLight: '#6b7280',    // Gray-500
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  teal50: '#f0fdfa',
};

// Professional images
const images = {
  hero: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=800&fit=crop',
  mission: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
  vision: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
  community: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop',
  founder: FounderImage,
  impact: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
  volunteers: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
};

function About() {
  const sectionsRef = useRef([]);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-animate-in'); // Scoped class name
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
    {
      title: 'Safe Visibility',
      desc: 'Creating environments where children are seen, heard, and protected as the unique individuals they are.',
      icon: '👁️',
      color: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Everyday Interceptions',
      desc: 'Building protection systems in the places where children live, learn, and play every day.',
      icon: '🛡️',
      color: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Voice Culture',
      desc: 'Fostering shame-free environments where stories can be shared and healing voices can be heard.',
      icon: '🗣️',
      color: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      title: 'Faith & Culture Reframing',
      desc: 'Transforming harmful beliefs and practices into powerful tools for protection and healing.',
      icon: '🙏',
      color: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    },
    {
      title: 'Accountability Loops',
      desc: 'Empowering communities to create their own systems of reporting, support, and healing.',
      icon: '🔄',
      color: 'bg-teal-50',
      iconBg: 'bg-teal-100'
    }
  ];

  const impactStats = [
    { number: '5,000+', label: 'Lives Impacted', icon: '👥' },
    { number: '150+', label: 'Workshops Conducted', icon: '📚' },
    { number: '25+', label: 'Communities Reached', icon: '🏘️' },
    { number: '500+', label: 'Survivors Supported', icon: '❤️' }
  ];

  const teamMembers = [
    {
      name: 'Inimfon Sampson',
      role: 'Founder & CEO',
      image: images.founder,
      bio: 'Passionate advocate with 8+ years in child protection'
    },
    {
      name: 'Dr. Sarah Johnson',
      role: 'Clinical Director',
      image: images.team,
      bio: 'Licensed therapist specializing in trauma recovery'
    },
    {
      name: 'Michael Chen',
      role: 'Community Outreach',
      image: images.team,
      bio: 'Expert in grassroots mobilization and education'
    }
  ];

  return (
    <main id="hero-section" className="about-container pt-14">
      {/* Hero Section */}
      <section
        className="about-section relative min-h-[calc(100vh-4rem)] flex items-center justify-center text-white about-section-opacity"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 z-10"></div>
        <img
          src={images.hero}
          alt="Community unity"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="about-hero-title mb-6 leading-tight">
            About <span className="text-teal-300">Intercept CSA</span>
          </h1>
          <p className="about-text-lg text-gray-200 leading-relaxed max-w-4xl mx-auto mb-8">
            We exist because silence protects abusers. We exist because culture often doesn't know what to say. We exist to teach, to interrupt, and to walk with children, not just for them.
          </p>
          <Link to="/get-involved">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="about-btn-primary px-8 py-4 font-semibold about-text-base min-w-[200px]">
                Join Our Mission
              </button>
            </div>
          </Link>
        </div>
      </section>

      {/* Mission & Vision - TEAL BACKGROUND */}
      <section
        className="about-section py-16 lg:py-20 about-gradient-bg about-section-opacity"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Mission */}
            <div className="text-white">
              <h2 className="about-section-title mb-6">
                Preventing Abuse, <span className="text-teal-200">Empowering Lives</span>
              </h2>
              <p className="about-text-lg text-teal-50 mb-8 leading-relaxed">
                To actively prevent child sexual abuse and disrupt cycles of trauma through education, advocacy, and survivor-centered support.
              </p>
              <div className="space-y-4 mb-8">
                {['Prevention Education', 'Survivor Support', 'Community Empowerment'].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-3 h-3 bg-teal-300 rounded-full mr-4"></div>
                    <span className="text-teal-50 about-text-base">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/programs">
                <div className="flex justify-start">
                  <button
                    className="about-btn-white px-8 py-4 font-semibold about-text-base min-w-[180px]">
                    Our Services
                  </button>
                </div>
              </Link>
            </div>

            {/* Vision */}
            <div className="about-professional-card rounded-xl p-8 bg-white/95">
              <h3 className="about-text-xl font-bold text-gray-800 mb-6">
                A Safe World for Every Child
              </h3>
              <p className="text-gray-600 about-text-base leading-relaxed mb-6">
                A world where child sexual abuse is prevented before it begins, interrupted where it occurs, and survivors are empowered to heal.
              </p>
              <Link to="/programs">
                <div className="flex justify-start">
                  <button
                    className="about-btn-outline px-6 py-3 font-semibold about-text-sm min-w-[140px]">
                    Learn More
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - WHITE BACKGROUND */}
      <section
        className="about-section py-16 lg:py-20 bg-white about-section-opacity"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="about-section-title text-gray-800 mb-6">
              Our <span className="about-text-gradient">Story</span>
            </h2>
            <p className="about-text-base text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              InterceptCSA began with a single spark: a vision to break the silence that protects abusers and to create a world where every child is safe. Founded by Inimfon Sampson, our journey started in response to the urgent need for education, advocacy, and healing in Nigerian communities. From our first community workshop to now impacting thousands, we've grown into a movement dedicated to prevention, survivor support, and cultural change.
            </p>
            {/* <div className="flex justify-center">
              <button
                className="about-btn-primary px-8 py-4 font-semibold about-text-base min-w-[200px]">
                Read Our Journey
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Meet the Founder - TEAL BACKGROUND */}
      <section
        className="about-section py-16 lg:py-20 about-gradient-bg about-section-opacity"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="about-section-title text-white mb-6">
              Meet Our <span className="text-teal-200">Founder</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
            <div className="flex-shrink-0">
              <img
                src={images.founder}
                alt="Inimfon Sampson, Founder"
                className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-lg border-4 border-teal-200"
                onError={(e) => {
                  if (!imageErrors['founder']) {
                    e.target.src = '/assets/placeholder.jpg';
                    setImageErrors((prev) => ({ ...prev, founder: images.founder }));
                  }
                }}
              />
            </div>
            <div className="text-center md:text-left text-white">
              <p className="about-text-lg text-teal-50 mb-6 leading-relaxed">
                "I started this because I saw the gap between pain and protection — and because I believe every story deserves safety."
              </p>
              <p className="about-text-base font-bold text-teal-200 mb-8">— Inimfon Sampson, Founder</p>
              <div className="flex justify-center md:justify-start">
                <button
                  className="about-btn-white px-8 py-4 font-semibold about-text-base min-w-[180px]">
                  Meet Inimfon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Our Pillars - WHITE BACKGROUND */}
      <section
        className="about-section py-20 lg:py-24 bg-white about-section-opacity"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="about-section-title text-gray-800 mb-6">
              Our <span className="about-text-gradient">Five Pillars</span>
            </h2>
            <p className="about-text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The foundational principles that guide our mission to create a world where every child is safe, seen, and supported.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <div key={index} className={`about-pillar-card rounded-2xl p-8 ${index === 2 && 'xl:col-span-1 xl:mx-auto xl:max-w-sm'}`}>
                <div className={`w-16 h-16 ${pillar.iconBg} rounded-full flex items-center justify-center mb-6`}>
                  <span className="about-text-3xl">{pillar.icon}</span>
                </div>
                <h3 className="about-text-xl font-bold text-gray-800 mb-4">{pillar.title}</h3>
                <p className="text-gray-600 about-text-base leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* <div className="text-center">
            <button
              className="about-btn-primary px-10 py-4 font-semibold about-text-base min-w-[220px]">
              Explore Our Approach
            </button>
          </div> */}
        </div>
      </section>

      {/* Community Engagement - LIGHT TEAL BACKGROUND */}
      <section
        className="about-section py-16 lg:py-20 about-section-opacity"
        ref={(el) => (sectionsRef.current[7] = el)}
        style={{ backgroundColor: colors.teal50 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="about-section-title text-gray-800 mb-6">
                Building <span className="about-text-gradient">Stronger Communities</span>
              </h2>
              <p className="about-text-lg text-gray-700 mb-8 leading-relaxed">
                Our work extends beyond individual healing to create systemic change. We partner with schools, religious organizations, and community leaders to build comprehensive protection networks.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'School Partnerships', desc: 'Training educators and staff to recognize and respond to abuse' },
                  { title: 'Faith Community Engagement', desc: 'Working with religious leaders to create safe spaces' },
                  { title: 'Parent Education', desc: 'Empowering families with knowledge and tools for protection' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white about-text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-gray-600 about-text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-professional-card rounded-xl p-8 bg-white">
              <h3 className="about-text-xl font-bold text-gray-800 mb-4">Get Involved</h3>
              <p className="text-gray-600 mb-6">
                Whether you're an individual, organization, or community leader, there are many ways to join our mission.
              </p>
              <div className="space-y-3">
                <div>
                  <Link to="/get-involved">
                    <button className="about-btn-primary w-full py-3 font-semibold">
                      Volunteer With Us
                    </button>
                  </Link>
                </div>
                <div>
                  <Link to="/contact">
                    <button className="about-btn-outline w-full py-3 font-semibold">
                      Partner With Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;