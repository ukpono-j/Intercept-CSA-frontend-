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

A practical guide for parents, caregivers, and mentors to discuss child protection with sensitivity and confidence.

## Why This Conversation Matters

Open, age-appropriate discussions about abuse empower children to recognize unsafe situations, understand their rights, and seek help when needed. These conversations build trust and create a foundation for safety.

## Key Strategies for Effective Discussions

- **Use Clear, Simple Language**: Explain concepts like private parts and safe/unsafe touch with terms children understand, such as “private areas” (e.g., parts covered by a swimsuit). For young children, tools like the Underwear Rule can help.
- **Foster a Safe Environment**: Create a judgment-free space where children feel comfortable sharing. Start with open-ended questions like, “What would you do if someone made you feel uneasy?”
- **Teach Consent Early**: Emphasize that children can say “no” to unwanted touch and should tell a trusted adult. Use role-playing scenarios to practice responses.
- **Listen Without Judgment**: If a child discloses abuse, stay calm, validate their feelings with phrases like “I believe you,” and report to authorities if required. Avoid leading questions to prevent distress.

## Practical Tips for Caregivers

- Begin conversations as early as ages 3–5 with basic safety concepts.
- Use engaging resources like storybooks or videos (e.g., *Jessie & Friends* for ages 4–7) to spark discussions.
- Revisit the topic regularly to reinforce safety skills and keep communication open.

## Additional Resources

- **Downloadable Guide**: Access this guide as a PDF with scripts and scenarios for easy reference.
- **NSPCC Learning**: Visit [NSPCC Learning](https://learning.nspcc.org.uk) for more tools and resources.

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

A concise guide on how to respond when a child discloses abuse or an unsafe situation, ensuring they feel heard and supported.

## Why Your Response Matters

As the first person a child confides in, your reaction can encourage them to seek further help or discourage them from speaking out again. A supportive response builds trust and prioritizes their safety.

## How to Respond Effectively

- **Validate Their Courage**: Say, “I believe you, and I’m here to help.” This reassures the child they’ve done the right thing.
- **Stay Calm and Composed**: Maintain a neutral tone to avoid alarming the child, even if the disclosure is upsetting.
- **Ask Open-Ended Questions**: Use prompts like, “Can you tell me more?” instead of specific questions like, “Did they hurt you?”
- **Follow Reporting Protocols**: Adhere to mandatory reporting laws by contacting local child protection services when necessary.
- **Reassure Their Safety**: Say, “You’re safe now, and we’ll figure this out together,” to provide comfort and clarity.

## What to Avoid

- **Don’t Promise Secrecy**: Explain that you need to share the information to keep them safe, but do so gently.
- **Avoid Leading Questions**: Refrain from questions that suggest answers, like, “Was it [specific person]?”
- **Don’t Show Shock**: Strong reactions may make the child feel guilty or hesitant to share more.

## Practical Steps for Preparation

- Practice active listening techniques, such as nodding and maintaining eye contact, to show engagement.
- Keep a printed version of this card in schools or community centers for quick reference.
- Explore training resources like the CFCA Webinar on responding to disclosures for deeper understanding.

## Additional Resources

- **Downloadable Card**: Get this response card as a PDF for quick-reference guidelines.
- **Second Step Materials**: Visit [Second Step](https://www.secondstep.org) for family-focused resources.

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

A straightforward checklist to help salons, schools, and churches ensure children are emotionally and physically protected.

## Why Safe Spaces Matter

Creating environments where children feel secure is essential for their well-being and growth. This checklist aligns with Child Safe Standards to evaluate and improve safety measures.

## Key Questions to Assess Safety

- **Clear Policies**: Does your organization have a documented Child Safety Policy outlining a commitment to protection?
- **Staff Training**: Are all staff members trained to recognize signs of abuse and follow reporting procedures? Resources like ChildSafe Australia’s training can help.
- **Child Involvement**: Are children encouraged to voice concerns? Tools like the QFCC Model of Participation can foster engagement.
- **Physical Safety**: Are spaces free from hazards, such as exposed cords or unsafe surfaces? Refer to CPSC safety guidelines for standards.
- **Reporting Processes**: Is there a clear, accessible process for reporting concerns, with a designated Safeguarding Lead?

## Steps to Strengthen Safety

- Conduct regular safety audits using this checklist to identify gaps.
- Involve children in creating safety rules, such as “Safe Space Rules for Children,” to empower them.
- Share audit results with parents and caregivers to build trust and transparency.

## Additional Resources

- **Downloadable Checklist**: Access this checklist as a PDF for easy assessments.
- **ChildSafe Australia**: Visit [ChildSafe Australia](https://www.childsafe.org.au) for templates and training materials.

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

A visually engaging poster for salons, schools, and homes to signal a safe space where children can speak up.

## Why This Poster Matters

Visible, child-friendly cues encourage children to approach trusted adults when they need help. This poster supports trauma-informed practices to foster safe environments.

## Features of the Poster

- **Child-Friendly Design**: Uses clear language and appealing visuals to communicate, “You can tell me if something’s wrong.”
- **Strategic Placement**: Ideal for high-traffic areas like school hallways or salon waiting rooms to maximize visibility.
- **Cultural Sensitivity**: Available in multiple languages to ensure inclusivity for diverse communities.

## How to Use Effectively

- Display in prominent locations to reassure children of their safety.
- Pair with staff training on responding to disclosures (see “First Listener Response Card”).
- Integrate into broader Child Safe Standards initiatives for a comprehensive approach.

## Tips for Engagement

- Discuss the poster’s purpose with children to build their confidence in speaking up.
- Combine with educational resources like the KS:CPC for holistic safety education.

## Additional Resources

- **Downloadable Poster**: Access this poster as a PDF for easy printing.
- **NSPCC Learning**: Visit [NSPCC Learning](https://learning.nspcc.org.uk) for additional visuals and tools.

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

A set of simple, visual, and child-friendly rules to help children understand and maintain safety boundaries.

## Why These Rules Matter

Clear, age-appropriate rules empower children to recognize safe behaviors and seek help when needed. This resource aligns with the KS:CPC’s focus on respectful relationships.

## Core Safety Rules

- **Your Body, Your Choice**: No one can touch you without your permission.
- **Say No to Unsafe Touch**: It’s okay to say “no” and tell a trusted adult if something feels wrong.
- **Seek Help**: If something doesn’t feel right, talk to a teacher, parent, or trusted adult.
- **Respect Everyone**: Treat others with kindness, both in person and online.

## How to Use These Rules

- Display in classrooms, community centers, or other child-friendly spaces.
- Pair with storybooks like *Jessie & Friends* (for ages 4–7) to reinforce concepts through storytelling.
- Incorporate into lessons on consent and digital safety for broader impact.

## Engagement Tips

- Review the rules regularly with children to keep them familiar.
- Encourage children to create their own safety posters to deepen their understanding.

## Additional Resources

- **Downloadable Poster**: Access this set of rules as a PDF for classroom use.
- **eSafety Commissioner**: Visit [eSafety Commissioner](https://www.esafety.gov.au) for more visuals and resources.

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

A conversation guide for faith communities to explore biblical principles and practical steps for protecting children and vulnerable individuals.

## Why Faith Communities Matter

Faith groups play a vital role in creating safe environments for children. Biblical teachings emphasize the importance of caring for and protecting the vulnerable.

## Key Biblical Teachings

- **Psalm 82:3–4**: “Defend the weak and the fatherless; uphold the cause of the poor and oppressed.”
- **Matthew 18:6**: Warns against harming children, underscoring their need for protection.
- **James 1:27**: Encourages caring for orphans and widows in their distress as a core expression of faith.

## Discussion Points for Communities

- **Building a Safe Culture**: How can your faith group foster a child-safe environment? Explore standards from ChildSafeguarding.com.
- **Practical Actions**: Train leaders to recognize signs of abuse and follow reporting protocols effectively.
- **Empowering Children**: Teach children their rights, drawing on resources like the UN Convention on the Rights of the Child.

## Tips for Implementation

- Host workshops to discuss these scriptures and develop safety policies.
- Adopt trauma-informed practices to support survivors with compassion and care.

## Additional Resources

- **Downloadable Guide**: Access this guide as a PDF for group discussions.
- **ChildSafeguarding.com**: Visit [ChildSafeguarding.com](https://childsafeguarding.com) for training and resources.

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

A printable worksheet for faith communities to challenge harmful cultural sayings and promote a child-safe culture.

## Why This Matters

Cultural sayings like “Children should be seen and not heard” can discourage children from speaking up. Reframing these beliefs fosters an environment where children feel valued and safe.

## Steps to Reframe Sayings

- **Identify Harmful Phrases**: Note sayings like “What happens at home stays at home” that may silence children.
- **Replace with Empowering Truths**: Use messages like, “Your voice matters; tell a trusted adult if something’s wrong.”
- **Discuss Their Impact**: Explore how harmful sayings affect children’s confidence to disclose abuse.
- **Create New Community Norms**: Develop pledges that prioritize child safety and open communication.

## Tips for Effective Use

- Use this worksheet in faith group discussions to spark cultural change.
- Pair with resources from the Daniel Morcombe Foundation for practical guidance.
- Invite children to share their perspectives on safety to ensure their voices are heard.

## Additional Resources

- **Downloadable Worksheet**: Access this worksheet as a PDF for group activities.
- **Daniel Morcombe Foundation**: Visit [Daniel Morcombe Foundation](https://danielmorcombe.com.au) for additional tools.

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
    : ResourcesHero;

  const Modal = ({ resource, onClose }) => {
    if (!resource) return null;
    const isStatic = !resource.id;
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
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
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
              <img
                src={getImageUrl(resource.thumbnail)}
                srcSet={`${getImageUrl(resource.thumbnail)}?w=320 320w, ${getImageUrl(resource.thumbnail)}?w=640 640w`}
                sizes="(max-width: 640px) 320px, 640px"
                alt={resource.title}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={e => {
                  if (!imageErrors[resource.id || resource.title]) {
                    e.target.src = '/assets/placeholder.jpg';
                    setImageErrors(prev => ({ ...prev, [resource.id || resource.title]: resource.thumbnail || ResourcesHero }));
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
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
              <div className="text-slate-600 text-base leading-relaxed mb-8 prose prose-slate">
                <ReactMarkdown>{isStatic ? resource.modalContent : resource.fullDescription || resource.description}</ReactMarkdown>
              </div>
              <a
                href={resource.url}
                download
                className="group inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit"
                style={{ backgroundColor: colors.accent }}
              >
                Download PDF
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
    >
      {resource.thumbnail && (
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={getImageUrl(resource.thumbnail)}
            srcSet={`${getImageUrl(resource.thumbnail)}?w=320 320w, ${getImageUrl(resource.thumbnail)}?w=640 640w`}
            sizes="(max-width: 640px) 320px, 640px"
            alt={resource.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={e => {
              if (!imageErrors[resource.id || resource.title]) {
                e.target.src = '/assets/placeholder.jpg';
                setImageErrors(prev => ({ ...prev, [resource.id || resource.title]: resource.thumbnail }));
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
          {resource.title.length > 30 ? `${resource.title.slice(0, 30)}...` : resource.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
          {resource.description.length > 40 ? `${resource.description.slice(0, 40)}...` : resource.description}
        </p>
        <button
          onClick={() => setSelectedResource(resource)}
          className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
          style={{ backgroundColor: colors.accent }}
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
    <div className="min-h-screen pt-20 bg-white resources" id="hero-section">
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
          ></div>
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"
            style={{ background: `linear-gradient(225deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}
          ></div>
        </div>
        <img
          src={ResourcesHero}
          srcSet={`${ResourcesHero}?w=320 320w, ${ResourcesHero}?w=640 640w`}
          sizes="(max-width: 640px) 320px, 640px"
          alt="Resources for child protection education"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="lazy"
          onError={e => {
            if (!imageErrors['hero']) {
              e.target.src = '/assets/placeholder.jpg';
              setImageErrors(prev => ({ ...prev, hero: ResourcesHero }));
            }
          }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Resources & <span className="block">Tools</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
              Shame-free, community-friendly tools to protect children, understand CSA, and support survivors — without overwhelm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/get-involved"
                className="group relative inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.accent }}
              >
                <span className="relative z-10">Get Involved</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#resources"
                className="inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Explore Resources
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="resources" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
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
              <div className="text-center mt-12">
                <a
                  href="/resources/download-all"
                  className="group inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  style={{ backgroundColor: colors.accent }}
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
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
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
          <p className="text-center text-slate-600 text-base mt-8">
            Subscribe to our newsletter or podcast for updates on these new resources.
          </p>
          <div className="text-center mt-4">
            <Link
              to="/subscribe"
              className="group inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ backgroundColor: colors.accent }}
            >
              Subscribe Now
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="relative inline-block">
              <div className="w-16 h-16 border-4 border-slate-200 rounded-full animate-spin" style={{ borderTopColor: colors.accent }}></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin animate-reverse" style={{ borderRightColor: colors.primary }}></div>
            </div>
            <p className="text-lg text-slate-600 mt-6 font-medium">Loading resources...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-lg text-slate-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: colors.accent }}
            >
              Try Again
            </button>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-lg text-slate-600 font-medium">No resources available at the moment.</p>
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
                    className="absolute -inset-1 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"
                    style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
                  ></div>
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-6 min-h-[300px]">
                      <div className="relative sm:w-1/2 overflow-hidden">
                        <img
                          src={getImageUrl(resources[0].thumbnail)}
                          srcSet={`${getImageUrl(resources[0].thumbnail)}?w=320 320w, ${getImageUrl(resources[0].thumbnail)}?w=640 640w`}
                          sizes="(max-width: 640px) 320px, 640px"
                          alt={resources[0].title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
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
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 leading-tight line-clamp-2" style={{ color: colors.text }}>
                          {resources[0].title}
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                          {resources[0].description.length > 50 ? `${resources[0].description.slice(0, 50)}...` : resources[0].description}
                        </p>
                        <button
                          onClick={() => setSelectedResource(resources[0])}
                          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
                          style={{ backgroundColor: colors.accent }}
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
              className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl"
              style={{ background: `linear-gradient(225deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
            ></div>
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight text-center" style={{ color: colors.text }}>
              Know a Space That Needs These Tools?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 text-center">
              Share these resources to help protect children and empower communities.
            </p>
            <div className="text-center">
              <Link
                to="/recommend-community"
                className="group relative inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.accent }}
              >
                <span className="relative z-10">Recommend a Community</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      {selectedResource && <Modal resource={selectedResource} onClose={() => setSelectedResource(null)} />}
    </div>
  );
}

export default Resources;