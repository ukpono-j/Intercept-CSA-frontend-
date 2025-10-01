import { useState, useEffect, useRef } from 'react';
import { Play, Download, Share2, Calendar, Users, Headphones, Clock, Mic, Volume2, X, ChevronRight, TrendingUp } from 'lucide-react';
import axios from 'axios';
import PodcastImage from "../assets/podcast.jpg";
import "./Podcast.css"
const STATIC_BASE_URL = import.meta.env.VITE_STATIC_BASE_URL || 'https://intercept-csa-backend.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

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

function Podcast() {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const episodesPerPage = 6;

  const validEpisodes = Array.isArray(episodes) ? episodes : [];
  const totalPages = Math.ceil(validEpisodes.length / episodesPerPage);
  const startIndex = (currentPage - 1) * episodesPerPage;
  const endIndex = startIndex + episodesPerPage;
  const currentEpisodes = validEpisodes.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchPodcasts = async (retries = 3, delay = 1000) => {
      setIsLoading(true);
      setError(null);

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          console.log(`Fetching podcasts, attempt ${attempt}`);

          // SIMPLIFIED: Only use timestamp query param for cache busting
          const timestamp = new Date().getTime();
          const response = await axios.get(`${API_URL}/podcast?status=published&_t=${timestamp}`, {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 15000,
          });

          console.log('API Response:', response.data);
          console.log('Podcast count:', response.data.length);
          if (response.data.length > 0) {
            console.log('First podcast updatedAt:', response.data[0].updatedAt);
            console.log('First podcast title:', response.data[0].title);
          }

          if (Array.isArray(response.data)) {
            setEpisodes(response.data);
          } else if (response.data && Array.isArray(response.data.podcasts)) {
            setEpisodes(response.data.podcasts);
          } else if (response.data && Array.isArray(response.data.data)) {
            setEpisodes(response.data.data);
          } else {
            console.warn('Unexpected response format:', response.data);
            setEpisodes([]);
          }

          setIsLoading(false);
          return;
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err);

          if (err.response?.status === 401) {
            localStorage.removeItem('token');
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
    if (!image) return PodcastImage;

    try {
      if (image.startsWith('http')) {
        return image;
      }

      const baseUrl = STATIC_BASE_URL.replace(/\/+$/, '');
      const cleanPath = image.replace(/^\/+/, '');
      return `${baseUrl}/${cleanPath}`;
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return PodcastImage;
    }
  };

  const getAudioUrl = (audioUrl) => {
    if (!audioUrl) return null;

    try {
      if (audioUrl.startsWith('http')) {
        return audioUrl;
      }

      const baseUrl = STATIC_BASE_URL.replace(/\/+$/, '');
      const cleanPath = audioUrl.replace(/^\/+/, '');
      return `${baseUrl}/${cleanPath}`;
    } catch (error) {
      console.error('Error constructing audio URL:', error);
      return null;
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown Date';
    }
  };

  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      'advocacy': 'Advocacy',
      'survivor-stories': 'Survivor Stories',
      'prevention': 'Prevention',
      'education': 'Education',
      'community': 'Community'
    };
    return categoryMap[category] || 'Episode';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'advocacy': 'from-purple-500 to-purple-600',
      'survivor-stories': 'from-pink-500 to-rose-600',
      'prevention': 'from-blue-500 to-blue-600',
      'education': 'from-green-500 to-emerald-600',
      'community': 'from-orange-500 to-amber-600'
    };
    return colorMap[category] || 'from-gray-500 to-gray-600';
  };

  // Enhanced Modal Component with click-outside-to-close
  const Modal = ({ episode, onClose }) => {
    const modalContentRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
          onClose();
        }
      };

      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [onClose]);

    if (!episode) return null;

    return (
      <div className="fixed inset-0 bg-black/80 z-[9999] backdrop-blur-md animate-fadeIn overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4 py-8">
          <div ref={modalContentRef} className="relative bg-white rounded-3xl max-w-5xl w-full shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto">
            <button
              onClick={onClose}
              className="sticky top-4 float-right mr-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all duration-200 z-10 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Hero Image with Gradient Overlay */}
              <div className="relative rounded-2xl overflow-hidden mb-6 sm:mb-8 h-64 sm:h-80">
                <img
                  src={getImageUrl(episode.image)}
                  alt={episode.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { e.target.src = PodcastImage; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <Volume2 className="w-16 h-16 sm:w-24 sm:h-24 text-white/20" />
                </div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20">
                  <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-full text-white bg-gradient-to-r ${getCategoryColor(episode.category)}`}>
                    {getCategoryDisplayName(episode.category)}
                  </span>
                </div>
              </div>

              {/* Episode Info */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight" style={{ color: colors.text }}>
                  {episode.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{formatDate(episode.createdAt)}</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mic className="w-4 h-4" />
                    <span className="font-medium">{episode.author?.name || 'Unknown Author'}</span>
                  </div>
                  {episode.duration && (
                    <>
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{episode.duration}</span>
                      </div>
                    </>
                  )}
                  {episode.views && (
                    <>
                      <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Headphones className="w-4 h-4" />
                        <span className="font-medium">{episode.views.toLocaleString()} views</span>
                      </div>
                    </>
                  )}
                </div>

                {episode.excerpt && (
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 p-3 sm:p-4 bg-slate-50 rounded-xl border-l-4" style={{ borderColor: colors.accent }}>
                    {episode.excerpt}
                  </p>
                )}

                {/* Audio Player */}
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl">
                  {getAudioUrl(episode.audioUrl) ? (
                    <div className="space-y-4">
                      {/* Custom Audio Player with Waveform */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            const audio = e.currentTarget.parentElement.parentElement.querySelector('audio');
                            if (audio.paused) {
                              audio.play();
                              e.currentTarget.innerHTML = '<svg class="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
                            } else {
                              audio.pause();
                              e.currentTarget.innerHTML = '<svg class="w-6 h-6 ml-1" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
                            }
                          }}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 flex-shrink-0"
                          style={{ backgroundColor: colors.accent }}
                        >
                          <Play className="w-6 h-6 ml-1" fill="white" />
                        </button>

                        {/* Animated Waveform */}
                        <div className="flex-1 flex items-center justify-center gap-0.5 sm:gap-1 h-16 overflow-hidden px-2">
                          {[...Array(window.innerWidth < 640 ? 25 : 40)].map((_, i) => (
                            <div
                              key={i}
                              className="waveform-bar bg-orange-400 rounded-full transition-all duration-150 flex-shrink-0"
                              style={{
                                width: '2px',
                                minWidth: '2px',
                                maxWidth: '2px',
                                height: `${20 + Math.random() * 40}%`,
                                animationDelay: `${i * 0.05}s`
                              }}
                            ></div>
                          ))}
                        </div>

                        {/* Time Display */}
                        <span className="text-white text-sm font-medium flex-shrink-0 min-w-[45px]">
                          {episode.duration || '00:00'}
                        </span>
                      </div>

                      {/* Hidden Audio Element */}
                      <audio
                        className="hidden"
                        onPlay={(e) => {
                          const bars = e.currentTarget.parentElement.querySelectorAll('.waveform-bar');
                          bars.forEach(bar => bar.classList.add('playing'));
                        }}
                        onPause={(e) => {
                          const bars = e.currentTarget.parentElement.querySelectorAll('.waveform-bar');
                          bars.forEach(bar => bar.classList.remove('playing'));
                        }}
                      >
                        <source src={getAudioUrl(episode.audioUrl)} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-center gap-6 text-white/70">
                        <button className="hover:text-white transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="hover:text-white transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-white/70 py-8">
                      No audio available
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="prose prose-sm sm:prose-lg max-w-none">
                  {episode.description?.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3 sm:mb-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {paragraph || <br />}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading Spinner
  const LoadingSpinner = () => (
    <div className="text-center py-16 sm:py-24">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
          style={{ borderTopColor: colors.accent, borderRightColor: colors.accent }}></div>
      </div>
      <p className="text-lg sm:text-xl text-slate-600 font-semibold mb-2">Loading Episodes</p>
      <p className="text-xs sm:text-sm text-slate-500">Preparing amazing content for you...</p>
    </div>
  );

  // Pagination Component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-12 sm:mt-16">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>

        <div className="flex gap-1.5 sm:gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 sm:w-12 sm:h-12 text-xs sm:text-sm font-bold rounded-xl transition-all ${currentPage === i + 1
                ? 'text-white shadow-lg scale-110'
                : 'text-slate-600 bg-white border-2 border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              style={currentPage === i + 1 ? { backgroundColor: colors.accent } : {}}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Next
        </button>
      </div>
    );
  };

  const stats = {
    totalEpisodes: validEpisodes.length || 0,
    totalListeners: '5,000+',
    avgRating: '4.8/5'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
            style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}></div>
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
            style={{ background: `linear-gradient(225deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}></div>
          <div className="absolute bottom-0 left-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"
            style={{ background: `linear-gradient(315deg, ${colors.accent} 0%, ${colors.primaryLight} 100%)` }}></div>
        </div>

        <div className="relative container mx-auto px-4 max-w-7xl py-12 sm:py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-white/90 text-xs sm:text-sm font-semibold">NEW EPISODES WEEKLY</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Intercept CSA
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 mt-2">
                  Podcast
                </span>
              </h1>

              <p className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Breaking the silence on Child Sexual Abuse through powerful conversations, expert insights, and survivor stories.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8">
                <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">{stats.totalEpisodes}</div>
                    <div className="text-xs sm:text-sm text-slate-400">Episodes</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-white/90">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">Wednesday</div>
                    <div className="text-xs sm:text-sm text-slate-400">New Podcast Drops</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4">
                <a href="#episodes" className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-5 text-base sm:text-lg font-bold text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: colors.accent }}>
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" fill="white" />
                  Listen Now
                </a>
                <button className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-5 text-base sm:text-lg font-bold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                  <Share2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Share Podcast
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative max-w-lg mx-auto">
                {/* Podcast Cover Mockup */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 transform hover:scale-105 transition-transform duration-500">
                  <div className="aspect-square bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                    <Mic className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Intercept CSA</h3>
                    <p className="text-sm sm:text-base text-slate-400">Breaking the Silence</p>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white rounded-2xl p-4 sm:p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">LIVE</div>
                      <div className="text-xs text-slate-500">Recording Now</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl p-4 sm:p-6 shadow-2xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-slate-900">+127%</div>
                      <div className="text-xs text-slate-500">Growth This Month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="episodes" className="container mx-auto px-4 max-w-7xl py-12 sm:py-20">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-16 sm:py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full mb-6 sm:mb-8">
              <Headphones className="w-10 h-10 sm:w-12 sm:h-12 text-red-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">Error Loading Episodes</h3>
            <p className="text-sm sm:text-base text-slate-600">{error}</p>
          </div>
        ) : validEpisodes.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mb-6 sm:mb-8">
              <Headphones className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">No Episodes Yet</h3>
            <p className="text-sm sm:text-base text-slate-600">Check back soon for amazing content!</p>
          </div>
        ) : (
          <>
            {/* Featured Episode */}
            {validEpisodes.length > 0 && (
              <div className="mb-16 sm:mb-24">
                <div className="flex items-center gap-4 mb-8 sm:mb-10">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                  <h2 className="text-3xl sm:text-4xl font-black text-center" style={{ color: colors.text }}>
                    Featured Episode
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                </div>

                <div className="relative group max-w-6xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})` }}></div>

                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative h-64 sm:h-96 lg:h-auto overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <img
                          src={getImageUrl(validEpisodes[0].image)}
                          alt={validEpisodes[0].title}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => { e.target.src = PodcastImage; }}
                        />
                        <Volume2 className="w-24 h-24 sm:w-32 sm:h-32 text-white/20" />
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                          <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white rounded-full bg-gradient-to-r ${getCategoryColor(validEpisodes[0].category)}`}>
                            {getCategoryDisplayName(validEpisodes[0].category)}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="font-semibold">{formatDate(validEpisodes[0].createdAt)}</span>
                          {validEpisodes[0].duration && (
                            <>
                              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              <span className="font-semibold">{validEpisodes[0].duration}</span>
                            </>
                          )}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 leading-tight" style={{ color: colors.text }}>
                          {validEpisodes[0].title}
                        </h3>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
                          {validEpisodes[0].excerpt || validEpisodes[0].description?.substring(0, 180) + '...'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                          <button
                            onClick={() => setSelectedEpisode(validEpisodes[0])}
                            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-2xl hover:shadow-xl transition-all duration-300 group"
                            style={{ backgroundColor: colors.accent }}
                          >
                            Listen Now
                            <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <button className="p-3 sm:p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all flex items-center justify-center">
                            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Episode Grid */}
            <section className='p-4 sm:p-7 rounded-3xl'>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-5 gap-4">
                <h2 className="text-3xl font-black" style={{ color: colors.text }}>
                  All Episodes
                </h2>
                <div className="flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-slate-100 rounded-full">
                  <Headphones className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800">{validEpisodes.length} Episodes</span>
                </div>
              </div>

              <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {currentEpisodes.map((episode) => (
                  <article
                    key={episode._id}
                    onMouseEnter={() => setHoveredCard(episode._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-slate-100 hover:border-slate-200 transform hover:-translate-y-3"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <img
                        src={getImageUrl(episode.image)}
                        alt={episode.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { e.target.src = PodcastImage; }}
                      />
                      <Volume2 className="w-16 h-16 sm:w-20 sm:h-20 text-white/20" />

                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${hoveredCard === episode._id ? 'opacity-100' : 'opacity-0'
                        }`}>
                        <button
                          onClick={() => setSelectedEpisode(episode)}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white transform scale-0 group-hover:scale-100 transition-transform duration-300"
                          style={{ backgroundColor: colors.accent }}
                        >
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1" fill="white" />
                        </button>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className={`inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-bold text-white rounded-full bg-gradient-to-r ${getCategoryColor(episode.category)}`}>
                          {getCategoryDisplayName(episode.category)}
                        </span>
                      </div>

                      {/* Duration Badge */}
                      {episode.duration && (
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                          <span className="text-xs font-bold text-white">{episode.duration}</span>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 sm:p-6 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(episode.createdAt)}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold mb-3 leading-tight min-h-[52px] sm:min-h-[56px] group-hover:text-opacity-80 transition-opacity"
                        style={{ color: colors.text }}>
                        {episode.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                        {episode.excerpt || episode.description?.substring(0, 120) + '...'}
                      </p>

                      {/* Footer with Author and Views */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                            <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <span className="text-xs font-semibold text-slate-600 truncate max-w-[100px]">
                            {episode.author?.name || 'Host'}
                          </span>
                        </div>

                        {episode.views && (
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Headphones className="w-3.5 h-3.5" />
                            <span className="font-semibold">{(episode.views / 1000).toFixed(1)}k</span>
                          </div>
                        )}
                      </div>

                      {/* Listen Button */}
                      <button
                        onClick={() => setSelectedEpisode(episode)}
                        className="mt-4 w-full inline-flex items-center justify-center px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-bold text-white rounded-xl hover:shadow-lg transition-all duration-300 group"
                        style={{ backgroundColor: colors.accent }}
                      >
                        Listen Now
                        <Play className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="white" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <Pagination />
            </section>
          </>
        )}
      </main>

      {/* Modal */}
      {selectedEpisode && <Modal episode={selectedEpisode} onClose={() => setSelectedEpisode(null)} />}

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
            style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"
            style={{ background: `linear-gradient(225deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}></div>
        </div>

        <div className="relative container mx-auto px-4 max-w-5xl py-16 sm:py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 text-xs sm:text-sm font-semibold">JOIN OUR COMMUNITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Never Miss an Episode
          </h2>

          <p className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 font-light">
            Subscribe for weekly episodes, exclusive content, and ways to support our mission to protect children.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
            <a href="/contact"
              className="w-full sm:w-auto group inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: colors.accent }}>
              Subscribe Now
              <ChevronRight className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-bold text-white border-2 border-white/30 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              <Share2 className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
              Share with Friends
            </button>
          </div>

          {/* Platform Icons */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10">
            <div className="text-white/70 text-xs sm:text-sm font-semibold">Available on:</div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {['Spotify', 'Apple', 'Audiomack', 'YouTube'].map((platform) => (
                <div key={platform} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                  <span className="text-white text-xs sm:text-sm font-semibold">{platform}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Podcast;