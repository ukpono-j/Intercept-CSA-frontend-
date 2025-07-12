import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import "./Hero.css";
import portraitImmigrants from '../assets/landing.png';

function Hero() {
  const navigate = useNavigate();
  const heroContent = {
    headline: 'Protecting Children. Restoring Safety. Reclaiming Voices.',
    subheadline: 'We work tirelessly to create safe environments for vulnerable children and families, providing comprehensive support, advocacy, and resources to build stronger, more resilient communities.',
    buttons: [
      { label: 'Learn About Our Work', to: '/about', primary: true, variant: 'primary' },
      { label: 'Get Involved', to: '/get-involved', primary: false, variant: 'secondary' },
    ],
  };

  // Function to scroll to next section
  const scrollToNextSection = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: 'smooth',
    });
  };

  // Handle click on hero section (excluding buttons)
  const handleHeroClick = (e) => {
    if (e.target.closest('.hero-button') || e.target.closest('.hero-badge')) {
      return;
    }
    scrollToNextSection();
  };

  return (
    <section className="hero" onClick={handleHeroClick} style={{ cursor: 'pointer' }}>
      {/* Background */}
      <div className="hero-background">
        <img
          src={portraitImmigrants}
          alt="Adult and child in safe conversation"
          className="hero-background-image"
          loading="eager"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Gradient overlays */}
      <div className="hero-gradient">
        <div className="hero-gradient-circle hero-gradient-circle-top-left"></div>
        <div className="hero-gradient-circle hero-gradient-circle-top-right"></div>
        <div className="hero-gradient-circle hero-gradient-circle-bottom-center"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text-container">
          {/* Main Headline */}
          <h1 className="hero-title">{heroContent.headline}</h1>

          {/* Subheadline */}
          <p className="hero-subtitle">{heroContent.subheadline}</p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            {heroContent.buttons.map((button, index) => (
              <button
                key={index}
                className={`hero-button hero-button-${button.variant}`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(button.to);
                }}
                aria-label={button.label}
              >
                {button.label}
                {/* <ArrowRight className="hero-button-icon" /> */}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Professional badge */}
      {/* <div className="hero-badge">Non-Profit Organization</div> */}

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator"
        onClick={(e) => {
          e.stopPropagation();
          scrollToNextSection();
        }}
        style={{ cursor: 'pointer' }}
        title="Scroll to next section"
        aria-label="Scroll to next section"
      >
        <div className="hero-scroll-indicator-border">
          <div className="hero-scroll-indicator-dot"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;