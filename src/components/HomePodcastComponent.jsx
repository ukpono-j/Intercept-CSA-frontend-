import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Play, Download, Clock, Calendar, Loader, Pause, Volume2, VolumeX } from 'lucide-react';
import axios from 'axios';
import PodcastThumbnail from '../assets/For-hero.png';
import "./HomePodcastComponent.css";

const STATIC_BASE_URL = import.meta.env.VITE_STATIC_BASE_URL || 'https://intercept-csa-backend.onrender.com';
const API_URL = import.meta.env.VITE_API_URL || 'https://intercept-csa-backend.onrender.com/api';

const brandColors = {
  primary: '#374050',
  secondaryTeal: '#2A8E9D',
  secondaryYellow: '#FFC938',
  accent: '#FF5245',
  white: '#FFFFFF',
};

const HomePodcastComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [podcast, setPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchLatestPodcast = async (retries = 3, delay = 1000) => {
      setIsLoading(true);
      setError(null);

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          console.log(`Fetching latest podcast, attempt ${attempt}`);

          const timestamp = new Date().getTime();
          const response = await axios.get(`${API_URL}/podcast?status=published&_t=${timestamp}`, {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 15000,
          });

          console.log('API Response:', response.data);

          let podcasts = [];
          if (Array.isArray(response.data)) {
            podcasts = response.data;
          } else if (response.data && Array.isArray(response.data.podcasts)) {
            podcasts = response.data.podcasts;
          } else if (response.data && Array.isArray(response.data.data)) {
            podcasts = response.data.data;
          }

          if (podcasts.length > 0) {
            const sortedPodcasts = podcasts.sort((a, b) => 
              new Date(b.createdAt || b.publishDate) - new Date(a.createdAt || a.publishDate)
            );
            setPodcast(sortedPodcasts[0]);
            console.log('Latest podcast:', sortedPodcasts[0]);
          } else {
            setError('No podcasts available at the moment.');
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

          setError('Unable to load the latest podcast. Please try again later.');
        }
      }
      setIsLoading(false);
    };

    fetchLatestPodcast();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return PodcastThumbnail;

    try {
      if (image.startsWith('http')) {
        return image;
      }

      const baseUrl = STATIC_BASE_URL.replace(/\/+$/, '');
      const cleanPath = image.replace(/^\/+/, '');
      return `${baseUrl}/${cleanPath}`;
    } catch (error) {
      console.error('Error constructing image URL:', error);
      return PodcastThumbnail;
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
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown Date';
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (duration) => {
    if (typeof duration === 'string') {
      return `${duration} minutes`;
    }
    
    if (typeof duration === 'number') {
      const minutes = Math.floor(duration / 60);
      const remainingSeconds = duration % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} minutes`;
    }
    
    return 'Duration unavailable';
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const newTime = (clickPosition / progressBarWidth) * duration;
    
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const getCategoryTags = (category) => {
    const categoryMap = {
      'advocacy': ['Advocacy', 'Child Safety', 'Community'],
      'survivor-stories': ['Survivor Stories', 'Support', 'Healing'],
      'prevention': ['Prevention', 'Education', 'Safety'],
      'education': ['Education', 'Parenting', 'Child Safety'],
      'community': ['Community', 'Support', 'Advocacy']
    };
    return categoryMap[category] || ['Child Safety', 'Parenting', 'Education'];
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white shadow-lg">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader className="w-12 h-12 mx-auto mb-4 animate-spin" style={{ color: brandColors.secondaryTeal }} />
              <p className="text-lg font-medium" style={{ color: brandColors.primary }}>
                Loading latest episode...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !podcast) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white shadow-lg">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: '#FFE4E1' }}>
              <Play className="w-8 h-8" style={{ color: brandColors.accent }} />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: brandColors.primary }}>
              {error || 'No Episodes Available'}
            </h3>
            <p className="text-lg" style={{ color: brandColors.primary, opacity: 0.7 }}>
              Check back soon for new episodes!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const tags = getCategoryTags(podcast.category);
  const audioUrl = getAudioUrl(podcast.audioUrl);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white shadow-lg">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header with accent */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ backgroundColor: brandColors.accent }}></div>
            <span className="text-lg font-medium uppercase tracking-wide" style={{ color: brandColors.primary }}>
              Latest Episode
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Podcast Thumbnail */}
          <div
            className="relative group cursor-pointer flex-shrink-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={togglePlayPause}
          >
            <div className="relative overflow-hidden rounded-tl-2xl rounded-bl-2xl shadow-lg">
              <img
                src={getImageUrl(podcast.image)}
                alt={podcast.title}
                className="w-64 h-64 md:w-80 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { e.target.src = PodcastThumbnail; }}
              />
              {/* Play overlay */}
              <div
                className={`absolute inset-0 bg-slate-900/60 flex items-center justify-center transition-opacity duration-300 ${
                  isHovered || isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110"
                  style={{ backgroundColor: brandColors.secondaryTeal }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" fill="currentColor" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  )}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div
              className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold shadow-lg"
              style={{ backgroundColor: brandColors.secondaryYellow, color: brandColors.primary }}
            >
              NEW
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6">
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                style={{ color: brandColors.primary }}
              >
                {podcast.title}
              </h1>
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-6 text-sm mb-4" style={{ color: brandColors.primary }}>
                {podcast.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" style={{ color: brandColors.secondaryTeal }} />
                    <span className="font-medium">{formatDuration(podcast.duration)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" style={{ color: brandColors.secondaryTeal }} />
                  <span>{formatDate(podcast.createdAt || podcast.publishDate)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg leading-relaxed" style={{ color: brandColors.primary }}>
                {podcast.excerpt || podcast.description}
              </p>

              {/* Audio Player */}
              {audioUrl && (
                <div className="p-4 rounded-2xl shadow-lg" style={{ backgroundColor: brandColors.primary }}>
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                  />

                  {/* Waveform Visualization */}
                  <div className="flex items-center justify-center gap-1 h-12 mb-3 overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                      <div
                        key={i}
                        className={`waveform-bar rounded-full transition-all duration-150 flex-shrink-0 ${
                          isPlaying ? 'playing' : ''
                        }`}
                        style={{
                          width: '3px',
                          minWidth: '3px',
                          maxWidth: '3px',
                          height: `${20 + Math.random() * 60}%`,
                          backgroundColor: brandColors.secondaryYellow,
                          animationDelay: `${i * 0.05}s`,
                          opacity: progress > (i / 50) * 100 ? 1 : 0.3
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div
                    className="relative h-1.5 bg-white/20 rounded-full cursor-pointer mb-3 group"
                    onClick={handleSeek}
                  >
                    <div
                      className="absolute h-1.5 rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: brandColors.secondaryYellow
                      }}
                    ></div>
                    <div
                      className="absolute w-3 h-3 rounded-full shadow-lg transform -translate-y-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        left: `${progress}%`,
                        backgroundColor: brandColors.secondaryYellow,
                        marginLeft: '-6px'
                      }}
                    ></div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlayPause}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                        style={{ backgroundColor: brandColors.secondaryTeal }}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 text-white" fill="currentColor" />
                        ) : (
                          <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                        )}
                      </button>

                      {/* Time Display */}
                      <div className="text-white text-xs font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="text-white hover:opacity-80 transition-opacity"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${brandColors.secondaryYellow} 0%, ${brandColors.secondaryYellow} ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/podcast">
                  <button
                    className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{ backgroundColor: brandColors.secondaryTeal, color: brandColors.white }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#277d8a')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = brandColors.secondaryTeal)}
                  >
                    View All Episodes
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
                {podcast.transcriptUrl && (
                  <a href={podcast.transcriptUrl} download>
                    <button
                      className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      style={{ backgroundColor: brandColors.secondaryYellow, color: brandColors.white }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#e6b032')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = brandColors.secondaryYellow)}
                    >
                      <Download className="w-4 h-4" />
                      Download Transcript
                    </button>
                  </a>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: index === 0 ? '#E6F0FA' : index === 1 ? '#FFF7ED' : '#FFE4E1',
                      color: index === 0 ? brandColors.secondaryTeal : index === 1 ? brandColors.secondaryYellow : brandColors.accent
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .waveform-bar {
          transform-origin: center;
        }

        .waveform-bar.playing {
          animation: wave 0.8s ease-in-out infinite alternate;
        }

        @keyframes wave {
          0% {
            transform: scaleY(0.5);
          }
          100% {
            transform: scaleY(1);
          }
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${brandColors.secondaryYellow};
          cursor: pointer;
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${brandColors.secondaryYellow};
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  );
};

export default HomePodcastComponent;