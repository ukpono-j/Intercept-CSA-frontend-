import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Play, Download, Clock, Calendar } from 'lucide-react';
import PodcastThumbnail from '../assets/For-hero.png';
import "./HomePodcastComponent.css";


const brandColors = {
  primary: '#374050', // Deep navy-gray
  secondaryTeal: '#2A8E9D', // Teal
  secondaryYellow: '#FFC938', // Golden yellow
  accent: '#FF5245', // Coral-red
  white: '#FFFFFF',
};

const HomePodcastComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [podcast, setPodcast] = useState({
    title: 'Foundations of Child Safety',
    duration: 2730, // Duration in seconds (45:30)
    publishDate: 'Dec 15, 2024',
    description:
      'Explore the essential foundations every parent and caregiver needs to create a safe, nurturing environment for children. This episode covers practical strategies, expert insights, and evidence-based approaches to child protection in today’s world.',
    thumbnail: PodcastThumbnail,
    transcriptUrl: '/transcripts/foundations-of-child-safety.pdf',
  });

  // Convert duration from seconds to mm:ss format
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} minutes`;
  };

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
          >
            <div className="relative overflow-hidden rounded-tl-2xl rounded-bl-2xl shadow-lg">
              <img
                src={podcast.thumbnail}
                alt={podcast.title}
                className="w-64 h-64 md:w-80 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Play overlay */}
              <div
                className={`absolute inset-0 bg-slate-900/60 flex items-center justify-center transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110"
                  style={{ backgroundColor: brandColors.secondaryTeal }}
                >
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
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
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" style={{ color: brandColors.secondaryTeal }} />
                  <span className="font-medium">{formatDuration(podcast.duration)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" style={{ color: brandColors.secondaryTeal }} />
                  <span>{podcast.publishDate}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg leading-relaxed" style={{ color: brandColors.primary }}>
                {podcast.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  style={{ backgroundColor: brandColors.secondaryTeal, color: brandColors.white }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#277d8a')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = brandColors.secondaryTeal)}
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  Listen Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <Link to={podcast.transcriptUrl}>
                  <button
                    className="group flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    style={{ backgroundColor: brandColors.secondaryYellow, color: brandColors.white }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#e6b032')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = brandColors.secondaryYellow)}
                  >
                    <Download className="w-4 h-4" />
                    Download Transcript
                  </button>
                </Link>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: '#E6F0FA', color: brandColors.secondaryTeal }}
                >
                  Child Safety
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: '#FFF7ED', color: brandColors.secondaryYellow }}
                >
                  Parenting
                </span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: '#FFE4E1', color: brandColors.accent }}
                >
                  Education
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePodcastComponent;