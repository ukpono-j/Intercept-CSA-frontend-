import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import "./Blog.css"

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

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchBlogs = async (retries = 3, delay = 1000) => {
      setIsLoading(true);
      setError(null);
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await axios.get(`${API_URL}/blogs?status=published`, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000,
          });
          console.log('API Response:', response.data); // Debug log
          const data = Array.isArray(response.data) ? response.data : [];
          setPosts(data);
          setIsLoading(false);
          return;
        } catch (err) {
          console.error(`Attempt ${attempt} failed:`, err);
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            try {
              const retryResponse = await axios.get(`${API_URL}/blogs?status=published`, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000,
              });
              console.log('Retry Response:', retryResponse.data); // Debug log
              const retryData = Array.isArray(retryResponse.data) ? retryResponse.data : [];
              setPosts(retryData);
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
          setError('Unable to load blogs right now. Please try again later.');
        }
      }
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  const getImageUrl = image => image?.startsWith('http')
    ? image.replace(/^h+ttps?:\/\//, 'https://')
    : image ? `${STATIC_BASE_URL.replace(/\/+$/, '')}/${image.replace(/^\/+/, '')}`
      : '/assets/placeholder.jpg';

  const Modal = ({ post, onClose }) => {
    if (!post) return null;

    const markdownContent = `
# ${post.title}

${post.excerpt ? `> ${post.excerpt}\n` : ''}

## About This Story

This story explores ${post.category || 'key insights'} related to child protection and community empowerment. Written by ${post.author?.name || 'an expert contributor'}, it offers perspectives to inspire action and awareness.

## Key Insights

${post.content
        .split('\n')
        .filter(para => para.trim())
        .map(para => `- ${para}`)
        .join('\n')}

## Take Action

- **Reflect**: Consider how this story applies to your community or organization.
- **Share**: Spread awareness by sharing this story with others.
- **Get Involved**: Visit our [Get Involved](/contact) page to support our mission.

*Published on ${new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })} | Tags: ${post.tags?.join(', ') || 'None'}*
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
                src={getImageUrl(post.image)}
                srcSet={`${getImageUrl(post.image)}?w=320 320w, ${getImageUrl(post.image)}?w=640 640w`}
                sizes="(max-width: 640px) 320px, 640px"
                alt={post.title}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                loading="lazy"
                onError={e => {
                  if (!imageErrors[post._id]) {
                    e.target.src = '/assets/placeholder.jpg';
                    setImageErrors(prev => ({ ...prev, [post._id]: post.image || '/assets/placeholder.jpg' }));
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
                {post.category || 'Featured'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
                {post.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                <span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                <span>By {post.author?.name || 'Unknown'}</span>
                {post.tags?.length > 0 && (
                  <>
                    <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                    <span>{post.tags.join(', ')}</span>
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
      <p className="text-lg text-slate-600 font-medium">No blog posts available yet.</p>
      <p className="text-slate-500 mt-2">Check back soon for inspiring content.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white blog" id="hero-section">
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
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-20">
          <div className="text-center pt-14">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Letters, Lessons & <span
                className="block bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >Stories</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 font-light">
              Discover powerful reflections, survivor stories, cultural insights, and community lessons dedicated to preventing and addressing child sexual abuse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                style={{ backgroundColor: colors.accent }}
              >
                <span className="relative z-10">Get Involved</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={isLoading ? '#' : '#articles'}
                aria-label="Scroll to latest stories section"
                className={`inline-flex items-center px-6 py-3 text-base font-semibold text-white border-2 border-white/30 rounded-full transition-all duration-300 backdrop-blur-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/50'}`}
                onClick={(e) => {
                  if (isLoading) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  const articlesSection = document.getElementById('articles');
                  if (articlesSection) {
                    articlesSection.scrollIntoView({ behavior: 'smooth' });
                    articlesSection.setAttribute('tabindex', '-1');
                    articlesSection.focus();
                  }
                }}
              >
                Explore Stories
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="articles" tabIndex="-1" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay />
        ) : !Array.isArray(posts) || posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {posts.length > 0 && Array.isArray(posts) && (
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center" style={{ color: colors.text }}>
                  Featured Story
                </h2>
                <div className="relative group max-w-4xl mx-auto">
                  <div
                    className="absolute -inset-1 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-300"
                    style={{ background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
                  ></div>
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-6 min-h-[300px]">
                      <div className="relative sm:w-1/2 overflow-hidden">
                        {posts[0].image ? (
                          <img
                            src={getImageUrl(posts[0].image)}
                            srcSet={`${getImageUrl(posts[0].image)}?w=320 320w, ${getImageUrl(posts[0].image)}?w=640 640w`}
                            sizes="(max-width: 640px) 320px, 640px"
                            alt={posts[0].title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              if (!imageErrors[posts[0]._id]) {
                                e.target.src = '/assets/placeholder.jpg';
                                setImageErrors((prev) => ({ ...prev, [posts[0]._id]: posts[0].image }));
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <blockquote className="text-center px-6 max-w-md">
                              <p className="text-base italic text-slate-600 line-clamp-3">"{posts[0].excerpt}"</p>
                            </blockquote>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center">
                        <span
                          className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 w-fit text-white"
                          style={{ backgroundColor: colors.accent }}
                        >
                          {posts[0].category || 'Featured'}
                        </span>
                        <span className="text-slate-500 text-sm mb-3 font-medium">
                          {new Date(posts[0].createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold mb-4 leading-tight line-clamp-2" style={{ color: colors.text }}>
                          {posts[0].title}
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-2">
                          {posts[0].excerpt}
                        </p>
                        <button
                          onClick={() => setSelectedPost(posts[0])}
                          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
                          style={{ backgroundColor: colors.accent }}
                        >
                          Read Full Story
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
                  Latest Stories
                </h2>
                <div className="hidden sm:flex items-center space-x-2 text-slate-500">
                  <span className="text-sm font-medium">{posts.length - 1} Stories</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="text-sm">Updated regularly</span>
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {Array.isArray(posts) && posts.length > 1 ? (
                  posts.slice(1).map((post, index) => (
                    <article
                      key={post._id}
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
                    >
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        {post.image ? (
                          <img
                            src={getImageUrl(post.image)}
                            srcSet={`${getImageUrl(post.image)}?w=320 320w, ${getImageUrl(post.image)}?w=640 640w`}
                            sizes="(max-width: 640px) 320px, 640px"
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
                            {post.category || `Story ${index + 2}`}
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
                  ))
                ) : (
                  <p>No additional stories available.</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {selectedPost && <Modal post={selectedPost} onClose={() => setSelectedPost(null)} />}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl"
            style={{ background: `linear-gradient(225deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
          ></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight text-center" style={{ color: colors.text }}>
            Be Part of the <span
              className="block bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >Solution</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 text-center">
            Subscribe for updates on new stories, reflections, and ways to support our mission in protecting children and empowering communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="group relative inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ backgroundColor: colors.accent }}
            >
              <span className="relative z-10">Subscribe Now</span>
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;