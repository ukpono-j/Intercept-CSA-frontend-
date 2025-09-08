import { useEffect, useRef, useState } from 'react';
import FounderImage from "../assets/founderImage.jpg";
import './About.css';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Professional NGO color palette
const colors = {
  primary: '#0f766e',      // Teal-700
  primaryLight: '#14b8a6', // Teal-500
  primaryDark: '#134e4a',  // Teal-800
  accent: '#F59E0B',       // Orange for buttons
  accentHover: '#e09005',  // Darker orange for hover
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
            entry.target.classList.add('about-animate-in');
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
    <main id="about-main" className="about">
      {/* Hero Section */}
      <section
        className="about-hero-section"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="about-hero-overlay"></div>
        <img
          src={images.hero}
          alt="Community unity"
          className="about-hero-image"
          loading="eager"
        />
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            About <span className="about-text-accent">Intercept CSA</span>
          </h1>
          <p className="about-hero-subtitle">
            We exist because silence protects abusers. We exist because culture often doesn't know what to say. We exist to teach, to interrupt, and to walk with children, not just for them.
          </p>
          <div className="about-hero-buttons">
            <Link to="/get-involved">
              <button className="about-button about-button-primary">
                Join Our Mission
                <ArrowRight className="about-button-icon" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="about-section about-gradient-bg"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="about-container">
          <div className="about-mission-vision-grid">
            {/* Mission */}
            <div className="about-mission">
              <h2 className="about-section-title">
                Preventing Abuse, <span className="about-text-accent">Empowering Lives</span>
              </h2>
              <p className="about-section-subtitle">
                To actively prevent child sexual abuse and disrupt cycles of trauma through education, advocacy, and survivor-centered support.
              </p>
              <div className="about-mission-items">
                {['Prevention Education', 'Survivor Support', 'Community Empowerment'].map((item, i) => (
                  <div key={i} className="about-mission-item">
                    <span className="about-mission-dot"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/programs">
                <button className="about-button about-button-white">
                  Our Services
                  <ArrowRight className="about-button-icon" />
                </button>
              </Link>
            </div>
            {/* Vision */}
            <div className="about-vision-card">
              <h3 className="about-card-title">A Safe World for Every Child</h3>
              <p className="about-card-subtitle">
                A world where child sexual abuse is prevented before it begins, interrupted where it occurs, and survivors are empowered to heal.
              </p>
              <Link to="/programs">
                <button className="about-button about-button-outline">
                  Learn More
                  <ArrowRight className="about-button-icon" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        className="about-section about-white-bg"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="about-container">
          <h2 className="about-section-title">
            Our <span className="about-text-gradient">Story</span>
          </h2>
          <p className="about-section-subtitle">
            InterceptCSA began with a single spark: a vision to break the silence that protects abusers and to create a world where every child is safe. Founded by Inimfon Sampson, our journey started in response to the urgent need for education, advocacy, and healing in Nigerian communities. From our first community workshop to now impacting thousands, we've grown into a movement dedicated to prevention, survivor support, and cultural change.
          </p>
        </div>
      </section>

      {/* Meet the Founder */}
      <section
        className="about-section about-gradient-bg"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="about-container">
          <h2 className="about-section-title">
            Meet Our <span className="about-text-accent">Founder</span>
          </h2>
          <div className="about-founder-grid">
            <div className="about-founder-image-container">
              <img
                src={images.founder}
                alt="Inimfon Sampson, Founder"
                className="about-founder-image"
                onError={(e) => {
                  if (!imageErrors['founder']) {
                    e.target.src = '/assets/placeholder.jpg';
                    setImageErrors((prev) => ({ ...prev, founder: images.founder }));
                  }
                }}
              />
            </div>
            <div className="about-founder-content">
              <p className="about-founder-quote">
                "I started this because I saw the gap between pain and protection — and because I believe every story deserves safety."
              </p>
              <p className="about-founder-name">— Inimfon Sampson, Founder</p>
              <Link to="/about/founder">
                <button className="about-button about-button-white">
                  Meet Inimfon
                  <ArrowRight className="about-button-icon" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Pillars */}
      <section
        className="about-section about-white-bg"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="about-container">
          <h2 className="about-section-title">
            Our <span className="about-text-gradient">Five Pillars</span>
          </h2>
          <p className="about-section-subtitle">
            The foundational principles that guide our mission to create a world where every child is safe, seen, and supported.
          </p>
          <div className="about-pillars-grid">
            {pillars.map((pillar, index) => (
              <div key={index} className={`about-pillar-card ${pillar.color}`}>
                <div className={`about-pillar-icon ${pillar.iconBg}`}>
                  <span>{pillar.icon}</span>
                </div>
                <h3 className="about-pillar-title">{pillar.title}</h3>
                <p className="about-pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Engagement */}
      <section
        className="about-section about-teal-bg"
        ref={(el) => (sectionsRef.current[7] = el)}
      >
        <div className="about-container">
          <div className="about-community-grid">
            <div>
              <h2 className="about-section-title">
                Building <span className="about-text-gradient">Stronger Communities</span>
              </h2>
              <p className="about-section-subtitle">
                Our work extends beyond individual healing to create systemic change. We partner with schools, religious organizations, and community leaders to build comprehensive protection networks.
              </p>
              <div className="about-community-items">
                {[
                  { title: 'School Partnerships', desc: 'Training educators and staff to recognize and respond to abuse' },
                  { title: 'Faith Community Engagement', desc: 'Working with religious leaders to create safe spaces' },
                  { title: 'Parent Education', desc: 'Empowering families with knowledge and tools for protection' }
                ].map((item, index) => (
                  <div key={index} className="about-community-item">
                    <span className="about-community-check"></span>
                    <div>
                      <h4 className="about-community-title">{item.title}</h4>
                      <p className="about-community-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-community-card">
              <h3 className="about-card-title">Get Involved</h3>
              <p className="about-card-subtitle">
                Whether you're an individual, organization, or community leader, there are many ways to join our mission.
              </p>
              <div className="about-community-buttons">
                <Link to="/get-involved">
                  <button className="about-button about-button-primary">
                    Volunteer With Us
                    <ArrowRight className="about-button-icon" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="about-button about-button-outline">
                    Partner With Us
                    <ArrowRight className="about-button-icon" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;