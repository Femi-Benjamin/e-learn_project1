import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard, { CourseCardSkeleton } from '../components/CourseCard';
import RegistrationModal from '../components/RegistrationModal';
import { CoursePreviewModal } from '../components/CoursePreviewModal';
import LearningDashboard from '../components/LearningDashboard';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Bookmark, 
  Sparkles, 
  BookOpen, 
  X,
  Layers,
  GraduationCap
} from 'lucide-react';

export const Courses = () => {
  const { coursesList, bookmarkedCourses } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [showOnlySaved, setShowOnlySaved] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState(null);
  const [previewCourse, setPreviewCourse] = useState(null);

  // Initial loading simulation for shimmer skeletons
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedLevel, sortBy, showOnlySaved]);

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const categories = ['All', 'Computer Science', 'Security', 'Development', 'AI', 'Data', 'Cloud', 'Design', 'Business', 'Marketing'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter pipeline
  let filtered = coursesList.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLevel = selectedLevel === 'All' || course.level?.toLowerCase() === selectedLevel.toLowerCase() || course.level === 'All Levels';
    const matchesSaved = !showOnlySaved || bookmarkedCourses.includes(course.id);

    return matchesSearch && matchesCategory && matchesLevel && matchesSaved;
  });

  // Sort pipeline
  if (sortBy === 'popular') {
    filtered.sort((a, b) => (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0));
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sortBy === 'price-low') {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  }

  const handleOpenEnroll = (course = null) => {
    setSelectedCourseForEnroll(course);
    setIsEnrollModalOpen(true);
  };

  const handleOpenPreview = (course) => {
    setPreviewCourse(course);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('popular');
    setShowOnlySaved(false);
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans flex flex-col justify-between transition-colors">
      <Navbar onOpenModal={() => handleOpenEnroll(null)} />

      {/* Page Hero Header */}
      <section className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white pt-10 sm:pt-12 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Full Curriculum Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Master In-Demand Tech Skills
            </h1>
            <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              Explore comprehensive engineering, security, and artificial intelligence programs with hands-on labs and certifications.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="max-w-2xl bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-slate-700/80 dark:border-slate-800 flex items-center gap-2 shadow-2xl focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition-all">
            <Search className="w-5 h-5 text-blue-400 ml-2.5 sm:ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, technology, or instructor..."
              className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
              id="courses-search-bar"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Catalog Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1 space-y-8">
        
        {/* Filters and Controls Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4 transition-colors">
          
          {/* Top Row: Categories Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bottom Row: Secondary Filters & Sort Dropdowns */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Level Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Level:</span>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Bookmarked Filter Toggle */}
              <button
                onClick={() => setShowOnlySaved(!showOnlySaved)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  showOnlySaved 
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showOnlySaved ? 'fill-current' : ''}`} />
                <span>Saved ({bookmarkedCourses.length})</span>
              </button>
            </div>

            {/* Sort Filter & Results Count */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium hidden sm:inline">
                Showing <strong className="text-slate-700 dark:text-slate-200">{filtered.length}</strong> courses
              </span>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>

        </div>

        {/* Course Cards Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="courses-skeletons-grid">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <CourseCardSkeleton key={idx} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="courses-catalog-grid">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onOpenEnrollModal={handleOpenEnroll}
                onOpenPreviewModal={handleOpenPreview}
              />
            ))}
          </div>
        ) : (
          /* Friendly Empty State */
          <div className="py-6 sm:py-10">
            <EmptyState
              type={showOnlySaved ? 'no-bookmarks' : searchQuery ? 'no-results' : 'no-courses'}
              title={
                showOnlySaved 
                  ? 'No Saved Courses Found' 
                  : searchQuery 
                    ? `No Results for "${searchQuery}"` 
                    : 'No Courses Matching Your Filter'
              }
              description={
                showOnlySaved
                  ? 'You haven\'t bookmarked any courses yet. Tap the bookmark icon on any track to save it here for quick access.'
                  : 'We couldn\'t find any courses matching your selected tags or search term. Try resetting your search filters.'
              }
              actionLabel="Reset All Filters"
              onActionClick={resetFilters}
              secondaryActionLabel={showOnlySaved ? "View All Courses" : null}
              onSecondaryActionClick={showOnlySaved ? () => setShowOnlySaved(false) : null}
            />
          </div>
        )}

        {/* Personal Study Analytics & Learning Dashboard */}
        <div className="pt-6 sm:pt-10">
          <LearningDashboard onResumeCourse={handleOpenPreview} />
        </div>

      </main>

      <Footer onOpenModal={() => handleOpenEnroll(null)} />

      {/* Enrollment Dialog */}
      <RegistrationModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        preselectedCourse={selectedCourseForEnroll}
      />

      {/* Course Preview Modal */}
      <CoursePreviewModal
        course={previewCourse}
        isOpen={!!previewCourse}
        onClose={() => setPreviewCourse(null)}
        onEnroll={(course) => handleOpenEnroll(course)}
      />
    </div>
  );
};

export default Courses;
