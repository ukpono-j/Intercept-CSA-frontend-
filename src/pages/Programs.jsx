import { useEffect, useRef } from 'react';
import { colors } from '../utils/colors';
import './Programs.css';
import Education from "../assets/education.jpg";
import Outreach from "../assets/outreach.jpg";
import Faith from "../assets/faith.jpg";
import Training from "../assets/training.jpg";
import Healing from "../assets/healing.jpg";
import Resources from "../assets/resources.jpg";

function Programs() {
  const sectionsRef = useRef([]);
  const cardsRef = useRef([]);

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
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const programs = [
    {
      title: 'CSA Education & Advocacy',
      description:
        'We educate communities on child sexual abuse prevention and advocate for policies that protect children and support survivors.',
      image: Education,
    },
    {
      title: 'Street Kids Awareness & Outreach',
      description:
        'Our outreach programs raise awareness and provide support to vulnerable street children, reducing their risk of abuse.',
      image: Outreach,
    },
    {
      title: 'Faith Community Engagement',
      description:
        'We partner with faith-based organizations to promote child protection and create safe environments within religious communities.',
      image: Faith,
    },
    {
      title: 'Volunteer Training & Capacity Building',
      description:
        'We equip volunteers with the skills and knowledge needed to prevent abuse and support our mission effectively.',
      image: Training,
    },
    {
      title: 'Creative Healing Programs',
      description:
        'Our programs use creative outlets like art and storytelling to support survivors in their healing journey.',
      image: Healing,
    },
    {
      title: 'Resource Development',
      description:
        'We develop manuals, booklets, and training materials to empower communities and organizations in the fight against CSA.',
      image: Resources,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-0"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-28 lg:py-32">
          <div className="text-center">
            <div className="mb-6 mt-10">
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20">
                Our Initiatives
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight animate-hero-title">
              Our <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Programs</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light animate-hero-text">
              Empowering Nigerian communities through prevention, education, and healing to combat child sexual abuse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/get-involved"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10">Get Involved</span>
                <svg
                  className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#programs"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Explore Programs
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24 opacity-0"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
          Our Initiatives
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <article
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                    Program {index + 1}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col min-h-[250px]">
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors">
                  {program.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {program.description}
                </p>
                <a
                  href={`/programs/${program.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg hover:shadow-lg hover:shadow-slate-900/25 transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
                  aria-label={`Learn more about ${program.title}`}
                >
                  Learn More
                  <svg
                    className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 opacity-0"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/60 text-slate-700 backdrop-blur-sm border border-slate-200">
              Join Our Mission
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight animate-cta-title">
            Support Our <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Programs</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 animate-cta-text">
            Get involved or donate to help us protect children and empower communities across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/get-involved"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="relative z-10">Get Involved</span>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/donate"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-slate-700 bg-white rounded-full border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
            >
              Donate Now
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Programs;