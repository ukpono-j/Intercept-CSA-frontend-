import { Link } from 'react-router-dom';
import Button from './Button';
import './Hero.css';
import portraitImmigrants from '../assets/close-up-parent-preparing-his-child-school.jpg';

function Hero() {
  const heroContent = {
    headline: 'Protecting Children, Healing Lives',
    subheadline: 'A Nigerian initiative dedicated to preventing child sexual abuse, empowering survivors, and transforming communities.',
    buttons: [
      { label: 'Learn More', to: '/about', primary: true, variant: 'primary' },
      { label: 'Get Involved', to: '/get-involved', primary: false, variant: 'secondary' },
    ],
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <img
          src={portraitImmigrants}
          alt="People uniting for child safety"
          className="hero-background-image"
          loading="eager"
          decoding="async"
        />
        <div className="hero-overlay"></div>
        <div className="hero-gradient">
          <div className="hero-gradient-circle hero-gradient-circle-top-left"></div>
          <div className="hero-gradient-circle hero-gradient-circle-top-right"></div>
          <div className="hero-gradient-circle hero-gradient-circle-bottom-center"></div>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text-container">
          <h1 className="hero-title animate-hero-title">
            {heroContent.headline}
          </h1>
          
          <p className="hero-subtitle animate-hero-text">
            {heroContent.subheadline}
          </p>
          
          <div className="hero-buttons animate-hero-buttons">
            {heroContent.buttons.map((btn, index) => (
              <Link key={index} to={btn.to} className="hero-button-link">
                <Button
                  className={`hero-button ${btn.primary ? 'hero-button-primary' : 'hero-button-secondary'}`}
                  variant={btn.variant}
                >
                  {btn.label}
                  {btn.primary && (
                    <svg
                      className="hero-button-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;