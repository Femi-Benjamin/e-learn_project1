import React, { useState } from 'react';
import { 
  Play, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Flame,
  ChevronRight,
  TrendingUp,
  Layers,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EmptyState } from './EmptyState';
import { Link } from 'react-router-dom';

export const ContinueLearningCard = ({ onResumeCourse }) => {
  const { 
    coursesList, 
    enrolledCourses, 
    courseProgress, 
    lastAccessedCourseId,
    setLastAccessedCourse,
    updateCourseProgress,
    enrollInCourse
  } = useAuth();

  // Find enrolled courses objects
  const enrolledCoursesList = coursesList.filter(c => enrolledCourses.includes(c.id));

  // Determine current active course
  const [selectedId, setSelectedId] = useState(
    lastAccessedCourseId || (enrolledCoursesList.length > 0 ? enrolledCoursesList[0].id : null)
  );

  // Sync if selected course changes externally
  const activeCourse = enrolledCoursesList.find(c => c.id === selectedId) || 
                       coursesList.find(c => c.id === lastAccessedCourseId) ||
                       enrolledCoursesList[0] ||
                       null;

  if (!activeCourse && enrolledCoursesList.length === 0) {
    return (
      <div className="w-full" id="continue-learning-empty">
        <EmptyState
          type="no-courses"
          title="Ready to Launch Your Next Mastery Track?"
          description="You don't have any courses in progress yet. Browse our curated masterclasses in Cybersecurity, Full-Stack Engineering, and Generative AI to get started."
          actionLabel="Explore Course Catalog"
          actionLink="/courses"
          secondaryActionLabel="Enroll in Cyber Security Masterclass"
          onSecondaryActionClick={() => enrollInCourse('cs-101', 'Cyber Security & Ethical Hacking Masterclass')}
          className="my-2"
        />
      </div>
    );
  }

  const currentCourse = activeCourse || coursesList[0];
  const progressPercent = courseProgress[currentCourse.id] !== undefined
    ? courseProgress[currentCourse.id]
    : 25;
  const isCompleted = progressPercent >= 100;
  const totalLessons = currentCourse.lessonsCount || 36;
  const completedLessons = Math.round((progressPercent / 100) * totalLessons);
  const currentLessonNumber = Math.min(totalLessons, completedLessons + 1);

  // Compute realistic dynamic current module topic based on course
  const currentModuleTitle = currentCourse.modules && currentCourse.modules.length > 0
    ? (currentCourse.modules[Math.min(currentCourse.modules.length - 1, Math.floor((progressPercent / 100) * currentCourse.modules.length))]?.title || 'Core Architecture & Advanced Concepts')
    : 'Core Architecture & Hands-on Lab Implementation';

  const handleQuickAdvance = (e) => {
    e.stopPropagation();
    const nextPercent = Math.min(100, progressPercent + 15);
    updateCourseProgress(currentCourse.id, nextPercent, currentCourse.title);
  };

  const handleSelectTrack = (courseId) => {
    setSelectedId(courseId);
    setLastAccessedCourse(courseId);
  };

  return (
    <div 
      className="relative rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-white transition-all group"
      id="continue-learning-section"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Bar */}
      <div className="px-5 sm:px-8 py-3.5 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-heading font-bold uppercase tracking-wider text-slate-300">
            Continue Learning
          </span>
          <span className="text-slate-600 dark:text-slate-500">•</span>
          <span className="text-slate-400 font-medium hidden sm:inline">
            Pick up right where you left off
          </span>
        </div>

        {/* Switcher if user has multiple active tracks */}
        {enrolledCoursesList.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            <span className="text-slate-400 text-[11px] font-medium mr-1 hidden md:inline">Active Tracks:</span>
            {enrolledCoursesList.map((course) => (
              <button
                key={course.id}
                onClick={() => handleSelectTrack(course.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer truncate max-w-[140px] sm:max-w-[180px] ${
                  currentCourse.id === course.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
                title={course.title}
                id={`switch-track-${course.id}`}
              >
                {course.category} ({courseProgress[course.id] || 0}%)
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Interactive Hero Card Content */}
      <div className="p-5 sm:p-8 grid lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Visual Thumbnail Area */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden bg-slate-950 aspect-video lg:aspect-4/3 border border-slate-700/80 shadow-md group/thumb">
          <img 
            src={currentCourse.image} 
            alt={currentCourse.title} 
            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Overlay Tag Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-xs">
              {currentCourse.category}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-slate-300">
              {currentCourse.level || 'Intermediate'}
            </span>
          </div>

          {/* Center Play Button Overlay */}
          <button
            onClick={() => onResumeCourse ? onResumeCourse(currentCourse) : null}
            className="absolute inset-0 flex items-center justify-center group-hover/thumb:scale-110 transition-transform cursor-pointer"
            aria-label="Resume course playback"
            id="continue-learning-play-overlay-btn"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl shadow-blue-900/50 backdrop-blur-xs border border-white/20">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5" />
            </div>
          </button>

          {/* Instructor Bottom Bar */}
          {currentCourse.instructor && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <img 
                  src={currentCourse.instructor.avatar} 
                  alt={currentCourse.instructor.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-700" 
                />
                <span className="font-semibold text-white text-xs truncate max-w-[130px]">
                  {currentCourse.instructor.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {currentCourse.duration}
              </span>
            </div>
          )}
        </div>

        {/* Right Info & Progress Controls */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Last Accessed Course</span>
              </span>

              {isCompleted ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Curriculum Completed</span>
                </span>
              ) : (
                <span className="text-xs text-slate-400 font-medium">
                  Next up: Lesson {currentLessonNumber} of {totalLessons}
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-white tracking-tight leading-tight">
              {currentCourse.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2 font-medium">
              <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="truncate">Current Module: <strong className="text-white">{currentModuleTitle}</strong></span>
            </p>
          </div>

          {/* Progress Bar & Stats */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-semibold text-slate-300">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>Course Mastery Progress</span>
              </div>
              <span className={`font-bold font-mono ${isCompleted ? 'text-emerald-400' : 'text-blue-400'}`}>
                {progressPercent}% Complete
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 relative">
              <div 
                className={`h-full rounded-full transition-all duration-700 relative ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                    : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400'
                }`}
                style={{ width: `${Math.max(6, progressPercent)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span>{completedLessons} of {totalLessons} lessons finished</span>
              <span>{isCompleted ? 'Certificate Ready' : 'Estimated ~2.5 hrs remaining'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onResumeCourse ? onResumeCourse(currentCourse) : null}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-heading font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all cursor-pointer"
              id="resume-course-main-btn"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isCompleted ? 'Review Course Curriculum' : 'Resume Course from Lesson ' + currentLessonNumber}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!isCompleted && (
              <button
                onClick={handleQuickAdvance}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
                title="Mark the next lesson as complete to test progress reactions"
                id="continue-learning-quick-advance-btn"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Advance Lesson (+15%)</span>
              </button>
            )}

            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-medium transition-colors"
              id="view-all-enrolled-tracks-link"
            >
              <Layers className="w-4 h-4" />
              <span>Browse All Tracks</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContinueLearningCard;
