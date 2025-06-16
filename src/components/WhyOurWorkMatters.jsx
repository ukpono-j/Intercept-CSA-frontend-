import { colors } from '../utils/colors';
import './WhyOurWorkMatters.css';
import Shield from '../assets/secure.png';
import Unity from '../assets/unity.png';
import Like from '../assets/like.png';

function WhyOurWorkMatters() {
  return (
    <section className="why-matters-section py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 z-0">
        <div
          className="gradient-circle top-0 left-0"
          style={{ background: `radial-gradient(circle, ${colors.primary}30, transparent 70%)` }}
        ></div>
        <div
          className="gradient-circle bottom-0 right-0"
          style={{ background: `radial-gradient(circle, ${colors.secondary}30, transparent 70%)` }}
        ></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center relative z-10">
        <h2
          className="section-title text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 animate-slide-in"
          style={{ color: colors.text }}
        >
          Why Our Work <span className="gradient-text">Matters</span>
        </h2>
        <p
          className="section-text text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-slide-in delay-100"
        >
          Child sexual abuse is a silent crisis in Nigeria. We’re breaking the silence with education, prevention, and healing to protect and empower our children.
        </p>
        <div className="cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="card bg-white rounded-2xl shadow-lg hover:shadow-2xl animate-card-in delay-0">
            <div className="icon-wrapper w-16 h-16 mx-auto mb-4">
              <img
                src={Shield || '/assets/placeholder.png'}
                alt="Shield icon representing prevention"
                className="w-full h-full object-contain icon-pulse"
                loading="lazy"
              />
            </div>
            <h3
              className="card-title text-xl sm:text-2xl font-bold mb-3"
              style={{ color: colors.primary }}
            >
              Prevention Saves Lives
            </h3>
            <p className="card-text text-gray-600 leading-relaxed">
              Equipping communities with tools to recognize and stop abuse early shields children from lasting trauma.
            </p>
          </div>
          <div className="card bg-white rounded-2xl shadow-lg hover:shadow-2xl animate-card-in delay-200">
            <div className="icon-wrapper w-16 h-16 mx-auto mb-4">
              <img
                src={Like || '/assets/placeholder.png'}
                alt="Heart icon representing healing"
                className="w-full h-full object-contain icon-pulse"
                loading="lazy"
              />
            </div>
            <h3
              className="card-title text-xl sm:text-2xl font-bold mb-3"
              style={{ color: colors.primary }}
            >
              Healing Restores Hope
            </h3>
            <p className="card-text text-gray-600 leading-relaxed">
              Safe spaces and creative programs empower survivors to heal, rebuild confidence, and embrace a brighter future.
            </p>
          </div>
          <div className="card bg-white rounded-2xl shadow-lg hover:shadow-2xl animate-card-in delay-400">
            <div className="icon-wrapper w-16 h-16 mx-auto mb-4">
              <img
                src={Unity || '/assets/placeholder.png'}
                alt="Unity icon representing community action"
                className="w-full h-full object-contain icon-pulse"
                loading="lazy"
              />
            </div>
            <h3
              className="card-title text-xl sm:text-2xl font-bold mb-3"
              style={{ color: colors.primary }}
            >
              Change Starts Together
            </h3>
            <p className="card-text text-gray-600 leading-relaxed">
              Uniting families, schools, and faith communities creates a powerful network to prevent abuse and protect children.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <a
            href="/get-involved"
            className="btn-primary inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full transition-all duration-300"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            aria-label="Get involved to support our mission"
          >
            Get Involved
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default WhyOurWorkMatters;
