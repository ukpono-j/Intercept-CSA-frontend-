import React from 'react'
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import Smiling from '../assets/smiling.jpg';
import { Autoplay, Pagination } from 'swiper/modules';

const StoryOfHope = () => {
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
      quote: "Through Intercept CSA's programs, I found a safe space to heal and the courage to speak out. Now, I'm helping others do the same.",
      author: "A Survivor",
      highlight: "found a safe space to heal"
    },
    {
      quote: "The workshops gave me the tools to recognize and prevent abuse in my community. I feel empowered to make a difference.",
      author: "A Community Leader",
      highlight: "empowered to make a difference"
    },
    {
      quote: "Intercept CSA's support helped my child regain confidence. We're forever grateful for their care.",
      author: "A Parent",
      highlight: "regain confidence"
    },
  ];

  return (
    <section className="relative py-16 md:py-20 opacity-0 animate-section bg-gradient-to-b from-slate-50 to-white" ref={(el) => (sectionsRef.current[1] = el)}>
      {/* Hero Image with Enhanced Overlay */}
      <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-none md:rounded-3xl mx-0 md:mx-8 shadow-2xl">
        <img
          src={Smiling}
          alt="A child smiling after receiving support"
          className="w-full h-full object-cover transform hover:scale-105 transition-all duration-1000 ease-out"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Floating Quote Preview */}
        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-white/20">
            <p className="text-sm md:text-base text-slate-700 font-medium italic leading-relaxed">
              "Every story of healing begins with hope, courage, and the right support."
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center relative -mt-16 md:-mt-20">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Header Section */}
          <div className="px-6 md:px-12 pt-12 pb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Stories of{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-teal-700 bg-clip-text text-transparent">
                  Hope & Healing
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-200 via-teal-300 to-teal-200 rounded-full transform scale-x-0 animate-pulse"></div>
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Real voices, real impact. Discover how our community comes together to create lasting change and build brighter futures.
            </p>
          </div>

          {/* Stories Carousel */}
          <div className="px-6 md:px-12 pb-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              slidesPerView={1}
              spaceBetween={40}
              autoplay={{ 
                delay: 6000, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true 
              }}
              pagination={{ 
                clickable: true,
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-teal-500',
                bulletClass: 'swiper-pagination-bullet !bg-slate-300 !opacity-100'
              }}
              loop={true}
              className="story-carousel pb-16"
            >
              {stories.map((story, index) => (
                <SwiperSlide key={index}>
                  <div className="px-4 md:px-8 py-8">
                    <div className="max-w-4xl mx-auto">
                      {/* Quote Icon */}
                      <div className="text-6xl text-teal-200 mb-6 leading-none">
                        <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                      
                      {/* Story Text */}
                      <blockquote className="text-xl md:text-2xl lg:text-3xl text-slate-700 mb-8 italic leading-relaxed font-light">
                        "{story.quote}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-teal-300"></div>
                        <cite className="text-lg md:text-xl text-teal-700 font-semibold not-italic">
                          {story.author}
                        </cite>
                        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-teal-300"></div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Call to Action */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/blog" className="group">
                <Button 
                  variant="primary"
                  className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                >
                  <span className="flex items-center space-x-2">
                    <span>Read More Stories</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Button>
              </Link>
              
              <Link to="/get-involved" className="text-teal-600 hover:text-teal-700 font-semibold text-lg transition-colors duration-300 hover:underline">
                Share Your Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-8 w-2 h-16 bg-gradient-to-b from-teal-200 to-transparent rounded-full opacity-60 hidden lg:block"></div>
      <div className="absolute top-1/3 right-8 w-2 h-20 bg-gradient-to-b from-teal-300 to-transparent rounded-full opacity-40 hidden lg:block"></div>
    </section>
  )
}

export default StoryOfHope