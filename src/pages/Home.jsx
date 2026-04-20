import './Home.css';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import WhyOurWorkMatters from '../components/WhyOurWorkMatters';
import Hero from '../components/Hero';
import { useEffect, useRef } from 'react';
import NewsletterSubscription from '../components/NewsletterSubscription';
import ImpactfulPrograms from '../components/ImpactfulPrograms';
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
      quote: "“Through InterceptCSA’s programs, I found a safe space to heal and the courage to speak out. Now, I’m helping others do the same.”",
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