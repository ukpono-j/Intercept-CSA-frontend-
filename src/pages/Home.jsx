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
import NewsletterSubscription from '../components/NewsletterSubscription';
import { colors } from '../utils/colors';
import ImpactfulPrograms from '../components/ImpactfulPrograms';
import Voices from '../components/Voices';
import Partners from '../components/Partners';
import HomeBlog from '../components/HomeBlog';
import HomePodcastComponent from '../components/HomePodcastComponent';


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
    <div className="min-h-screen">
      <Hero />

      <WhyOurWorkMatters />

      <HomePodcastComponent />

      <HomeBlog />

      <ImpactfulPrograms />
      {/* <Voices/> */}

      {/* <Partners/> */}

      <NewsletterSubscription />
    </div>
  );
}

export default Home;