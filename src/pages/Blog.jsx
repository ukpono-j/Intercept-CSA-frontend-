import { useState, useEffect } from 'react';
import axios from 'axios';

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
          setPosts(response.data);
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
              setPosts(retryResponse.data);
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

  const Modal = ({ post, onClose }) => {
    if (!post) return null;

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
            {post.image && (
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={getImageUrl(post.image)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (!imageErrors[post._id]) {
                      e.target.src = '/assets/placeholder.jpg';
                      setImageErrors((prev) => ({ ...prev, [post._id]: post.image }));
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
              
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <div className="prose prose-slate max-w-none text-lg leading-relaxed">
                {post.content.split('\n').map((paragraph, index) => (
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
    <div className="text-center py-20">
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
      <p className="text-xl text-slate-600 mt-6 font-medium">Loading exceptional content...</p>
    </div>
  );

  const ErrorDisplay = () => (
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
          background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`
        }}
      >
        Try Again
      </button>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="text-xl text-slate-600 font-medium">No blog posts available yet.</p>
      <p className="text-slate-500 mt-2">Check back soon for inspiring content.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
          <div
            className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"
            style={{ background: `linear-gradient(45deg, ${colors.accent} 0%, ${colors.primary} 100%)` }}
          ></div>
        </div>
        
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-28 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Blog & <span
                className="block bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primaryLight} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >Resources</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light">
              Discover powerful articles, survivor stories, and advocacy tools dedicated to preventing and addressing child sexual abuse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`
                }}
              >
                <span className="relative z-10">Get Involved</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#articles" className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                Explore Articles
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="articles" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay />
        ) : posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Featured Article */}
            {posts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center" style={{ color: colors.text }}>
                  Featured Article
                </h2>
                <div className="relative group max-w-4xl mx-auto">
                  <div
                    className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`
                    }}
                  ></div>
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-6 min-h-[300px]">
                      <div className="relative sm:w-1/2 overflow-hidden">
                        <img
                          src={getImageUrl(posts[0].image)}
                          alt={posts[0].title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          onError={(e) => {
                            if (!imageErrors[posts[0]._id]) {
                              e.target.src = '/assets/placeholder.jpg';
                              setImageErrors((prev) => ({ ...prev, [posts[0]._id]: posts[0].image }));
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center">
                        <span
                          className="inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 w-fit text-white"
                          style={{ backgroundColor: colors.accent }}
                        >
                          Featured
                        </span>
                        <span className="text-slate-500 text-sm mb-3 font-medium">
                          {new Date(posts[0].createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight line-clamp-2" style={{ color: colors.text }}>
                          {posts[0].title}
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                          {posts[0].excerpt}
                        </p>
                        <button
                          onClick={() => setSelectedPost(posts[0])}
                          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                          }}
                        >
                          Read Full Article
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

            {/* Articles Grid */}
            <section>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: colors.text }}>
                  Latest Articles
                </h2>
                <div className="hidden sm:flex items-center space-x-2 text-slate-500">
                  <span className="text-sm font-medium">{posts.length - 1} Articles</span>
                  <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                  <span className="text-sm">Updated regularly</span>
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1).map((post, index) => (
                  <article
                    key={post._id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          if (!imageErrors[post._id]) {
                            e.target.src = '/assets/placeholder.jpg';
                            setImageErrors((prev) => ({ ...prev, [post._id]: post.image }));
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 text-xs font-bold text-white bg-black/20 backdrop-blur-sm rounded-full border border-white/20">
                          Article {index + 2}
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
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <button
                        onClick={() => setSelectedPost(post)}
                        className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                        }}
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
          </>
        )}
      </main>

      {/* Modal */}
      {selectedPost && <Modal post={selectedPost} onClose={() => setSelectedPost(null)} />}

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              background: `linear-gradient(225deg, ${colors.accent} 0%, ${colors.primary} 100%)`
            }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl"
            style={{
              background: `linear-gradient(45deg, ${colors.primary} 0%, ${colors.accent} 100%)`
            }}
          ></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: colors.text }}>
            Be Part of the <span
              className="block bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >Solution</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Subscribe for updates on new articles, resources, and ways to support our mission in protecting children and empowering communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/contact" className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`
              }}
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

export default Blog;