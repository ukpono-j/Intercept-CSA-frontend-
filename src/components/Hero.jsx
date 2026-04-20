import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import "./Hero.css";
import portraitImmigrants from '../assets/For-hero.png';

function Hero() {
  const navigate = useNavigate();
  const heroContent = {
    headline: 'Changing how we see children changes how we protect them.',
    subheadline: 'Empowering communities. Protecting childhood. Restoring survivors.',
    buttons: [
      { label: 'Listen to Our Podcast Now', to: '/podcast', primary: false, variant: 'secondary' },
      { label: ' Read Our Blog', to: '/blog', primary: true, variant: 'primary' },
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