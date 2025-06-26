import { Link } from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';
import Smiling from '../assets/smiling.jpg';
import HoldingHands from '../assets/close-up-people-holding-hands.jpg';
import CSAWorkshop from '../assets/support-group.jpg';
import CreativeHealing from '../assets/creative-healing.jpg';
import StayConnected from '../assets/vision-image.jpg';
import portraitImmigrants from '../assets/close-up-parent-preparing-his-child-school.jpg';
import PartnerLogo from '../assets/partner_logo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import WhyOurWorkMatters from '../components/WhyOurWorkMatters';
import Hero from '../components/Hero';
import { useEffect, useRef } from 'react';
import StoryOfHope from '../components/StoryOfHope';
import NewsletterSubscription from '../components/NewsletterSubscription';
import { colors } from '../utils/colors';


function Home() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-section');
            }, index * 250);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const stories = [
    {
      quote: "“Through Intercept CSA’s programs, I found a safe space to heal and the courage to speak out. Now, I’m helping others do the same.”",
      author: "A Survivor",
    },
    {
      quote: "“The workshops gave me the tools to recognize and prevent abuse in my community. I feel empowered to make a difference.”",
      author: "A Community Leader",
    },
    {
      quote: "“Intercept CSA’s support helped my child regain confidence. We’re forever grateful for their care.”",
      author: "A Parent",
    },
  ];

  return (
    <div className="min-h-screen mt-14 bg-white">
      <Hero />

      <WhyOurWorkMatters />

      {/* Story of Hope section */}
      <StoryOfHope />


      <section className="py-16 md:py-24 bg-slate-50 opacity-0 animate-section" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Our <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Impactful Programs</span>
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              { image: CSAWorkshop, alt: "Community workshop on CSA prevention", title: "Community Education" },
              { image: CreativeHealing, alt: "Children in a creative healing session", title: "Creative Healing" },
            ].map((program, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
              >
                <div className="relative h-64 sm:h-72">
                  <img
                    src={program.image}
                    alt={program.alt}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/programs">
              <Button variant="primary">Discover All Programs</Button>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-[#237985] opacity-0 animate-section"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/20 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"
          ></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-cta-title">
            Be a <span className="block bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">Part of the Solution</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed mb-10 animate-cta-text">
            Your support can change lives. Join us to protect children and empower survivors across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/get-involved"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`,
                boxShadow: `0 20px 40px ${colors.secondary}25`
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 25px 50px ${colors.secondary}40`;
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = `0 20px 40px ${colors.secondary}25`;
              }}
            >
              <span className="relative z-10">Volunteer Now</span>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, ${colors.secondaryDark}, ${colors.accent})` }}
              ></div>
            </Link>
            <Link
              to="/resources"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
                boxShadow: `0 20px 40px ${colors.primary}25`
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 25px 50px ${colors.primary}40`;
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = `0 20px 40px ${colors.primary}25`;
              }}
            >
              <span className="relative z-10">Explore Resources</span>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primary})` }}
              ></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24 opacity-0 animate-section" ref={(el) => (sectionsRef.current[4] = el)}>
        <div className="relative h-80 sm:h-96 overflow-hidden">
          <img
            src={HoldingHands}
            alt="Community members uniting for child protection"
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center relative -mt-20">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Voices of <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Change</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 italic">
              “Intercept CSA’s training transformed our school. We now know how to protect our students and support those who need help.” – A Teacher
            </p>
            <Link to="/blog">
              <Button variant="primary">Hear More Voices</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 opacity-0 animate-section" ref={(el) => (sectionsRef.current[5] = el)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12">
            Our <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Partners in Protection</span>
          </h2>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={30}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            loop={true}
            className="partner-carousel"
          >
            {[
              '/assets/images/logos/partner-logo1.png',
              '/assets/images/logos/partner-logo2.png',
              '/assets/images/logos/partner-logo3.png',
              '/assets/images/logos/partner-logo4.png',
              '/assets/images/logos/partner-logo1.png',
              '/assets/images/logos/partner-logo2.png',
            ].map((logo, index) => (
              <SwiperSlide key={index}>
                <img
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  className="h-24 w-full object-contain mx-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    e.currentTarget.src = PartnerLogo;
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="mt-12">
            <Link to="/get-involved">
              <Button variant="primary">Partner With Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 opacity-0 animate-section" ref={(el) => (sectionsRef.current[6] = el)}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <img
          src={StayConnected}
          alt="Children playing in a safe environment"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="lazy"
          decoding="async"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
          <div className="mb-6"></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight animate-cta-title">
            Stay <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Connected</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 animate-cta-text">
            Join our community to receive updates on our work, survivor stories, and ways to get involved.
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-full text-slate-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300 mb-4"
              aria-label="Email for newsletter subscription"
            />
            <Button variant="primary" className="w-full">
              Subscribe Now
            </Button>
          </div>
        </div>
      </section> */}
      <NewsletterSubscription />
    </div>
  );
}

export default Home;