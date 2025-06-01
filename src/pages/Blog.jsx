import { useState, useEffect } from 'react';
import axios from 'axios';

const STATIC_BASE_URL = import.meta.env.VITE_STATIC_BASE_URL || 'https://intercept-csa-backend.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Fetching blogs from:', `${API_URL}/blogs?status=published`);
        const response = await axios.get(`${API_URL}/blogs?status=published`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Fetched posts:', response.data.map(p => ({ id: p._id, image: p.image })));
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          url: `${API_URL}/blogs?status=published`,
        });
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          try {
            const retryResponse = await axios.get(`${API_URL}/blogs?status=published`, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log('Retry posts:', retryResponse.data.map(p => ({ id: p._id, image: p.image })));
            setPosts(retryResponse.data);
          } catch (retryErr) {
            setError('Failed to load blogs. Our team is working on it.');
            console.error('Retry error:', retryErr);
          }
        } else {
          setError('Failed to load blogs. Our team is working on it.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const getImageUrl = (image) => {
    if (!image) {
      console.warn('No image provided for post, using placeholder');
      return '/assets/placeholder.jpg';
    }
    const cleanPath = image.replace(/^\/+|\/+$/g, '');
    const url = `${STATIC_BASE_URL}/${cleanPath}`;
    console.log('Constructed image URL:', url, 'Original image path:', image);
    return url;
  };

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
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
          <div className="relative">
            {post.image && (
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                <img
                  src={getImageUrl(post.image)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (!imageErrors[post._id]) {
                      console.error(`Failed to load modal image: ${getImageUrl(post.image)}`);
                      e.target.src = '/assets/placeholder.jpg';
                      setImageErrors((prev) => ({ ...prev, [post._id]: post.image }));
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
            )}
            <div className="p-6 sm:p-8">
              <span className="inline-block px-3 py-1 text-sm font-medium text-orange-600 bg-orange-100 rounded-full mb-4">
                {post.category || 'Featured'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">
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

  return (
    <div className="min-h-screen bg-white">
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-tr from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-28 lg:py-32">
          <div className="text-center">
            <div className="mb-6 mt-10">
              {/* <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm border border-white/20">
                Knowledge Hub
              </span> */}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Blog & <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10 font-light">
              Discover powerful articles, survivor stories, and advocacy tools dedicated to preventing and addressing child sexual abuse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/contact" className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10">Get Involved</span>
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

      <main id="articles" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16 md:py-24">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-yellow-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-orange-500 rounded-full animate-spin animate-reverse"></div>
            </div>
            <p className="text-xl text-slate-600 mt-6 font-medium">Loading exceptional content...</p>
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
              className="mt-6 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-xl text-slate-600 font-medium">No blog posts available yet.</p>
            <p className="text-slate-500 mt-2">Check back soon for inspiring content.</p>
          </div>
        ) : (
          <>
            {posts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
                  Featured Article
                </h2>
                <div className="relative group max-w-4xl mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
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
                              console.error(`Failed to load blog image: ${getImageUrl(posts[0].image)}`);
                              e.target.src = '/assets/placeholder.jpg';
                              setImageErrors((prev) => ({ ...prev, [posts[0]._id]: posts[0].image }));
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      <div className="p-6 sm:p-8 sm:w-1/2 flex flex-col justify-center">
                        <span className="inline-block px-3 py-1 text-sm font-medium text-orange-600 bg-orange-100 rounded-full mb-4 w-fit">
                          Featured
                        </span>
                        <span className="text-slate-500 text-sm mb-3 font-medium">
                          {new Date(posts[0].createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight line-clamp-2">
                          {posts[0].title}
                        </h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                          {posts[0].excerpt}
                        </p>
                        <button
                          onClick={() => openModal(posts[0])}
                          className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl hover:shadow-xl hover:shadow-slate-900/25 transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn"
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

            <section>
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
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
                            console.error(`Failed to load blog image: ${getImageUrl(post.image)}`);
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
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <button
                        onClick={() => openModal(post)}
                        className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg hover:shadow-lg hover:shadow-slate-900/25 transition-all duration-300 transform hover:-translate-y-0.5 w-fit group/btn mt-auto"
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

      {selectedPost && <Modal post={selectedPost} onClose={closeModal} />}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-20 md:py-24 text-center">
          <div className="mb-6">
            {/* <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/60 text-slate-700 backdrop-blur-sm border border-slate-200">
              Join Our Community
            </span> */}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Be Part of the <span className="block bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Solution</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Subscribe for updates on new articles, resources, and ways to support our mission in protecting children and empowering communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/contact" className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10">Subscribe Now</span>
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            {/* <a href="/resources" className="inline-flex items-center px-8 py-4 text-lg font-semibold text-slate-700 bg-white rounded-full border-2 border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
              View Resources
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;