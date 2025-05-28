import { Link } from 'react-router-dom';
import { colors } from '../utils/colors';
import Button from './Button';
import './Hero.css';

function Hero({ headline, subheadline, buttons = [] }) {
  return (
    <div className="relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight animate-hero-title">
          {headline}
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light animate-hero-text">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {buttons.map((btn, index) => (
            <Link
              key={index}
              to={btn.to}
              className="transform transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-yellow-500/50"
            >
              <Button
                className={`hero-button ${btn.primary
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25'
                    : 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm'
                  }`}
                aria-label={btn.label}
              >
                {btn.label}
                {btn.primary && (
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;