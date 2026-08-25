import React from 'react';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Bookmark, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  ArrowUpRight,
  TrendingUp,
  Trophy,
  PlayCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CourseCard = ({ course, onOpenEnrollModal, onOpenPreviewModal }) => {
  const { bookmarkedCourses, toggleBookmark, enrolledCourses, courseProgress } = useAuth();
  
  if (!course) return null;

  const isBookmarked = bookmarkedCourses?.includes(course.id);
  const isEnrolled = enrolledCourses?.includes(course.id);

  // Calculate learning journey progress
  const progressPercent = courseProgress && courseProgress[course.id] !== undefined
    ? courseProgress[course.id]
    : (isEnrolled ? 25 : 0);

  const totalLessons = course.lessonsCount || 36;
  const completedLessons = Math.round((progressPercent / 100) * totalLessons);
  const isCompleted = progressPercent === 100;

  return (
    <div 
      onClick={() => onOpenPreviewModal ? onOpenPreviewModal(course) : null}
      className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-blue-400/80 dark:hover:border-blue-500/60 transition-all duration-300 overflow-hidden relative cursor-pointer"
      id={`course-card-${course.id || 'item'}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent opacity-80" />

        {/* Category & Status Pills */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 shadow-sm border border-black/5 dark:border-white/10">
            {course.category || 'General'}
          </span>
          {isCompleted ? (
            <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-600 text-white shadow-sm flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              Completed
            </span>
          ) : course.badge ? (
            <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-blue-600 text-white shadow-sm">
              {course.badge}
            </span>
          ) : null}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(course.id, course.title);
          }}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            isBookmarked 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'bg-black/50 text-white hover:bg-black/80 hover:scale-110'
          }`}
          aria-label={isBookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
          id={`bookmark-btn-${course.id}`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Instructor badge overlaid on bottom left of thumbnail */}
        {course.instructor && (
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <img 
              src={course.instructor.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} 
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full object-cover ring-2 ring-white/90 dark:ring-slate-800" 
            />
            <span className="text-xs font-medium text-white/90 drop-shadow-xs">
              {course.instructor.name}
            </span>
          </div>
        )}

        {/* Level badge bottom right */}
        {course.level && (
          <div className="absolute bottom-3 right-3">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-700/60">
              {course.level}
            </span>
          </div>
        )}
      </div>

      {/* Course Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating and Enrolled Counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{course.rating ? course.rating.toFixed(1) : "4.8"}</span>
              <span className="text-slate-400 dark:text-slate-500 font-normal">
                ({course.reviewsCount ? course.reviewsCount.toLocaleString() : "240"})
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.studentsEnrolled ? course.studentsEnrolled.toLocaleString() : "1.2k"} learners</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base lg:text-lg leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          {course.description && (
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          )}

          {/* Lessons & Duration stats */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{totalLessons} Lessons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.duration || "8 Weeks"}</span>
            </div>
          </div>

          {/* Visual Learning Journey Progress Bar */}
          <div className="mt-4 pt-3.5 border-t border-slate-100/90 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
                <TrendingUp className={`w-3.5 h-3.5 ${
                  isCompleted 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : isEnrolled 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-400'
                }`} />
                <span className="text-[11px] uppercase tracking-wider">Learning Journey</span>
              </div>
              
              <div className="flex items-center gap-1">
                {isCompleted ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    100% Done
                  </span>
                ) : isEnrolled ? (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {progressPercent}% Complete
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Not started
                  </span>
                )}
              </div>
            </div>

            {/* Visual Progress Track */}
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-700 relative ${
                  isCompleted
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    : progressPercent > 0
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400'
                      : 'bg-slate-200 dark:bg-slate-700'
                }`}
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              >
                {progressPercent > 0 && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                )}
              </div>
            </div>

            {/* Progress Lesson Counter Note */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400 pt-0.5">
              <span>
                {isEnrolled 
                  ? `${completedLessons} of ${totalLessons} lessons completed`
                  : `0 of ${totalLessons} lessons completed`}
              </span>
              {isEnrolled && (
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {isCompleted ? 'Certified' : 'In Progress'}
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Pricing and Action Buttons Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
                ${course.price || "79.99"}
              </span>
              {course.originalPrice && (
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider block">
              Lifetime Access
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onOpenPreviewModal && (
              <button
                onClick={() => onOpenPreviewModal(course)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Quick Course Preview"
                aria-label={`Preview curriculum for ${course.title}`}
                id={`preview-btn-${course.id}`}
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            {isEnrolled ? (
              <button
                onClick={() => onOpenPreviewModal ? onOpenPreviewModal(course) : null}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
                title="Continue learning curriculum"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Review</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Continue</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => onOpenEnrollModal ? onOpenEnrollModal(course) : null}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-xs shadow-blue-500/20 transition-all"
                id={`enroll-btn-${course.id}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enroll</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

import { CourseCardSkeleton } from './CourseCardSkeleton';

export { CourseCardSkeleton };
export default CourseCard;
