import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { newsStoriesData } from '../data';
import { NewsStory } from '../types';
import { 
  FileText, Eye, Calendar, User, ArrowRight, X, Heart, Sparkles, 
  Share2, Twitter, Linkedin, Facebook, Link, Check, Search, 
  Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Clock, Tag,
  ArrowUpRight, RotateCcw, Filter, MessageSquare
} from 'lucide-react';

interface NewsStoriesProps {
  onNavigate?: (tab: string) => void;
}

export default function NewsStories({ onNavigate }: NewsStoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'oldest'>('latest');
  const [activeStory, setActiveStory] = useState<NewsStory | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  
  // Bookmarks & Likes stored in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ecostawi_bookmarked_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [likedMap, setLikedMap] = useState<Record<string, number>>({});
  const [userLikedIds, setUserLikedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ecostawi_liked_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reader modal scroll progress
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const readerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('ecostawi_bookmarked_stories', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Unable to save bookmarks to localStorage', e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('ecostawi_liked_stories', JSON.stringify(userLikedIds));
    } catch (e) {
      console.warn('Unable to save likes to localStorage', e);
    }
  }, [userLikedIds]);

  const toggleBookmark = (e: React.MouseEvent, storyId: string) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(storyId) ? prev.filter(id => id !== storyId) : [...prev, storyId]
    );
  };

  const toggleLike = (e: React.MouseEvent, storyId: string) => {
    e.stopPropagation();
    const isLiked = userLikedIds.includes(storyId);
    if (isLiked) {
      setUserLikedIds(prev => prev.filter(id => id !== storyId));
      setLikedMap(prev => ({ ...prev, [storyId]: (prev[storyId] || 0) - 1 }));
    } else {
      setUserLikedIds(prev => [...prev, storyId]);
      setLikedMap(prev => ({ ...prev, [storyId]: (prev[storyId] || 0) + 1 }));
    }
  };

  const getStoryLikes = (story: NewsStory) => {
    const baseLikes = Math.floor(story.reads * 0.35);
    const extra = likedMap[story.id] || 0;
    return baseLikes + extra;
  };

  const handleCopyLink = (storyId: string) => {
    const shareUrl = `${window.location.origin}/#news-story-${storyId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(storyId);
      setTimeout(() => setCopiedId(null), 2200);
    });
  };

  const getShareLinks = (story: NewsStory) => {
    const shareUrl = `${window.location.origin}/#news-story-${story.id}`;
    const text = `Read "${story.title}" on EcoStawi Journal`;
    return {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
  };

  // Handle reader scroll progress
  const handleReaderScroll = () => {
    if (readerContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = readerContentRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        setScrollProgress((scrollTop / totalScroll) * 100);
      }
    }
  };

  const categories = ['All', 'Field Stories', 'Research', 'Climate Insights', 'Partner Stories', 'Success Stories', 'Saved Articles'];

  // Filtering logic
  const filteredStories = newsStoriesData.filter((story) => {
    // Category match
    if (selectedCategory === 'Saved Articles') {
      if (!bookmarkedIds.includes(story.id)) return false;
    } else if (selectedCategory !== 'All' && story.category !== selectedCategory) {
      return false;
    }

    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(q);
      const matchSummary = story.summary.toLowerCase().includes(q);
      const matchAuthor = story.author.toLowerCase().includes(q);
      const matchCategory = story.category.toLowerCase().includes(q);
      const matchTags = story.tags ? story.tags.some(t => t.toLowerCase().includes(q)) : false;
      return matchTitle || matchSummary || matchAuthor || matchCategory || matchTags;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.reads - a.reads;
    if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
    // Default 'latest'
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Category counts map
  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return newsStoriesData.length;
    if (cat === 'Saved Articles') return bookmarkedIds.length;
    return newsStoriesData.filter(s => s.category === cat).length;
  };

  // Find active story index & prev/next stories for reader navigation
  const currentStoryIndex = activeStory ? newsStoriesData.findIndex(s => s.id === activeStory.id) : -1;
  const prevStory = currentStoryIndex > 0 ? newsStoriesData[currentStoryIndex - 1] : null;
  const nextStory = currentStoryIndex >= 0 && currentStoryIndex < newsStoriesData.length - 1 ? newsStoriesData[currentStoryIndex + 1] : null;

  // Related stories (same category or next available, excluding current active story)
  const relatedStories = activeStory 
    ? newsStoriesData
        .filter(s => s.id !== activeStory.id)
        .slice(0, 2)
    : [];

  return (
    <section id="news-stories-section" className="py-16 sm:py-24 bg-earth-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-forest-100 text-forest-850 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase mb-4 border border-forest-200">
            <Sparkles className="w-3.5 h-3.5 text-forest-700" />
            <span>EcoStawi Environmental Journal</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-forest-900 tracking-tight">
            Field News & Verified Research
          </h2>
          <p className="text-earth-600 mt-4 text-base sm:text-lg leading-relaxed font-light">
            Read transparent field updates, peer-reviewed telemetry insights, coastal restoration logs, and ecological success stories directly from our community hubs.
          </p>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Search, Sort & Navigation Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-earth-200 shadow-sm mb-12 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-grow max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-earth-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, author, tag, or keywords..."
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-earth-200 bg-earth-50/60 text-sm font-medium text-forest-900 placeholder:text-earth-400 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-earth-400 hover:text-earth-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Quick Counter */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
              <span className="text-xs font-mono text-earth-500 font-semibold hidden sm:inline">
                {filteredStories.length} {filteredStories.length === 1 ? 'Article' : 'Articles'}
              </span>

              <div className="flex items-center space-x-2 bg-earth-50 border border-earth-200 rounded-xl px-3 py-1.5">
                <Filter className="w-3.5 h-3.5 text-earth-500" />
                <span className="text-xs font-mono text-earth-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-forest-900 focus:outline-none cursor-pointer"
                >
                  <option value="latest">Latest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div id="news-filters" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-earth-150">
            {categories.map((category) => {
              const count = getCategoryCount(category);
              const isSavedCat = category === 'Saved Articles';
              return (
                <button
                  key={category}
                  id={`news-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
                    selectedCategory === category
                      ? isSavedCat 
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-forest-900 text-white shadow-sm'
                      : 'text-earth-600 bg-earth-50 hover:text-forest-800 hover:bg-earth-100 border border-earth-200/60'
                  }`}
                >
                  {isSavedCat ? (
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  ) : null}
                  <span>{category}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    selectedCategory === category
                      ? 'bg-white/20 text-white'
                      : 'bg-earth-200/80 text-earth-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Featured Story Banner (Shown when viewing 'All' category and no active search filter) */}
        {selectedCategory === 'All' && !searchQuery && newsStoriesData.length > 0 && (
          <div id="featured-story-banner" className="mb-14 bg-white rounded-3xl border border-earth-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 relative h-64 sm:h-96 lg:h-auto min-h-[340px] group overflow-hidden">
              <img
                src={newsStoriesData[0].image}
                alt={newsStoriesData[0].title}
                className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="bg-emerald-500 text-forest-950 font-mono text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-md">
                  Featured Story
                </span>
                {newsStoriesData[0].readTime && (
                  <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-1 rounded-full flex items-center space-x-1 border border-white/20">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{newsStoriesData[0].readTime}</span>
                  </span>
                )}
              </div>

              {/* Bookmark button on image */}
              <button
                onClick={(e) => toggleBookmark(e, newsStoriesData[0].id)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-forest-900 p-2 rounded-full shadow-md cursor-pointer transition-transform active:scale-95"
                title={bookmarkedIds.includes(newsStoriesData[0].id) ? "Remove Bookmark" : "Save Article"}
              >
                {bookmarkedIds.includes(newsStoriesData[0].id) ? (
                  <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
                ) : (
                  <Bookmark className="w-4 h-4 text-earth-600" />
                )}
              </button>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[11px] font-mono font-bold tracking-wider text-forest-700 uppercase">
                  <span>{newsStoriesData[0].category}</span>
                  <span>•</span>
                  <span>{newsStoriesData[0].date}</span>
                </div>
                
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 leading-snug hover:text-forest-700 cursor-pointer transition-colors" onClick={() => setActiveStory(newsStoriesData[0])}>
                  {newsStoriesData[0].title}
                </h3>
                
                <p className="text-earth-600 text-sm leading-relaxed font-light">
                  {newsStoriesData[0].summary}
                </p>

                {/* Tags */}
                {newsStoriesData[0].tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {newsStoriesData[0].tags.map(tag => (
                      <span key={tag} className="inline-flex items-center space-x-1 text-[10px] font-mono text-forest-800 bg-forest-50 border border-forest-100 px-2 py-0.5 rounded-md">
                        <Tag className="w-2.5 h-2.5 text-forest-600" />
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-4 text-xs text-earth-500 font-mono py-1">
                  <span className="flex items-center space-x-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-earth-400" /> 
                    <span>By {newsStoriesData[0].author}</span>
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-earth-150 flex flex-wrap items-center justify-between gap-3">
                <button
                  id="read-featured-btn"
                  onClick={() => setActiveStory(newsStoriesData[0])}
                  className="bg-forest-900 hover:bg-forest-800 text-white font-mono text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center space-x-2 cursor-pointer group"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => toggleLike(e, newsStoriesData[0].id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                      userLikedIds.includes(newsStoriesData[0].id)
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-earth-50 border-earth-200 text-earth-600 hover:bg-earth-100'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${userLikedIds.includes(newsStoriesData[0].id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{getStoryLikes(newsStoriesData[0])}</span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setActiveShareId(activeShareId === newsStoriesData[0].id ? null : newsStoriesData[0].id)}
                      className="p-2 rounded-xl text-earth-500 hover:text-forest-800 bg-earth-50 hover:bg-earth-100 border border-earth-200 transition-all cursor-pointer"
                      title="Share Article"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    {activeShareId === newsStoriesData[0].id && (
                      <div className="absolute bottom-10 right-0 z-20 bg-white border border-earth-200 rounded-2xl shadow-xl p-2 flex items-center space-x-1">
                        <a href={getShareLinks(newsStoriesData[0]).twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-earth-500 hover:text-[#1DA1F2] hover:bg-sky-50 transition-colors" title="Twitter"><Twitter className="w-4 h-4" /></a>
                        <a href={getShareLinks(newsStoriesData[0]).linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-earth-500 hover:text-[#0A66C2] hover:bg-blue-50 transition-colors" title="LinkedIn"><Linkedin className="w-4 h-4" /></a>
                        <a href={getShareLinks(newsStoriesData[0]).facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-earth-500 hover:text-[#1877F2] hover:bg-blue-50 transition-colors" title="Facebook"><Facebook className="w-4 h-4" /></a>
                        <button onClick={() => handleCopyLink(newsStoriesData[0].id)} className="p-2 rounded-lg text-earth-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer" title="Copy Link">
                          {copiedId === newsStoriesData[0].id ? <Check className="w-4 h-4 text-emerald-600" /> : <Link className="w-4 h-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stories Grid */}
        {filteredStories.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-earth-200 max-w-lg mx-auto space-y-4">
            <div className="bg-earth-100 text-earth-500 p-4 rounded-full w-14 h-14 mx-auto flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <h4 className="font-display font-bold text-xl text-forest-900">
              {newsStoriesData.length === 0 ? "Stories Coming Soon" : "No stories found"}
            </h4>
            <p className="text-sm text-earth-500">
              {newsStoriesData.length === 0
                ? "We are currently documenting our field operations, nursery telemetry reports, and climate research. Stories across all categories will be published here soon."
                : selectedCategory === 'Saved Articles' 
                  ? "You haven't bookmarked any articles yet. Click the bookmark icon on any story to save it for later."
                  : `We couldn't find any articles matching "${searchQuery}". Try adjusting your keywords or category filters.`}
            </p>
            {newsStoriesData.length > 0 && (
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="inline-flex items-center space-x-2 bg-forest-900 text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-forest-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredStories
                .filter((story) => !(selectedCategory === 'All' && !searchQuery && newsStoriesData.length > 0 && story.id === newsStoriesData[0]?.id))
                .map((story) => {
                  const isBookmarked = bookmarkedIds.includes(story.id);
                  const isLiked = userLikedIds.includes(story.id);

                  return (
                    <motion.div
                      key={story.id}
                      id={`news-card-${story.id}`}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image banner */}
                        <div className="relative h-52 w-full overflow-hidden cursor-pointer" onClick={() => setActiveStory(story)}>
                          <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                          
                          <div className="absolute top-3 left-3 flex items-center space-x-2">
                            <span className="bg-white/95 backdrop-blur-md text-forest-800 font-mono text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md border border-earth-100 shadow-sm">
                              {story.category}
                            </span>
                          </div>

                          {story.readTime && (
                            <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white font-mono text-[9px] px-2 py-0.5 rounded-md flex items-center space-x-1 border border-white/10">
                              <Clock className="w-2.5 h-2.5 text-emerald-400" />
                              <span>{story.readTime}</span>
                            </span>
                          )}

                          {/* Quick Bookmark Button */}
                          <button
                            onClick={(e) => toggleBookmark(e, story.id)}
                            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-forest-900 p-1.5 rounded-lg shadow-sm cursor-pointer transition-transform active:scale-95"
                            title={isBookmarked ? "Remove Bookmark" : "Save Article"}
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
                            ) : (
                              <Bookmark className="w-4 h-4 text-earth-600" />
                            )}
                          </button>
                        </div>

                        {/* Text Details */}
                        <div className="p-6">
                          <div className="flex items-center justify-between text-[10px] text-earth-400 font-mono mb-2.5">
                            <span>{story.date}</span>
                            <span>By {story.author.split(',')[0]}</span>
                          </div>
                          
                          <h4 
                            onClick={() => setActiveStory(story)}
                            className="font-display font-bold text-lg text-forest-900 leading-snug mb-2.5 hover:text-forest-700 transition-colors line-clamp-2 cursor-pointer"
                          >
                            {story.title}
                          </h4>
                          
                          <p className="text-earth-600 text-xs leading-relaxed line-clamp-3 font-light mb-4">
                            {story.summary}
                          </p>

                          {/* Tags */}
                          {story.tags && (
                            <div className="flex flex-wrap gap-1">
                              {story.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[9px] font-mono text-earth-500 bg-earth-100 px-2 py-0.5 rounded">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="px-6 py-3.5 border-t border-earth-150 bg-earth-50/50 flex justify-between items-center relative">
                        <button
                          id={`read-story-${story.id}`}
                          onClick={() => setActiveStory(story)}
                          className="text-xs font-bold font-mono uppercase tracking-wider text-forest-700 hover:text-forest-900 transition-colors duration-200 flex items-center space-x-1 cursor-pointer py-1 group/btn"
                        >
                          <span>Read Story</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => toggleLike(e, story.id)}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                              isLiked ? 'text-rose-600 bg-rose-50' : 'text-earth-400 hover:text-earth-600'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                            <span>{getStoryLikes(story)}</span>
                          </button>

                          <div className="relative">
                            <button
                              id={`share-trigger-${story.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveShareId(activeShareId === story.id ? null : story.id);
                              }}
                              className="p-1.5 rounded-lg text-earth-400 hover:text-forest-800 hover:bg-earth-100 transition-all cursor-pointer"
                              title="Share story"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            
                            <AnimatePresence>
                              {activeShareId === story.id && (
                                <>
                                  <div className="fixed inset-0 z-10" onClick={() => setActiveShareId(null)} />
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute bottom-10 right-0 z-20 bg-white border border-earth-200 rounded-xl shadow-xl p-1.5 flex items-center space-x-1"
                                  >
                                    <a href={getShareLinks(story).twitter} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-earth-500 hover:text-[#1DA1F2] hover:bg-sky-50 transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
                                    <a href={getShareLinks(story).linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-earth-500 hover:text-[#0A66C2] hover:bg-blue-50 transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
                                    <a href={getShareLinks(story).facebook} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-earth-500 hover:text-[#1877F2] hover:bg-blue-50 transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
                                    <button onClick={() => handleCopyLink(story.id)} className="p-1.5 rounded-lg text-earth-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer">
                                      {copiedId === story.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link className="w-3.5 h-3.5" />}
                                    </button>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        )}

        {/* Interactive Overlay Story Reader Modal */}
        <AnimatePresence>
          {activeStory && (
            <div id="story-reader-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl border border-earth-200 flex flex-col relative"
              >
                {/* Scroll Progress Bar at Modal Top */}
                <div className="w-full h-1 bg-earth-100 shrink-0">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-150" 
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>

                {/* Sticky Header Control Bar */}
                <div className="bg-white/95 backdrop-blur-md px-6 py-3 border-b border-earth-150 flex items-center justify-between z-10 shrink-0">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-forest-800">
                    <span className="bg-forest-100 text-forest-900 px-2.5 py-1 rounded-md uppercase tracking-wider text-[10px]">
                      {activeStory.category}
                    </span>
                    <span className="hidden sm:inline text-earth-400">•</span>
                    <span className="hidden sm:inline text-earth-500 font-light truncate max-w-xs">{activeStory.title}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Bookmark in modal header */}
                    <button
                      onClick={(e) => toggleBookmark(e, activeStory.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-mono font-bold ${
                        bookmarkedIds.includes(activeStory.id)
                          ? 'bg-amber-50 border-amber-200 text-amber-700'
                          : 'bg-earth-50 border-earth-200 text-earth-600 hover:bg-earth-100'
                      }`}
                      title={bookmarkedIds.includes(activeStory.id) ? "Saved in Bookmarks" : "Save Article"}
                    >
                      {bookmarkedIds.includes(activeStory.id) ? (
                        <>
                          <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
                          <span className="hidden sm:inline">Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">Save</span>
                        </>
                      )}
                    </button>

                    {/* Like in modal header */}
                    <button
                      onClick={(e) => toggleLike(e, activeStory.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-mono font-bold ${
                        userLikedIds.includes(activeStory.id)
                          ? 'bg-rose-50 border-rose-200 text-rose-600'
                          : 'bg-earth-50 border-earth-200 text-earth-600 hover:bg-earth-100'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${userLikedIds.includes(activeStory.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{getStoryLikes(activeStory)}</span>
                    </button>

                    {/* Close Modal Button */}
                    <button
                      id="close-reader-btn"
                      onClick={() => setActiveStory(null)}
                      className="bg-earth-100 hover:bg-earth-200 text-forest-900 p-2 rounded-xl border border-earth-200 transition-colors duration-200 cursor-pointer"
                      title="Close Reader"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Article Main Scrollable Container */}
                <div 
                  ref={readerContentRef}
                  onScroll={handleReaderScroll}
                  className="overflow-y-auto flex-grow"
                >
                  {/* Hero Image */}
                  <div className="relative h-64 sm:h-80 w-full">
                    <img
                      src={activeStory.image}
                      alt={activeStory.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                        <span className="bg-emerald-500 text-forest-950 font-extrabold px-3 py-1 rounded-md uppercase tracking-wider text-[10px]">
                          {activeStory.category}
                        </span>
                        <span className="text-emerald-300 font-medium">{activeStory.date}</span>
                        {activeStory.readTime && (
                          <span className="text-earth-300 flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{activeStory.readTime}</span>
                          </span>
                        )}
                        <span className="text-earth-300 flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{activeStory.reads} Reads</span>
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                        {activeStory.title}
                      </h3>
                    </div>
                  </div>

                  {/* Article Content Area */}
                  <div className="p-6 sm:p-10 space-y-8 max-w-3xl mx-auto">
                    
                    {/* Author & Share Bar */}
                    <div className="border-b border-earth-150 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-earth-50/80 p-5 rounded-2xl border">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-forest-900 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm shadow-sm shrink-0">
                          {activeStory.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-mono font-bold text-forest-900">{activeStory.author}</p>
                          <p className="text-[11px] text-earth-500">EcoStawi Field & Telemetry Contributor</p>
                        </div>
                      </div>

                      {/* Share buttons */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-mono font-bold text-earth-500 uppercase tracking-wider">Share:</span>
                        <a href={getShareLinks(activeStory).twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-earth-500 hover:text-[#1DA1F2] hover:bg-white border border-earth-200 transition-all" title="Share on Twitter"><Twitter className="w-4 h-4" /></a>
                        <a href={getShareLinks(activeStory).linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-earth-500 hover:text-[#0A66C2] hover:bg-white border border-earth-200 transition-all" title="Share on LinkedIn"><Linkedin className="w-4 h-4" /></a>
                        <a href={getShareLinks(activeStory).facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-earth-500 hover:text-[#1877F2] hover:bg-white border border-earth-200 transition-all" title="Share on Facebook"><Facebook className="w-4 h-4" /></a>
                        <button onClick={() => handleCopyLink(activeStory.id)} className="p-2 rounded-xl text-earth-500 hover:text-emerald-600 hover:bg-white border border-earth-200 transition-all cursor-pointer" title="Copy Article Link">
                          {copiedId === activeStory.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Link className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Paragraph Content */}
                    <div className="space-y-6 text-earth-700 leading-relaxed text-base font-normal font-sans">
                      {activeStory.content.map((p, idx) => (
                        <p key={idx} className={idx === 0 ? "first-letter:text-4xl first-letter:font-extrabold first-letter:text-forest-900 first-letter:float-left first-letter:mr-2.5 first-letter:leading-none" : ""}>
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Key Tags */}
                    {activeStory.tags && (
                      <div className="pt-4 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-earth-500 uppercase">Tags:</span>
                        {activeStory.tags.map(tag => (
                          <span key={tag} className="text-xs font-mono font-bold text-forest-800 bg-forest-50 border border-forest-100 px-3 py-1 rounded-lg">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Prev / Next Article Navigation Bar */}
                    <div className="pt-8 border-t border-earth-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {prevStory ? (
                        <button
                          onClick={() => setActiveStory(prevStory)}
                          className="p-4 rounded-2xl border border-earth-200 hover:border-forest-400 bg-earth-50/50 hover:bg-white text-left transition-all cursor-pointer group space-y-1"
                        >
                          <span className="text-[10px] font-mono font-bold text-earth-400 uppercase tracking-wider flex items-center space-x-1">
                            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            <span>Previous Article</span>
                          </span>
                          <p className="font-display font-bold text-xs text-forest-900 line-clamp-1 group-hover:text-forest-700">
                            {prevStory.title}
                          </p>
                        </button>
                      ) : <div />}

                      {nextStory ? (
                        <button
                          onClick={() => setActiveStory(nextStory)}
                          className="p-4 rounded-2xl border border-earth-200 hover:border-forest-400 bg-earth-50/50 hover:bg-white text-right transition-all cursor-pointer group space-y-1"
                        >
                          <span className="text-[10px] font-mono font-bold text-earth-400 uppercase tracking-wider flex items-center justify-end space-x-1">
                            <span>Next Article</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <p className="font-display font-bold text-xs text-forest-900 line-clamp-1 group-hover:text-forest-700">
                            {nextStory.title}
                          </p>
                        </button>
                      ) : <div />}
                    </div>

                    {/* Related Stories */}
                    {relatedStories.length > 0 && (
                      <div className="pt-6 space-y-4">
                        <h4 className="font-display font-bold text-sm text-forest-900 uppercase tracking-wider font-mono">
                          Related Field Reports
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {relatedStories.map(rel => (
                            <div 
                              key={rel.id}
                              onClick={() => setActiveStory(rel)}
                              className="p-3.5 rounded-2xl border border-earth-200 hover:border-emerald-300 bg-white hover:shadow-md transition-all cursor-pointer flex items-center space-x-3 group"
                            >
                              <img src={rel.image} alt={rel.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                              <div className="min-w-0 flex-1 space-y-1">
                                <span className="text-[9px] font-mono font-bold text-emerald-700 uppercase">{rel.category}</span>
                                <h5 className="font-display font-bold text-xs text-forest-900 line-clamp-2 leading-snug group-hover:text-forest-700">
                                  {rel.title}
                                </h5>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Call to action footer box inside modal */}
                    <div className="mt-8 pt-6 border-t border-earth-200 bg-forest-950 text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
                      <div className="space-y-2 max-w-md">
                        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold">
                          <Heart className="w-4 h-4 fill-emerald-400" />
                          <span>Support Local Ecosystem Restoration</span>
                        </div>
                        <h5 className="font-display font-bold text-lg text-white">
                          Help fund more community field journals
                        </h5>
                        <p className="text-xs text-forest-200 leading-relaxed font-light">
                          Your support funds transparent drone telemetry, community nurseries, and sustainable livelihood programs in Kenya.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                        <button
                          id="reader-get-involved-cta"
                          onClick={() => {
                            setActiveStory(null);
                            if (onNavigate) onNavigate('get-involved');
                          }}
                          className="bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow-md cursor-pointer transition-all text-center flex items-center justify-center space-x-2"
                        >
                          <span>Get Involved</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
