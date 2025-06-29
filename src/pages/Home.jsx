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
import ImpactfulPrograms from '../components/ImpactfulPrograms';
import Solution from '../components/Solution';
import Voices from '../components/Voices';
import Partners from '../components/Partners';


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
      {/* in this impactful programs use it to write why we are dealing with child sexual abuse */}
      <ImpactfulPrograms />

      <Solution />

      <Voices/>

     <Partners/>

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