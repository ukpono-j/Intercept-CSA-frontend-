import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ResourcesHero from '../assets/resource.jpg';

const colors = {
  primary: '#0f766e',
  primaryLight: '#14b8a6',
  primaryDark: '#134e4a',
  accent: '#f59e0b',
  text: '#1f2937',
  textLight: '#6b7280',
  white: '#ffffff',
  gray50: '#f9fafb',
  teal50: '#f0fdfa',
};

const STATIC_BASE_URL = import.meta.env.VITE_STATIC_BASE_URL || 'https://intercept-csa-backend.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

const staticResources = [
  {
    category: 'Quick Tools',
    title: 'How to Talk to a Child About Abuse',
    description: 'A conversation guide for parents, caregivers, and mentors.',
    modalContent: `
# How to Talk to a Child About Abuse

A conversation guide for parents, caregivers, and mentors to discuss child protection sensitively.

## Why It Matters
Talking to children about abuse helps them understand their rights, recognize unsafe situations, and seek help. Age-appropriate discussions build trust and empower children to stay safe.[](https://www.education.sa.gov.au/parents-and-families/curriculum-and-learning/early-years/keeping-safe-child-protection-curriculum-information-parents-and-carers)

## Key Strategies
- **Use Simple Language**: Explain private parts and safe/unsafe touch using terms like "private areas" (e.g., parts covered by a swimsuit). For young children, use resources like the Underwear Rule.[](https://learning.nspcc.org.uk/safeguarding-child-protection-schools/teaching-resources-lesson-plans)
- **Create a Safe Space**: Ensure the child feels comfortable and not judged. Start with open-ended questions like, "What do you do if someone makes you feel unsafe?"
- **Teach Consent**: Emphasize that they can say "no" to unwanted touch and should tell a trusted adult. Use scenarios to practice responses.[](https://www.education.sa.gov.au/schools-and-educators/child-protection/keeping-safe-child-protection-curriculum-information-educators)
- **Listen Actively**: If a child discloses abuse, stay calm, believe them, and report to authorities as needed. Avoid leading questions.[](https://www.qfcc.qld.gov.au/childsafe/resources)

## Tips for Caregivers
- Start early (ages 3-5) with basic safety concepts.
- Use storybooks or videos (e.g., Jessie & Friends for ages 4-7) to spark discussions.[](https://www.ceopeducation.co.uk/professionals/resources/)
- Revisit the conversation regularly to reinforce skills.

## Resources
- Download this guide as a PDF for practical scripts and scenarios.
- Visit [NSPCC Learning](https://learning.nspcc.org.uk) for additional tools.[](https://learning.nspcc.org.uk/safeguarding-child-protection-schools/teaching-resources-lesson-plans)

*Source: Adapted from Keeping Safe: Child Protection Curriculum and NSPCC resources.*
    `,
    icon: '🗣️',
    url: `${STATIC_BASE_URL}/resources/talk-to-child.pdf`,
  },
  {
    category: 'Quick Tools',
    title: 'First Listener Response Card',
    description: 'What to say when a child opens up to you.',
    modalContent: `
# First Listener Response Card

What to say (and what not to say) when a child opens up to you about abuse or unsafe situations.

## Why It Matters
Being the first person a child confides in is critical. Your response can encourage them to seek help or deter them from speaking out again.[](https://www.qfcc.qld.gov.au/childsafe/resources)

## Do's
- **Believe Them**: Say, "I believe you, and I'm here to help." Validation builds trust.
- **Stay Calm**: Keep your tone neutral to avoid alarming the child.
- **Use Open-Ended Questions**: Ask, "Can you tell me more?" instead of "Did they hurt you?"
- **Report Safely**: Follow mandatory reporting laws (e.g., contact local child protection services).[](https://www.vic.gov.au/child-protection-early-childhood-online-learning)
- **Reassure Safety**: Say, "You're safe now, and we'll figure this out together."

## Don'ts
- Don't promise secrecy; explain you need to tell someone to keep them safe.
- Don't ask leading questions like, "Was it [specific person]?"
- Don't show shock or disbelief, as it may discourage the child.

## Practical Steps
- Practice active listening: nod, maintain eye contact, and avoid interrupting.
- Use resources like the CFCA Webinar on responding to disclosures for training.[](https://www.qfcc.qld.gov.au/childsafe/resources)
- Keep a printed version of this card for quick reference in schools or community settings.

## Resources
- Download this card as a PDF for quick-reference guidelines.
- Explore [Second Step’s Family Materials](https://www.secondstep.org) for more.[](https://www.secondstep.org/child-protection)

*Source: Adapted from Second Step and Australian Institute of Family Studies.*
    `,
    icon: '👂',
    url: `${STATIC_BASE_URL}/resources/first-listener.pdf`,
  },
  {
    category: 'Quick Tools',
    title: 'Checklist: Is This a Safe Space?',
    description: 'Questions to assess if children are protected.',
    modalContent: `
# Checklist: Is This a Safe Space?

Questions to help salons, schools, and churches assess if children are emotionally and physically protected.

## Why It Matters
Creating a safe space ensures children feel secure and can thrive. This checklist aligns with Child Safe Standards to evaluate organizational safety.[](https://www.qfcc.qld.gov.au/childsafe/resources)

## Checklist Questions
1. **Policies**: Does your organization have a clear Child Safety Policy? Check for a documented commitment to child protection.[](https://childsafeguarding.com/resources/)
2. **Staff Training**: Are all staff trained to recognize and report abuse? Use resources like ChildSafe Australia’s training.[](https://www.childsafe.org.au/)
3. **Child Participation**: Are children encouraged to voice concerns? Use tools like the QFCC Model of Participation.[](https://www.qfcc.qld.gov.au/childsafe/resources)
4. **Physical Safety**: Are spaces free from hazards (e.g., cords, hard surfaces)? Refer to CPSC safety guidelines.[](https://www.cpsc.gov/Safety-Education/Safety-Education-Materials)
5. **Reporting Mechanisms**: Is there a clear process for reporting concerns? Designate a Safeguarding Lead.[](https://childsafeguarding.com/resources/)

## Implementation Tips
- Conduct regular audits using this checklist.
- Engage children in creating safety rules (e.g., “Safe Space Rules for Children”).[](https://www.ceopeducation.co.uk/professionals/resources/)
- Share findings with parents to build trust.

## Resources
- Download this checklist as a PDF for assessments.
- Visit [ChildSafe Australia](https://www.childsafe.org.au) for templates.[](https://www.childsafe.org.au/)

*Source: Adapted from Queensland Family and Child Commission and ChildSafe Australia.*
    `,
    icon: '✅',
    url: `${STATIC_BASE_URL}/resources/safe-space-checklist.pdf`,
  },
  {
    category: 'Posters & Flyers',
    title: '“You Can Tell Me” Poster',
    description: 'For salons, schools, homes.',
    modalContent: `
# “You Can Tell Me” Poster

A poster for salons, schools, and homes to signal a safe space for children to speak up.

## Why It Matters
Visible cues like posters encourage children to seek help from trusted adults. This aligns with trauma-informed practices to create safe environments.[](https://www.secondstep.org/child-protection)

## Key Features
- **Child-Friendly Design**: Uses clear language and visuals to tell children, “You can tell me if something’s wrong.”
- **Strategic Placement**: Display in high-traffic areas (e.g., school hallways, salon waiting areas).
- **Cultural Sensitivity**: Includes translations for diverse communities (e.g., available in multiple languages).[](https://www.qfcc.qld.gov.au/childsafe/resources)

## How to Use
- Place in visible locations to reassure children.
- Pair with staff training on responding to disclosures (see “First Listener Response Card”).
- Use as part of a broader Child Safe Standards implementation.[](https://ccyp.vic.gov.au/resources/child-safe-standards/)

## Tips
- Discuss the poster with children to explain its purpose.
- Combine with resources like the KS:CPC for comprehensive safety education.[](https://www.education.sa.gov.au/schools-and-educators/child-protection/keeping-safe-child-protection-curriculum-information-educators)

## Resources
- Download this poster as a PDF for printing.
- Check [NSPCC Learning](https://learning.nspcc.org.uk) for similar visuals.[](https://learning.nspcc.org.uk/safeguarding-child-protection-schools/teaching-resources-lesson-plans)

*Source: Adapted from NSPCC and Keeping Safe: Child Protection Curriculum.*
    `,
    url: `${STATIC_BASE_URL}/resources/you-can-tell-me-poster.pdf`,
  },
  {
    category: 'Posters & Flyers',
    title: 'Safe Space Rules for Children',
    description: 'Simple, visual, child-friendly rules.',
    modalContent: `
# Safe Space Rules for Children

Simple, visual, child-friendly rules to help children understand safety boundaries.

## Why It Matters
Children need clear, age-appropriate rules to recognize safe behaviors and seek help. This resource supports the KS:CPC’s focus on respectful relationships.[](https://www.education.sa.gov.au/schools-and-educators/child-protection/keeping-safe-child-protection-curriculum-information-educators)

## Core Rules
1. **Your Body Belongs to You**: No one can touch you without permission.
2. **Say No to Unsafe Touch**: It’s okay to say “no” and tell a trusted adult.
3. **Ask for Help**: If something feels wrong, talk to a teacher, parent, or trusted adult.
4. **Respect Others**: Treat others kindly, online and offline.[](https://www.esafety.gov.au/educators/classroom-resources)

## How to Use
- Display in classrooms or community centers.
- Use with storybooks like Jessie & Friends for ages 4-7 to reinforce rules.[](https://www.ceopeducation.co.uk/professionals/resources/)
- Integrate into lessons on consent and digital safety.

## Tips
- Review rules regularly with children.
- Encourage children to create their own safety posters to engage them.[](https://www.qfcc.qld.gov.au/childsafe/resources)

## Resources
- Download this poster as a PDF for classrooms.
- Visit [eSafety Commissioner](https://www.esafety.gov.au) for more visuals.[](https://www.esafety.gov.au/educators/classroom-resources)

*Source: Adapted from eSafety Commissioner and Keeping Safe: Child Protection Curriculum.*
    `,
    url: `${STATIC_BASE_URL}/resources/safe-space-rules.pdf`,
  },
  {
    category: 'Faith Tools',
    title: 'What the Bible Says About Protecting the Vulnerable',
    description: 'Conversation guide for faith communities.',
    modalContent: `
# What the Bible Says About Protecting the Vulnerable

A conversation guide for faith communities to discuss protecting children and vulnerable people.

## Why It Matters
Faith communities play a key role in child protection by fostering safe environments. Biblical principles emphasize caring for the vulnerable.[](https://childsafeguarding.com/resources/)

## Key Scriptures
- **Psalm 82:3-4**: “Defend the weak and the fatherless; uphold the cause of the poor and oppressed.”
- **Matthew 18:6**: Warns against harming children, emphasizing their protection.
- **James 1:27**: Calls for caring for orphans and widows in distress.

## Discussion Points
- **Community Role**: How can your faith group create a child-safe culture? Use ChildSafeguarding.com’s standards.[](https://childsafeguarding.com/resources/)
- **Practical Steps**: Train leaders to recognize abuse signs and follow reporting protocols.
- **Empowering Children**: Teach children their rights using resources like the UN Convention on the Rights of the Child.[](https://www.qfcc.qld.gov.au/childsafe/resources)

## Tips
- Host workshops to discuss these scriptures and safety policies.
- Use trauma-informed practices to support survivors.[](https://www.secondstep.org/child-protection)

## Resources
- Download this guide as a PDF for group discussions.
- Visit [ChildSafeguarding.com](https://childsafeguarding.com) for training.[](https://childsafeguarding.com/resources/)

*Source: Adapted from ChildSafeguarding.com and UN Convention resources.*
    `,
    url: `${STATIC_BASE_URL}/resources/bible-protecting-vulnerable.pdf`,
  },
  {
    category: 'Faith Tools',
    title: 'Replacing Harmful Sayings with Truths',
    description: 'Worksheet for reframing cultural beliefs.',
    modalContent: `
# Replacing Harmful Sayings with Life-Giving Truths

A printable worksheet for faith communities to reframe harmful cultural beliefs about child safety.

## Why It Matters
Cultural sayings can perpetuate harmful attitudes (e.g., “Children should be seen and not heard”). Reframing these promotes a child-safe culture.[](https://danielmorcombe.com.au/keeping-kids-safe-resources/)

## Worksheet Steps
1. **Identify Harmful Sayings**: List phrases like “What happens at home stays at home.”
2. **Reframe with Truth**: Replace with empowering messages, e.g., “Your voice matters; tell a trusted adult if something’s wrong.”
3. **Discuss Impact**: Explore how sayings affect children’s willingness to disclose abuse.[](https://www.qfcc.qld.gov.au/childsafe/resources)
4. **Create New Norms**: Develop community pledges for child safety.

## Tips
- Use with faith groups to spark discussions on cultural change.
- Pair with resources like the Daniel Morcombe Foundation’s guides.[](https://danielmorcombe.com.au/keeping-kids-safe-resources/)
- Encourage children to share their perspectives on safety.

## Resources
- Download this worksheet as a PDF for group activities.
- Visit [Daniel Morcombe Foundation](https://danielmorcombe.com.au) for more.[](https://danielmorcombe.com.au/keeping-kids-safe-resources/)

*Source: Adapted from Daniel Morcombe Foundation and QFCC resources.*
    `,
    url: `${STATIC_BASE_URL}/resources/replace-harmful-sayings.pdf`,
  },
];

const comingSoon = [
  { title: 'Video Explainers', icon: '🎥' },
  { title: 'Audio Resources for Rural Communities', icon: '🔊' },
  { title: 'Translated Versions in Local Languages', icon: '🌍' },
];

function Resources() {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const fetchResources = async (retries = 3, delay = 1000) => {
      setIsLoading(true);
      setError(null);
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await axios.get(`${API_URL}/resources`, {
            params: { limit: 12, page: 1 },
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
          });
          setResources(response.data.data || []);
          setIsLoading(false);
          return;
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err);
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            try {
              const retryResponse = await axios.get(`${API_URL}/resources`, {
                params: { limit: 12, page: 1 },
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
              });
              setResources(retryResponse.data.data || []);
              setIsLoading(false);
              return;
            } catch (retryErr) {
              console.error('Retry error:', retryErr);
            }
          }
          if (attempt < retries) await new Promise(resolve => setTimeout(resolve, delay * attempt));
          else setError('Unable to load resources right now. Please try again later.');
        }
      }
      setIsLoading(false);
    };
    fetchResources();
  }, []);

  const getImageUrl = image => image?.startsWith('http') 
    ? image.replace(/^h+ttps?:\/\//, 'https://') 
    : image ? `${STATIC_BASE_URL.replace(/\/+$/, '')}/${image.replace(/^\/+/, '')}` 
    : '/assets/placeholder.jpg';

  const Modal = ({ resource, onClose }) => {
    if (!resource) return null;
    const isStatic = !resource.id;
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 transition-all duration-200 z-10"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative">
            {resource.thumbnail && (
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={getImageUrl(resource.thumbnail)}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                  onError={e => {
                    if (!imageErrors[resource.id]) {
                      e.target.src = '/assets/placeholder.jpg';
                      setImageErrors(prev => ({ ...prev, [resource.id]: resource.thumbnail }));
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            )}
            <div className="p-6 sm:p-8">
              <span
                className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 text-white"
                style={{ backgroundColor: colors.accent }}
              >
                {isStatic ? resource.category : (resource.type.charAt(0).toUpperCase() + resource.type.slice(1))}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
                {resource.title}
              </h2>
              {!isStatic && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                  <span>
                    {new Date(resource.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                  <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                </div>
              )}
              <div className="text-slate-600 text-lg leading-relaxed mb-6 prose">
                <ReactMarkdown>{isStatic ? resource.modalContent : resource.fullDescription || resource.description}</ReactMarkdown>
              </div>
              <a
                href={resource.url}
                download
                className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
                style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)` }}
              >
                Download PDF
                <svg className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ResourceCard = ({ resource, index, isStatic = false, showIcon = false }) => (
    <article
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
    >
      {resource.thumbnail && (
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={getImageUrl(resource.thumbnail)}
            alt={resource.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onError={e => {
              if (!imageErrors[resource.id]) {
                e.target.src = '/assets/placeholder.jpg';
                setImageErrors(prev => ({ ...prev, [resource.id]: resource.thumbnail }));
              }
            }}
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
              Resource {index + 2}
            </span>
          </div>
        </div>
      )}
      <div className="p-6 flex flex-col min-h-[200px]">
        {showIcon && <div className="text-3xl mb-4">{resource.icon}</div>}
        <div className="mb-3">
          {!isStatic && (
            <span className="text-slate-500 text-sm font-medium">
              {new Date(resource.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-3 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors" style={{ color: colors.text }}>
          {/* {resource.title} */}
           {resource.title.length > 30 ? `${resource.title.slice(0, 30)}...` : resource.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {resource.description.length > 40 ? `${resource.description.slice(0, 40)}...` : resource.description}
        </p>
        <button
          onClick={() => setSelectedResource(resource)}
          className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
          style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)` }}
          aria-label={`View ${resource.title}`}
        >
          View More
          <svg className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
          ></div>
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"
            style={{ background: `linear-gradient(225deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}
          ></div>
        </div>
        <img
          src={ResourcesHero}
          alt="Resources for child protection education"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          fetchPriority="high"
          onError={e => {
            if (!imageErrors['hero']) {
              e.target.src = '/assets/placeholder.jpg';
              setImageErrors(prev => ({ ...prev, hero: ResourcesHero }));
            }
          }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-28 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold pt-7 tracking-tight text-white mb-6 leading-tight">
              Resources & 
              <span
                className="block"
                // style={{ color: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primaryLight} 100%)` }}
              >Tools</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light">
              Shame-free, community-friendly tools to protect children, understand CSA, and support survivors — without overwhelm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/get-involved"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
              >
                <span className="relative z-10">Get Involved</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a href="#resources" className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                Explore Resources
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="resources" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24">
        {['Quick Tools', 'Posters & Flyers', 'Faith Tools'].map(category => (
          <section key={category} className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center" style={{ color: colors.text }}>
              {category}
            </h2>
            <div className={`grid gap-8 ${category === 'Quick Tools' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {staticResources
                .filter(res => res.category === category)
                .map((resource, index) => (
                  <ResourceCard key={index} resource={resource} index={index} isStatic={true} showIcon={category === 'Quick Tools'} />
                ))}
            </div>
            {category === 'Posters & Flyers' && (
              <div className="text-center mt-8">
                <a
                  href="/resources/download-all"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
                >
                  Download All Resources
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </section>
        ))}

        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center" style={{ color: colors.text }}>
            Coming Soon
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((item, index) => (
              <article
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
              >
                <div className="p-6 flex flex-col min-h-[200px]">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors" style={{ color: colors.text }}>
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    Stay tuned for this upcoming resource!
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center text-slate-600 text-lg mt-8">
            Subscribe to our newsletter or podcast for updates on these new resources.
          </p>
          <div className="text-center mt-4">
            <Link
              to="/subscribe"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
            >
              Subscribe Now
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
          </div>
        </section>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="w-16 h-16 border-4 border-slate-200 rounded-full animate-spin" style={{ borderTopColor: colors.accent }}></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin animate-reverse" style={{ borderRightColor: colors.primary }}></div>
            </div>
            <p className="text-xl text-slate-600 mt-6 font-medium">Loading resources...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xl text-slate-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
            >
              Try Again
            </button>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xl text-slate-600 font-medium">No resources available at the moment.</p>
            <p className="text-slate-500 mt-2">Check back soon for new content.</p>
          </div>
        ) : (
          <>
            {resources.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center" style={{ color: colors.text }}>
                  Featured Resource
                </h2>
                <div className="relative group max-w-4xl mx-auto">
                  <div
                    className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
                    style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
                  ></div>
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-6 min-h-[300px]">
                      <div className="relative sm:w-1/2 overflow-hidden">
                        <img
                          src={getImageUrl(resources[0].thumbnail)}
                          alt={resources[0].title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          onError={e => {
                            if (!imageErrors[resources[0].id]) {
                              e.target.src = '/assets/placeholder.jpg';
                              setImageErrors(prev => ({ ...prev, [resources[0].id]: resources[0].thumbnail }));
                            }
                          }}
                        />
                      </div>
                      <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center">
                        <span
                          className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 w-fit text-white"
                          style={{ backgroundColor: colors.accent }}
                        >
                          Featured
                        </span>
                        <span className="text-slate-500 text-sm mb-3 font-medium">
                          {new Date(resources[0].publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight line-clamp-2" style={{ color: colors.text }}>
                          {resources[0].title}
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                          {resources[0].description.length > 50 ? `${resources[0].description.slice(0, 50)}...` : resources[0].description}
                        </p>
                        <button
                          onClick={() => setSelectedResource(resources[0])}
                          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
                          style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)` }}
                        >
                          View Resource
                          <svg className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <section>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.text }}>
                  Latest Resources
                </h2>
                <div className="hidden sm:flex items-center space-x-2 text-slate-500">
                  <span className="text-sm font-medium">{resources.length - 1} Resources</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="text-sm">Updated regularly</span>
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {resources.slice(1).map((resource, index) => (
                  <ResourceCard key={resource.id} resource={resource} index={index} />
                ))}
              </div>
            </section>
          </>
        )}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
              style={{ background: `linear-gradient(225deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
            ></div>
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: colors.text }}>
              Know a Space That Needs These Tools?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Share these resources to help protect children and empower communities.
            </p>
            <Link
              to="/recommend-community"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})` }}
            >
              <span className="relative z-10">Recommend a Community</span>
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      {selectedResource && <Modal resource={selectedResource} onClose={() => setSelectedResource(null)} />}
    </div>
  );
}

export default Resources;