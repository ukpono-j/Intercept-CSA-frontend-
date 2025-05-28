import { colors } from '../utils/colors';
import './WhyOurWorkMatters.css';
import Shield from "../assets/secure.png";
import Unity from "../assets/unity.png";
import Like from "../assets/like.png";

function WhyOurWorkMatters() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Decorative Background Element */}
        <div className="absolute inset-0 opacity-10 z-0">
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill={`#${colors.secondary.replace('bg-', '')}`}
              d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        {/* Heading and Subheading */}
        <h2
          className={`text-4xl md:text-6xl font-extrabold mb-6 text-${colors.primary} animate-slide-in tracking-tight`}
        >
          Why Our Work Matters
        </h2>
        <p
          className="text-xl md:text-3xl mb-16 max-w-4xl mx-auto text-gray-800 animate-slide-in delay-100 leading-relaxed"
        >
          Child sexual abuse is a silent crisis in Nigeria. We’re breaking the silence with education, prevention, and healing to protect and empower our children.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative">
          <div
            className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl animate-card-in delay-0"
          >
            <div className="w-16 h-16 mx-auto mb-4">
              <img
                src={Shield}
                alt="Shield icon representing prevention"
                className="w-full h-full object-contain"
              />
            </div>
            <h3
              className={`text-2xl font-bold mb-4 text-${colors.secondary}`}
            >
              Prevention Saves Lives
            </h3>
            <p className="text-gray-600 leading-relaxed">
              By equipping communities with the tools to recognize and stop abuse early, we shield children from the lasting scars of trauma.
            </p>
          </div>
          <div
            className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl animate-card-in delay-200"
          >
            <div className="w-16 h-16 mx-auto mb-4">
              <img
                src={Like}
                alt="Heart icon representing healing"
                className="w-full h-full object-contain"
              />
            </div>
            <h3
              className={`text-2xl font-bold mb-4 text-${colors.secondary}`}
            >
              Healing Restores Hope
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our safe spaces and creative programs empower survivors to heal, rebuild their confidence, and embrace a brighter future.
            </p>
          </div>
          <div
            className="bg-white p-8 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl animate-card-in delay-400"
          >
            <div className="w-16 h-16 mx-auto mb-4">
              <img
                src={Unity}
                alt="Unity icon representing community action"
                className="w-full h-full object-contain"
              />
            </div>
            <h3
              className={`text-2xl font-bold mb-4 text-${colors.secondary}`}
            >
              Change Starts Together
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Uniting families, schools, and faith communities creates a powerful network to prevent abuse and protect children.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyOurWorkMatters;