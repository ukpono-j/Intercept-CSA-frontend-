import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Quote, Star, Sparkles, ArrowRight, Users, PlayCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { Link } from 'react-router-dom';

const STATIC_BASE_URL = import.meta.env.VITE_STATIC_BASE_URL || 'https://intercept-csa-backend.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

const colors = {
  primary: '#2A8E9D',
  primaryDark: '#237985',
  secondary: '#FF5245',
  secondaryDark: '#E04339',
  accent: '#FFC938',
  text: '#374050',
  warm50: '#FFF7ED',
  warm100: '#FEEBC8',
};

const HomeBlog = () => {
  const [posts, setPosts] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);

      // Fetch Blogs
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await axios.get(`${API_URL}/blogs?status=published`, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
          });
          if (!Array.isArray(response.data)) {
            console.error('Blog API did not return an array:', response.data);
            setError('Invalid blog data format received from server.');
            setPosts([]);
            break;
          }
          setPosts(response.data);
          break;
        } catch (err) {
          console.error(`Blog attempt ${attempt} failed:`, err);
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            try {
              const retryResponse = await axios.get(`${API_URL}/blogs?status=published`, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
              });
              if (!Array.isArray(retryResponse.data)) {
                console.error('Blog retry API did not return an array:', retryResponse.data);
                setError('Invalid blog data format received from server on retry.');
                setPosts([]);
                break;
              }
              setPosts(retryResponse.data);
              break;
            } catch (retryErr) {
              console.error('Blog retry error:', retryErr);
            }
          }
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            continue;
          }
          setError('Unable to load blogs right now. Please try again later.');
          setPosts([]);
        }
      }

      // Fetch Podcasts
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const response = await axios.get(`${API_URL}/podcast?status=published`, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
          });
          if (!Array.isArray(response.data)) {
            console.error('Podcast API did not return an array:', response.data);
            setError(prev => prev || 'Invalid podcast data format received from server.');
            setPodcasts([]);
            break;
          }
          setPodcasts(response.data);
          break;
        } catch (err) {
          console.error(`Podcast attempt ${attempt} failed:`, err);
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            try {
              const retryResponse = await axios.get(`${API_URL}/podcast?status=published`, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
              });
              if (!Array.isArray(retryResponse.data)) {
                console.error('Podcast retry API did not return an array:', retryResponse.data);
                setError(prev => prev || 'Invalid podcast data format received from server on retry.');
                setPodcasts([]);
                break;
              }
              setPodcasts(retryResponse.data);
              break;
            } catch (retryErr) {
              console.error('Podcast retry error:', retryErr);
            }
          }
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            continue;
          }
          setError(prev => prev || 'Unable to load podcasts right now. Please try again later.');
          setPodcasts([]);
        }
      }

      setIsLoading(false);
    };
    fetchContent();
  }, []);

  const getImageUrl = image => image?.startsWith('http')
    ? image.replace(/^h+ttps?:\/\//, 'https://')
    : image ? `${STATIC_BASE_URL.replace(/\/+$/, '')}/${image.replace(/^\/+/, '')}`
      : '/assets/placeholder.jpg';

  const getAudioUrl = audio => audio?.startsWith('http')
    ? audio.replace(/^h+ttps?:\/\//, 'https://')
    : audio ? `${STATIC_BASE_URL.replace(/\/+$/, '')}/${audio.replace(/^\/+/, '')}`
      : '';

  const Modal = ({ post, podcast, onClose }) => {
    if (!post && !podcast) return null;

    const item = post || podcast;
    const isPodcast = !!podcast;

    const markdownContent = isPodcast
      ? `
  # ${item.title}
  
  ${item.excerpt ? `> ${item.excerpt}\n` : ''}
  
  ## About This Episode
  
  This episode explores ${item.category || 'key insights'} related to child protection and community empowerment. Hosted by ${item.author?.name || 'an expert contributor'}, it offers perspectives to inspire action and awareness.
  
  ## Key Details
  
  - **Duration**: ${item.duration || 'Unknown'}
  - **Category**: ${item.category || 'General'}
  - **Tags**: ${item.tags?.join(', ') || 'None'}
  
  ## Listen Now
  
  <audio controls className="w-full mt-4">
    <source src="${getAudioUrl(item.audioUrl)}" type="audio/mp3" />
    Your browser does not support the audio element.
  </audio>
  
  ## Episode Summary
  
  ${item.description
        .split('\n')
        .filter(para => para.trim())
        .map(para => `- ${para}`)
        .join('\n')}
  
  ## Take Action
  
  - **Reflect**: Consider how this episode applies to your community or organization.
  - **Share**: Spread awareness by sharing this episode with others.
  - **Get Involved**: Visit our [Get Involved](/contact) page to support our mission.
  
  *Published on ${new Date(item.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}*
      `
      : `
  # ${item.title}
  
  ${item.excerpt ? `> ${item.excerpt}\n` : ''}
  
  ## About This Story
  
  This story explores ${item.category || 'key insights'} related to child protection and community empowerment. Written by ${item.author?.name || 'an expert contributor'}, it offers perspectives to inspire action and awareness.
  
  ## Key Insights
  
  ${item.content
        .split('\n')
        .filter(para => para.trim())
        .map(para => `- ${para}`)
        .join('\n')}
  
  ## Take Action
  
  - **Reflect**: Consider how this story applies to your community or organization.
  - **Share**: Spread awareness by sharing this story with others.
  - **Get Involved**: Visit our [Get Involved](/contact) page to support our mission.
  
  *Published on ${new Date(item.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })} | Tags: ${item.tags?.join(', ') || 'None'}*
      `;

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
                src={getImageUrl(item.image)}
                srcSet={`${getImageUrl(item.image)}?w=320 320w, ${getImageUrl(item.image)}?w=640 640w`}
                sizes="(max-width: 640px) 100vw, 640px"
                alt={item.title}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={e => {
                  if (!imageErrors[item._id]) {
                    e.target.src = '/assets/placeholder.jpg';
                    setImageErrors(prev => ({ ...prev, [item._id]: item.image || '/assets/placeholder.jpg' }));
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
                {item.category || (isPodcast ? 'Podcast' : 'Featured')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
                {item.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                <span>
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span>By {item.author?.name || 'Unknown'}</span>
                {item.tags?.length > 0 && (
                  <>
                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                    <span>{item.tags.join(', ')}</span>
                  </>
                )}
                {isPodcast && (
                  <>
                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                    <span>Duration: {item.duration || 'Unknown'}</span>
                  </>
                )}
              </div>
              <div className="text-slate-600 text-base leading-relaxed mb-8 prose prose-slate">
                <ReactMarkdown>{markdownContent}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LoadingSpinner = () => (
    <div className="text-center py-16">
      <div className="relative inline-block">
        <div
          className="w-16 h-16 border-4 border-slate-200 rounded-full animate-spin"
          style={{ borderTopColor: colors.accent }}
        ></div>
        <div
          className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin animate-reverse"
          style={{ borderRightColor: colors.primary }}
        ></div>
      </div>
      <p className="text-lg text-slate-600 mt-6 font-medium">Loading exceptional content...</p>
    </div>
  );

  const ErrorDisplay = () => (
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
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="text-lg text-slate-600 font-medium">No content available yet.</p>
      <p className="text-slate-500 mt-2">Check back soon for inspiring blogs and podcasts.</p>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-white blog pb-10" id="hero-section">
        <main id="articles" tabIndex="-1" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-5 md:py-10">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorDisplay />
          ) : posts.length === 0 && podcasts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Blog Section */}
              {posts.length > 0 && (
                <section className='p-4 rounded-3xl'>
                  <div className="flex items-center justify-between mb-7 mt-5">
                    <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
                      Latest Blogs
                    </h2>
                    <div className="hidden sm:flex items-center space-x-2 text-slate-500">
                      <span className="text-sm font-medium">{posts.length} Stories</span>
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                      <span className="text-sm">Updated regularly</span>
                    </div>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post, index) => (
                      <article
                        key={post._id}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                      >
                        <div className="relative h-48 sm:h-56 w-full max-w-full overflow-hidden">
                          {post.image ? (
                            <img
                              src={getImageUrl(post.image)}
                              srcSet={`${getImageUrl(post.image)}?w=320 320w, ${getImageUrl(post.image)}?w=640 640w`}
                              sizes="(max-width: 640px) 100vw, 640px"
                              alt={post.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                if (!imageErrors[post._id]) {
                                  e.target.src = '/assets/placeholder.jpg';
                                  setImageErrors((prev) => ({ ...prev, [post._id]: post.image }));
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                              <blockquote className="text-center px-6 max-w-md">
                                <p className="text-sm italic text-slate-600 line-clamp-3">"{post.excerpt}"</p>
                              </blockquote>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                              {post.category || `Story ${index + 1}`}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col min-h-[250px]">
                          <div className="mb-3">
                            <span className="text-slate-500 text-sm font-medium">
                              {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors" style={{ color: colors.text }}>
                            {post.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                            {post.excerpt}
                          </p>
                          <button
                            onClick={() => setSelectedPost(post)}
                            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
                            style={{ backgroundColor: colors.accent }}
                            aria-label={`Read more about ${post.title}`}
                          >
                            Read More
                            <svg className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* Podcast Section */}
              {/* {podcasts.length > 0 && (
                <section className="mt-16">
                  <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.text }}>
                      Latest Podcasts
                    </h2>
                    <div className="hidden sm:flex items-center space-x-2 text-slate-500">
                      <span className="text-sm font-medium">{podcasts.length} Episodes</span>
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                      <span className="text-sm">Updated regularly</span>
                    </div>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {podcasts.map((podcast, index) => (
                      <article
                        key={podcast._id}
                        className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                      >
                        <div className="relative h-48 sm:h-56 w-full max-w-full overflow-hidden">
                          {podcast.image ? (
                            <img
                              src={getImageUrl(podcast.image)}
                              srcSet={`${getImageUrl(podcast.image)}?w=320 320w, ${getImageUrl(podcast.image)}?w=640 640w`}
                              sizes="(max-width: 640px) 100vw, 640px"
                              alt={podcast.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                if (!imageErrors[podcast._id]) {
                                  e.target.src = '/assets/placeholder.jpg';
                                  setImageErrors((prev) => ({ ...prev, [podcast._id]: podcast.image }));
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                              <blockquote className="text-center px-6 max-w-md">
                                <p className="text-sm italic text-slate-600 line-clamp-3">"{podcast.excerpt}"</p>
                              </blockquote>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                              {podcast.category || `Episode ${index + 1}`}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col min-h-[250px]">
                          <div className="mb-3">
                            <span className="text-slate-500 text-sm font-medium">
                              {new Date(podcast.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors" style={{ color: colors.text }}>
                            {podcast.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                            {podcast.excerpt}
                          </p>
                          <button
                            onClick={() => setSelectedPodcast(podcast)}
                            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
                            style={{ backgroundColor: colors.accent }}
                            aria-label={`Listen to ${podcast.title}`}
                          >
                            Listen Now
                            <PlayCircle className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )} */}
            </>
          )}
        </main>

        {(selectedPost || selectedPodcast) && (
          <Modal 
            post={selectedPost} 
            podcast={selectedPodcast} 
            onClose={() => {
              setSelectedPost(null);
              setSelectedPodcast(null);
            }} 
          />
        )}
      </div>
    </>
  );
};

export default HomeBlog;