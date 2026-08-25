import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Bookmark, 
  Search, 
  ArrowRight, 
  PlayCircle,
  GraduationCap,
  Layers,
  Flame
} from 'lucide-react';

export const EmptyState = ({
  type = 'no-courses',
  title,
  description,
  actionLabel,
  actionLink,
  onActionClick,
  secondaryActionLabel,
  onSecondaryActionClick,
  className = ''
}) => {
  // Configurable illustration presets
  const renderIllustration = () => {
    switch (type) {
      case 'no-courses':
        return (
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center">
            {/* Background glowing rings */}
            <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-xl animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-xl shadow-blue-500/20">
              <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            {/* Floating decorative elements */}
            <div className="absolute -top-1 -right-1 p-2 rounded-xl bg-amber-400 text-amber-950 shadow-md animate-bounce">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="absolute -bottom-1 -left-1 p-1.5 rounded-lg bg-indigo-600 text-white shadow-md">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
        );

      case 'no-progress':
        return (
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 blur-xl animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-xl shadow-emerald-500/20">
              <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex items-center justify-center">
                <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 dark:text-emerald-400" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 p-2 rounded-xl bg-emerald-500 text-white shadow-md animate-bounce">
              <Flame className="w-4 h-4" />
            </div>
            <div className="absolute -bottom-1 -left-1 p-1.5 rounded-lg bg-teal-600 text-white shadow-md">
              <PlayCircle className="w-3.5 h-3.5" />
            </div>
          </div>
        );

      case 'no-bookmarks':
        return (
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-xl animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-xl shadow-indigo-500/20">
              <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex items-center justify-center">
                <Bookmark className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-500 dark:text-indigo-400" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 p-2 rounded-xl bg-purple-500 text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-slate-500/10 dark:bg-slate-500/20 blur-xl" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-slate-700">
              <Search className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
        );
    }
  };

  const defaultTitles = {
    'no-courses': 'No Active Courses Yet',
    'no-progress': 'Ready to Start Learning?',
    'no-bookmarks': 'Your Saved Library is Empty',
    'no-results': 'No Courses Found'
  };

  const defaultDescriptions = {
    'no-courses': 'You haven\'t enrolled in any tracks yet. Explore our expert-led catalog and take your skills to the next level.',
    'no-progress': 'Begin your first masterclass lesson to unlock live metrics, completion badges, and personalized analytics.',
    'no-bookmarks': 'Bookmark masterclasses you want to revisit later by clicking the bookmark icon on any course card.',
    'no-results': 'We couldn\'t find any courses matching your selected criteria. Try adjusting your search query or filter tags.'
  };

  const resolvedTitle = title || defaultTitles[type] || 'No Content Available';
  const resolvedDescription = description || defaultDescriptions[type] || 'Check back later or try exploring other areas of the platform.';

  return (
    <div 
      className={`p-8 sm:p-12 text-center rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm max-w-xl mx-auto space-y-5 transition-all ${className}`}
      id={`empty-state-${type}`}
    >
      {renderIllustration()}

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
          {resolvedTitle}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          {resolvedDescription}
        </p>
      </div>

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {actionLabel && (
            actionLink ? (
              <Link
                to={actionLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all"
                id="empty-state-primary-btn"
              >
                <span>{actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={onActionClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
                id="empty-state-primary-btn"
              >
                <span>{actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )
          )}

          {secondaryActionLabel && (
            <button
              onClick={onSecondaryActionClick}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              id="empty-state-secondary-btn"
            >
              <span>{secondaryActionLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
