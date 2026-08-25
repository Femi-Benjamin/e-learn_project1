import React from 'react';

export const CourseCardSkeleton = () => {
  return (
    <div 
      className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft overflow-hidden animate-shimmer relative"
      aria-hidden="true"
    >
      {/* Thumbnail Skeleton */}
      <div className="relative aspect-video w-full bg-slate-200/90 dark:bg-slate-800/90 overflow-hidden">
        {/* Top Pills */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <div className="h-6 w-20 rounded-lg bg-slate-300 dark:bg-slate-700/80 animate-pulse" />
          <div className="h-6 w-16 rounded-lg bg-slate-300 dark:bg-slate-700/80 animate-pulse" />
        </div>

        {/* Bookmark Skeleton */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-slate-300/80 dark:bg-slate-700/80 animate-pulse" />

        {/* Instructor Bottom Left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700/80 animate-pulse" />
          <div className="h-3.5 w-24 rounded bg-slate-300 dark:bg-slate-700/80 animate-pulse" />
        </div>

        {/* Level Badge Bottom Right */}
        <div className="absolute bottom-3 right-3">
          <div className="h-4 w-16 rounded-md bg-slate-300 dark:bg-slate-700/80 animate-pulse" />
        </div>
      </div>

      {/* Course Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Rating and Enrolled Counter */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Title Lines */}
          <div className="space-y-2 pt-1">
            <div className="h-5 w-11/12 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>

          {/* Description Lines */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-full rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
            <div className="h-3.5 w-5/6 rounded bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
          </div>

          {/* Meta specs (Duration, Lessons, Labs) */}
          <div className="pt-2 flex items-center gap-4">
            <div className="h-3.5 w-14 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-3.5 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-3.5 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
        </div>

        {/* Card Footer: Price & Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-6 w-16 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-9 w-24 rounded-xl bg-slate-300 dark:bg-slate-700 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
