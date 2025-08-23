import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import "./Hero.css";
import portraitImmigrants from '../assets/For-hero.png';

function Hero() {
  const navigate = useNavigate();
  const heroContent = {
    headline: 'Protecting Children. Restoring Safety. Reclaiming Voices.',
    subheadline: 'We work tirelessly to create safe environments for vulnerable children and families, providing comprehensive support, advocacy, and resources to build stronger, more resilient communities.',
    buttons: [
      { label: 'Listen Now', to: '/podcast', primary: false, variant: 'secondary' },
      { label: 'Read the blog', to: '/blog', primary: true, variant: 'primary' },
    ],
  };

  return (
    <section id="hero-section" className="hero">
      <div className="hero-container">
        <div className="hero-text-container">
          <h1 className="hero-title">{heroContent.headline}</h1>
          <p className="hero-subtitle">{heroContent.subheadline}</p>
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
                <ArrowRight className="hero-button-icon" />
              </button>
            ))}
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src={portraitImmigrants}
            alt="Adult and child in safe conversation"
            className="hero-side-image"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;