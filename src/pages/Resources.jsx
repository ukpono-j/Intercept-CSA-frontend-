import { useState, useEffect } from 'react';
import axios from 'axios';
import { colors } from '../utils/colors';
import './Resources.css';
import ResourcesHero from '../assets/resource.jpg';
import { Link } from 'react-router-dom';

const STATIC_BASE_URL = import.meta.env.VITE_STATIC_BASE_URL || 'https://intercept-csa-backend.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

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
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000, // 10s timeout
          });
          setResources(response.data.data || []); // Ensure empty array if no data
          setIsLoading(false);
          return; // Success, exit loop
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
            url: `${API_URL}/resources`,
          });

          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            try {
              const retryResponse = await axios.get(`${API_URL}/resources`, {
                params: { limit: 12, page: 1 },
                headers: {
                  'Content-Type': 'application/json',
                },
                timeout: 10000,
              });
              setResources(retryResponse.data.data || []); // Ensure empty array
              setIsLoading(false);
              return;
            } catch (retryErr) {
              console.error('Retry error:', retryErr);
            }
          }

          if (attempt < retries) {
            await new Promise(resolve => setTimeout(resolve, delay * attempt)); // Exponential backoff
            continue;
          }

          // All retries failed
          setError('Unable to load resources right now. Please try again later.');
        }
      }
      setIsLoading(false); // Ensure loading stops after all attempts
    };
    fetchResources();
  }, []);

  const getImageUrl = (image) => {
    if (!image) {
      console.warn('No image provided for resource, using placeholder');
      return '/assets/placeholder.jpg';
    }

    try {
      let imagePath = image;
      if (imagePath.startsWith('http')) {
        imagePath = imagePath.replace(/^h+ttps?:\/\//, 'https://');
        return imagePath;
      }
      const baseUrl = STATIC_BASE_URL.replace(/\/+$/, ''); // Remove trailing slashes
      const cleanPath = imagePath.replace(/^\/+/, ''); // Remove leading slashes
      const finalUrl = `${baseUrl}/${cleanPath}`;
      return finalUrl;
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return '/assets/placeholder.jpg';
    }
  };

  const openModal = (resource) => {
    setSelectedResource(resource);
  };

  const closeModal = () => {
    setSelectedResource(null);
  };

  const Modal = ({ resource, onClose }) => {
    if (!resource) return null;

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
                  onError={(e) => {
                    if (!imageErrors[resource._id]) {
                      console.error(`Failed to load modal image: ${getImageUrl(resource.thumbnail)}`);
                      e.target.src = '/assets/placeholder.jpg';
                      setImageErrors((prev) => ({ ...prev, [resource._id]: resource.thumbnail }));
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            )}
            <div className="p-6 sm:p-8">
              <span
                className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4"
                style={{
                  color: colors.secondary,
                  backgroundColor: `${colors.secondary}20`
                }}
              >
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
                {resource.title}
              </h2>
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
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {resource.description}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                  boxShadow: `0 0 0 0 ${colors.primary}25`
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = `0 25px 50px -12px ${colors.primary}25`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = `0 0 0 0 ${colors.primary}25`;
                }}
              >
                View Resource
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

  return (
    <div className="min-h-screen bg-white">
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)`
            }}
          ></div>
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"
            style={{
              background: `linear-gradient(225deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
            }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"
            style={{
              background: `linear-gradient(45deg, ${colors.accent} 0%, ${colors.secondary} 100%)`
            }}
          ></div>
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        <img
          src={ResourcesHero}
          alt="Resources for child protection education"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          fetchPriority="high"
          decoding="async"
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-28 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold pt-7 tracking-tight text-white mb-6 leading-tight">
              Resources & <span
                className="block bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >Tools</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light">
              Explore podcasts, articles, videos, and guides dedicated to preventing child sexual abuse and empowering communities in Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/get-involved"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)`,
                  boxShadow: `0 0 0 0 ${colors.secondary}25`
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = `0 25px 50px -12px ${colors.secondary}25`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = `0 0 0 0 ${colors.secondary}25`;
                }}
              >
                <span className="relative z-10">Get Involved</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondaryDark} 0%, ${colors.secondary} 100%)`
                  }}
                ></div>
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
        {isLoading ? (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div
                className="w-16 h-16 border-4 border-slate-200 rounded-full animate-spin"
                style={{ borderTopColor: colors.accent }}
              ></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin animate-reverse"
                style={{ borderRightColor: colors.secondary }}
              ></div>
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
              style={{
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)`,
                boxShadow: `0 0 0 0 ${colors.secondary}25`
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 25px 50px -12px ${colors.secondary}25`;
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = `0 0 0 0 ${colors.secondary}25`;
              }}
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
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.secondary} 100%)`
                    }}
                  ></div>
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-6 min-h-[300px]">
                      <div className="relative sm:w-1/2 overflow-hidden">
                        <img
                          src={getImageUrl(resources[0].thumbnail)}
                          alt={resources[0].title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          onError={(e) => {
                            if (!imageErrors[resources[0].id]) {
                              console.error(`Failed to load resource image: ${getImageUrl(resources[0].thumbnail)}`);
                              e.target.src = '/assets/placeholder.jpg';
                              setImageErrors((prev) => ({ ...prev, [resources[0].id]: resources[0].thumbnail }));
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center">
                        <span
                          className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 w-fit"
                          style={{
                            color: colors.secondary,
                            backgroundColor: `${colors.secondary}20`
                          }}
                        >
                          Featured
                        </span>
                        <span className="text-slate-500 text-sm mb-3 font-medium">
                          {new Date(resources[0].publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight line-clamp-2" style={{ color: colors.text }}>
                          {resources[0].title}
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                          {resources[0].description}
                        </p>
                        <button
                          onClick={() => openModal(resources[0])}
                          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                            boxShadow: `0 0 0 0 ${colors.primary}25`
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.boxShadow = `0 25px 50px -12px ${colors.primary}25`;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.boxShadow = `0 0 0 0 ${colors.primary}25`;
                          }}
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
                  <article
                    key={resource.id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={getImageUrl(resource.thumbnail)}
                        alt={resource.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          if (!imageErrors[resource.id]) {
                            console.error(`Failed to load resource image: ${getImageUrl(resource.thumbnail)}`);
                            e.target.src = '/assets/placeholder.jpg';
                            setImageErrors((prev) => ({ ...prev, [resource.id]: resource.thumbnail }));
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                          Resource {index + 2}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col min-h-[250px]">
                      <div className="mb-3">
                        <span className="text-slate-500 text-sm font-medium">
                          {new Date(resource.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors" style={{ color: colors.text }}>
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {resource.description}
                      </p>
                      <button
                        onClick={() => openModal(resource)}
                        className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
                          boxShadow: `0 0 0 0 ${colors.primary}25`
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.boxShadow = `0 10px 25px -5px ${colors.primary}25`;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.boxShadow = `0 0 0 0 ${colors.primary}25`;
                        }}
                        aria-label={`View ${resource.title}`}
                      >
                        View More
                        <svg className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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

      {selectedResource && <Modal resource={selectedResource} onClose={closeModal} />}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              background: `linear-gradient(225deg, ${colors.accent} 0%, ${colors.secondary} 100%)`
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              background: `linear-gradient(45deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
            }}
          ></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: colors.text }}>
            Join the <span
              className="block bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >Movement</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Subscribe for updates on new resources, survivor stories, and ways to support our mission in protecting children and empowering communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/get-involved"
              className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(to right, ${colors.secondary}, ${colors.accent})`,
                boxShadow: `0 0 0 0 ${colors.secondary}25`
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = `0 25px 50px -12px ${colors.secondary}25`;
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = `0 0 0 0 ${colors.secondary}25`;
              }}
            >
              <span className="relative z-10">Get Involved Now</span>
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, ${colors.secondaryDark}, ${colors.secondary})` }}
              ></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resources;