import { useState, useEffect } from 'react';
import axios from 'axios';
import PodcastImage from "../assets/podcast.jpg";

const STATIC_BASE_URL = import.meta.env.VITE_STATIC_BASE_URL || 'https://intercept-csa-backend.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

// Optimized color palette matching Resources component
const colors = {
  primary: '#0f766e',      // Teal-700
  primaryLight: '#14b8a6', // Teal-500
  primaryDark: '#134e4a',  // Teal-800
  accent: '#f59e0b',       // Amber-500
  text: '#1f2937',         // Gray-800
  textLight: '#6b7280',    // Gray-500
  white: '#ffffff',
  gray50: '#f9fafb',
  teal50: '#f0fdfa',
};

function Podcast() {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async (retries = 3, delay = 1000) => {
      setIsLoading(true);
      setError(null);

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await axios.get(`${API_URL}/podcasts?status=published`, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
          });
          setEpisodes(response.data);
          setIsLoading(false);
          return;
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err);

          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            try {
              const retryResponse = await axios.get(`${API_URL}/podcasts?status=published`, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
              });
              setEpisodes(retryResponse.data);
              setIsLoading(false);
              return;
            } catch (retryErr) {
              console.error('Retry error:', retryErr);
            }
          }

          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
            continue;
          }

          setError('Unable to load podcast episodes right now. Please try again later.');
        }
      }
      setIsLoading(false);
    };
    fetchPodcasts();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return '/assets/placeholder.jpg';
    
    try {
      if (image.startsWith('http')) {
        return image.replace(/^h+ttps?:\/\//, 'https://');
      }
      const baseUrl = STATIC_BASE_URL.replace(/\/+$/, '');
      const cleanPath = image.replace(/^\/+/, '');
      return `${baseUrl}/${cleanPath}`;
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return '/assets/placeholder.jpg';
    }
  };

  const Modal = ({ episode, onClose }) => {
    if (!episode) return null;

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
          
          <div className="relative pt-10">
            {episode.image && (
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={getImageUrl(episode.image)}
                  srcSet={`${getImageUrl(episode.image)}?w=320 320w, ${getImageUrl(episode.image)}?w=640 640w`}
                  sizes="(max-width: 640px) 320px, 640px"
                  alt={episode.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    if (!imageErrors[episode._id]) {
                      e.target.src = '/assets/placeholder.jpg';
                      setImageErrors((prev) => ({ ...prev, [episode._id]: episode.image }));
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            )}
            {!episode.image && episode.excerpt && (
              <div className="relative h-64 sm:h-80 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center rounded-t-2xl">
                <blockquote className="text-center px-6 max-w-md">
                  <p className="text-base italic text-slate-600 line-clamp-3">"{episode.excerpt}"</p>
                </blockquote>
              </div>
            )}
            
            <div className="p-6 sm:p-8">
              <span
                className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 text-white"
                style={{ backgroundColor: colors.accent }}
              >
                {episode.category || 'Featured Episode'}
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
                {episode.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                <span>
                  {new Date(episode.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span>Hosted by {episode.author?.name || 'Unknown'}</span>
                {episode.duration && (
                  <>
                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                    <span>{episode.duration}</span>
                  </>
                )}
                {episode.tags?.length > 0 && (
                  <>
                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                    <span>{episode.tags.join(', ')}</span>
                  </>
                )}
              </div>
              
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                {episode.excerpt}
              </p>

              {episode.audioUrl && (
                <div className="mb-6">
                  <audio
                    controls
                    className="w-full"
                    style={{
                      borderRadius: '8px',
                      background: colors.gray50,
                      padding: '8px',
                    }}
                  >
                    <source src={getImageUrl(episode.audioUrl)} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <div className="prose prose-slate max-w-none text-base leading-relaxed">
                {episode.description?.split('\n').map((paragraph, index) => (
                  <p key={`para-${index}`} className="mb-4">
                    {paragraph || <br />}
                  </p>
                ))}
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
      <p className="text-lg text-slate-600 mt-6 font-medium">Loading podcast episodes...</p>
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
        style={{ backgroundColor: colors.accent, ':hover': { backgroundColor: `${colors.accent}/90` } }}
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
      <p className="text-lg text-slate-600 font-medium">No podcast episodes available yet.</p>
      <p className="text-slate-500 mt-2">Check back soon for new episodes.</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 podcast">
      {/* Hero Section */}
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
          <div
            className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"
            style={{ background: `linear-gradient(45deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
          ></div>
        </div>
        
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Podcast
              </h1>
              <p className="text-xl text-slate-300 max-w-4xl mx-auto lg:mx-0 leading-relaxed mb-8 font-light">
                CSA awareness and education through powerful conversations and stories.
              </p>
              <a
                href="#episodes"
                className="group relative inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.accent }}
              >
                <span className="relative z-10">Listen to the Podcast</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.2A1 1 0 0010 9.8v4.4a1 1 0 001.555.832l3.197-2.2a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </div>
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div
                className="absolute -inset-2 rounded-2xl blur opacity-20"
                style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
              ></div>
              <img
                src={PodcastImage}
                srcSet={`${PodcastImage}?w=320 320w, ${PodcastImage}?w=640 640w`}
                sizes="(max-width: 640px) 320px, 640px"
                alt="Podcast Host"
                className="relative w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="episodes" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay />
        ) : episodes.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Featured Episode */}
            {episodes.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center" style={{ color: colors.text }}>
                  Featured Episode
                </h2>
                <div className="relative group max-w-4xl mx-auto">
                  <div
                    className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"
                    style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
                  ></div>
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-6 min-h-[300px]">
                      <div className="relative sm:w-1/2 overflow-hidden">
                        {episodes[0].image ? (
                          <img
                            src={getImageUrl(episodes[0].image)}
                            srcSet={`${getImageUrl(episodes[0].image)}?w=320 320w, ${getImageUrl(episodes[0].image)}?w=640 640w`}
                            sizes="(max-width: 640px) 320px, 640px"
                            alt={episodes[0].title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              if (!imageErrors[episodes[0]._id]) {
                                e.target.src = '/assets/placeholder.jpg';
                                setImageErrors((prev) => ({ ...prev, [episodes[0]._id]: episodes[0].image }));
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <blockquote className="text-center px-6 max-w-md">
                              <p className="text-base italic text-slate-600 line-clamp-3">"{episodes[0].excerpt}"</p>
                            </blockquote>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center">
                        <span
                          className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 w-fit text-white"
                          style={{ backgroundColor: colors.accent }}
                        >
                          {episodes[0].category || 'Featured Episode'}
                        </span>
                        <span className="text-slate-500 text-sm mb-3 font-medium">
                          {new Date(episodes[0].createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 leading-tight line-clamp-2" style={{ color: colors.text }}>
                          {episodes[0].title}
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-2">
                          {episodes[0].excerpt}
                        </p>
                        <button
                          onClick={() => setSelectedEpisode(episodes[0])}
                          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
                          style={{ backgroundColor: colors.accent }}
                        >
                          Listen Now
                          <svg className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.2A1 1 0 0010 9.8v4.4a1 1 0 001.555.832l3.197-2.2a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Episode Grid */}
            <section>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.text }}>
                  Latest Episodes
                </h2>
                <div className="hidden sm:flex items-center space-x-2 text-slate-500">
                  <span className="text-sm font-medium">{episodes.length - 1} Episodes</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="text-sm">Updated regularly</span>
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {episodes.slice(1, 6).map((episode, index) => (
                  <article
                    key={episode._id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      {episode.image ? (
                        <img
                          src={getImageUrl(episode.image)}
                          srcSet={`${getImageUrl(episode.image)}?w=320 320w, ${getImageUrl(episode.image)}?w=640 640w`}
                          sizes="(max-width: 640px) 320px, 640px"
                          alt={episode.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            if (!imageErrors[episode._id]) {
                              e.target.src = '/assets/placeholder.jpg';
                              setImageErrors((prev) => ({ ...prev, [episode._id]: episode.image }));
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <blockquote className="text-center px-6 max-w-md">
                            <p className="text-sm italic text-slate-600 line-clamp-3">"{episode.excerpt}"</p>
                          </blockquote>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                          {episode.category || `Episode ${index + 2}`}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col min-h-[250px]">
                      <div className="mb-3">
                        <span className="text-slate-500 text-sm font-medium">
                          {new Date(episode.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-3 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors" style={{ color: colors.text }}>
                        {episode.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                        {episode.excerpt}
                      </p>
                      <button
                        onClick={() => setSelectedEpisode(episode)}
                        className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
                        style={{ backgroundColor: colors.accent }}
                        aria-label={`Listen to ${episode.title}`}
                      >
                        Listen Now
                        <svg className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.2A1 1 0 0010 9.8v4.4a1 1 0 001.555.832l3.197-2.2a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Modal */}
      {selectedEpisode && <Modal episode={selectedEpisode} onClose={() => setSelectedEpisode(null)} />}

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl"
            style={{ background: `linear-gradient(225deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl"
            style={{ background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}
          ></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight text-center" style={{ color: colors.text }}>
            Stay Tuned for <span
              className="block bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >New Episodes</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 text-center">
            Subscribe for updates on new podcast episodes, stories, and ways to support our mission in protecting children and empowering communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="group relative inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ backgroundColor: colors.accent }}
            >
              <span className="relative z-10">Subscribe Now</span>
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Podcast;