import { Link } from 'react-router-dom';
import Button from './Button';
import './Hero.css';
import portraitImmigrants from '../assets/close-up-parent-preparing-his-child-school.jpg';

function Hero({ headline, subheadline, buttons = [] }) {
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
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text-container">
          <h1 className="hero-title animate-hero-title">
            {headline}
          </h1>
          
          <p className="hero-subtitle animate-hero-text">
            {subheadline}
          </p>
          
          <div className="hero-buttons animate-hero-buttons">
            {buttons.map((btn, index) => (
              <Link key={index} to={btn.link} className="hero-button-link">
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