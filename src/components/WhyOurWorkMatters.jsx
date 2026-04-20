import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Users,
  ArrowRight,
  HandHeart,
  Sparkles,
  Target,
  RefreshCw
} from 'lucide-react';

const WhyIntercept = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      id: 'reframing',
      icon: Sparkles,
      title: 'Reframing Childhood',
      description: 'We challenge the core beliefs that enable abuse by helping communities see children as vulnerable, inherently worthy, and never at fault. This pillar dismantles cultural myths and societal norms to build a foundational mindset of respect and automatic protection for every child.',
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      id: 'reshaping',
      icon: RefreshCw,
      title: 'Reshaping Community Response',
      description: 'We train families, institutions, and leaders to respond to disclosures with care, justice, and understanding. This focuses on the critical moments of intervention, ensuring that a child\'s or survivor\'s first steps toward help are met with validation and a clear, trauma-informed path to accountability.',
      gradient: 'from-yellow-400 to-yellow-500'
    },
    {
      id: 'restoring',
      icon: Heart,
      title: 'Restoring Survivors',
      description: 'We provide safe spaces, counselling, peer support, and cultural or spiritual reframing to help survivors heal holistically. This pillar focuses on the long-term recovery of the individual, empowering them to process trauma and reclaim their full sense of self and safety.',
      gradient: 'from-red-400 to-red-500'
    },
    {
      id: 'reclaiming',
      icon: Target,
      title: 'Reclaiming the Future',
      description: 'We empower entire communities (survivors, parents, institutions, and advocates) to become active custodians of safety. This pillar is about future-proofing childhood. Our work ensures that the lessons of today build a world where everyone is equipped to prevent abuse, intervene effectively, and support healing for the children of tomorrow.',
      gradient: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div
      ref={sectionRef}
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/20"></div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-teal-300/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-yellow-200/20 to-yellow-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
              Why Intercept?
            </span>
          </h1>

          <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed text-slate-700 font-medium mb-8">
            Because without us, children wait, and the waiting never ends.
          </p>
          
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            <p className="text-base lg:text-lg leading-relaxed text-slate-600">
              Child sexual abuse is not rare. It happens every day in homes, schools, and communities that seem safe. Yet much of it remains unseen: the silence of survivors, the misunderstanding of childhood vulnerability, and the absence of systems that truly protect and heal.
            </p>
            
            <p className="text-2xl lg:text-3xl leading-relaxed text-slate-800 font-bold text-center py-4">
              One in four girls. One in six boys.
            </p>
            
            <p className="text-base lg:text-lg leading-relaxed text-slate-600">
              Those are the numbers, but they only reflect the cases reported. Behind them are countless voices never heard and lives still struggling to recover from what was taken.
            </p>
            
            <p className="text-lg lg:text-xl leading-relaxed text-slate-700 font-semibold text-center pt-4">
              InterceptCSA exists because child sexual abuse is not a single event. It is a cycle that continues through generations when left unchallenged. We are here to stop it.
            </p>
          </div>
        </div>

        {/* The Intercept Approach Section */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
            The Intercept Approach
          </h2>
          <p className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed text-slate-600">
            We don't just treat the symptoms; we transform the conditions that allow abuse to thrive. Our approach guides everything we do: from challenging harmful norms, to equipping communities to respond with care, and supporting survivors to heal fully.
          </p>
        </div>
        
        {/* Four Pillars Title */}
        <h3 className={`text-2xl md:text-3xl font-bold text-center mb-12 text-slate-800 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Our Four Pillars of Change
        </h3>

        {/* Pillars Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                className={`group relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                style={{
                  transitionDelay: isVisible ? `${(index + 3) * 100}ms` : '0ms'
                }}
                onMouseEnter={() => setHoveredCard(pillar.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${pillar.gradient} shadow-md transform transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                      {pillar.title}
                    </h4>
                    <p className="text-base leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className={`mt-6 transform transition-all duration-300 ${hoveredCard === pillar.id ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-0'
                    }`}>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Stories Section */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              Impact Stories
            </h3>
            <p className="text-lg text-slate-600 italic">Where change becomes personal.</p>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sarah's Journey",
                story: "After years of silence, Sarah found her voice through our survivor support program. Today, she advocates for other survivors in her community.",
                gradient: "from-teal-500 to-teal-600"
              },
              {
                title: "Community Shift",
                story: "A local school partnered with us to implement protective policies. Within six months, three children felt safe enough to disclose abuse and receive help.",
                gradient: "from-yellow-400 to-yellow-500"
              },
              {
                title: "Breaking the Cycle",
                story: "Marcus learned healthy parenting through our programs, ensuring his children would never experience what he endured as a child.",
                gradient: "from-red-400 to-red-500"
              },
              {
                title: "Faith Leaders Stand",
                story: "Religious leaders we trained now prioritize child safety in their teachings, reaching thousands with messages of protection and healing.",
                gradient: "from-teal-500 to-teal-600"
              }
            ].map((story, index) => (
              <div
                key={index}
                className="group relative bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                style={{
                  transitionDelay: isVisible ? `${(index + 7) * 100}ms` : '0ms'
                }}
              >
                {/* Gradient Bar */}
                <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${story.gradient} mb-4 transition-all duration-300 group-hover:w-24`}></div>
                
                {/* Content */}
                <h4 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">
                  {story.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                  {story.story}
                </p>

                {/* Read More Indicator */}
                <div className="mt-4 flex items-center gap-2 text-slate-500 group-hover:text-slate-700 transition-all duration-300">
                  <span className="text-xs font-medium">Read more</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyIntercept;