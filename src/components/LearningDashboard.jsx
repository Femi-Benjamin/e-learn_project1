import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Clock, 
  Trophy, 
  BookOpen, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Award,
  BarChart2,
  Calendar,
  Layers,
  ArrowRight,
  AlertTriangle,
  Bookmark,
  Play
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ContinueLearningCard from './ContinueLearningCard';
import EmptyState from './EmptyState';
import CoursePreviewModal from './CoursePreviewModal';

export const LearningDashboard = ({ onResumeCourse: externalResumeCourse }) => {
  const { 
    coursesList, 
    enrolledCourses, 
    courseProgress, 
    updateCourseProgress,
    showToast,
    showErrorToast,
    showLessonToast,
    showBookmarkToast,
    enrollInCourse
  } = useAuth();

  const [activeTab, setActiveTab] = useState('weekly'); // 'weekly' | 'courses'
  const [internalPreviewCourse, setInternalPreviewCourse] = useState(null);
  const [selectedCourseForLesson, setSelectedCourseForLesson] = useState(
    enrolledCourses.length > 0 ? enrolledCourses[0] : 'cs-101'
  );

  const handleResumeCourse = (course) => {
    if (externalResumeCourse) {
      externalResumeCourse(course);
    } else {
      setInternalPreviewCourse(course);
    }
  };

  // Compute completed courses count (courses with 100% progress)
  const completedCoursesCount = useMemo(() => {
    return Object.entries(courseProgress || {}).filter(([_, percent]) => percent >= 100).length;
  }, [courseProgress]);

  // Compute total hours learned dynamically based on enrolled course progress + base study history
  const { totalHoursLearned, courseData, weeklyData } = useMemo(() => {
    // Standard course hours estimate based on course progress
    let calculatedCourseHours = 0;

    const cData = coursesList.map(course => {
      const isEnrolled = enrolledCourses.includes(course.id);
      const percent = courseProgress[course.id] !== undefined 
        ? courseProgress[course.id] 
        : (isEnrolled ? 25 : 0);
      
      // Estimated total course hours (e.g. 24 to 48 hours depending on lessons count)
      const totalEstimatedHours = Math.round((course.lessonsCount || 36) * 1.2);
      const learnedHours = Math.round((percent / 100) * totalEstimatedHours * 10) / 10;
      
      calculatedCourseHours += learnedHours;

      return {
        id: course.id,
        name: course.title.length > 18 ? course.title.substring(0, 16) + '…' : course.title,
        fullName: course.title,
        hoursLearned: learnedHours,
        totalHours: totalEstimatedHours,
        progress: percent,
        isCompleted: percent >= 100,
        isEnrolled
      };
    });

    const baseWeekly = [
      { day: 'Mon', lectures: 2.2, labs: 1.5, total: 3.7 },
      { day: 'Tue', lectures: 1.8, labs: 2.0, total: 3.8 },
      { day: 'Wed', lectures: 3.0, labs: 1.8, total: 4.8 },
      { day: 'Thu', lectures: 2.5, labs: 2.4, total: 4.9 },
      { day: 'Fri', lectures: 1.5, labs: 1.2, total: 2.7 },
      { day: 'Sat', lectures: 3.5, labs: 3.0, total: 6.5 },
      { day: 'Sun', lectures: 2.0, labs: 1.8, total: 3.8 },
    ];

    // Scale weekly total by any dynamic gains in session
    const totalWeeklyHours = baseWeekly.reduce((acc, curr) => acc + curr.total, 0);
    const finalTotalHours = Math.round((calculatedCourseHours + 18.5) * 10) / 10;

    return {
      totalHoursLearned: finalTotalHours,
      courseData: cData,
      weeklyData: baseWeekly
    };
  }, [coursesList, enrolledCourses, courseProgress]);

  // Handle live quick-advance of a lesson
  const handleQuickAdvanceLesson = () => {
    const courseId = selectedCourseForLesson;
    const currentPercent = courseProgress[courseId] || 0;
    const nextPercent = Math.min(100, currentPercent + 15);
    const targetCourse = coursesList.find(c => c.id === courseId);
    
    updateCourseProgress(courseId, nextPercent, targetCourse?.title || "Selected Track");
  };

  // Custom Recharts Tooltip Component
  const CustomWeeklyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-md text-xs space-y-1.5">
          <p className="font-bold text-slate-200 border-b border-slate-700 pb-1 flex items-center justify-between gap-4">
            <span>{label} Activity</span>
            <span className="text-blue-400 font-mono">{data.total} hrs total</span>
          </p>
          <div className="flex items-center justify-between gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Lectures:
            </span>
            <span className="font-semibold text-white">{data.lectures} hrs</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              Interactive Labs:
            </span>
            <span className="font-semibold text-white">{data.labs} hrs</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomCourseTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl border border-slate-700 shadow-2xl backdrop-blur-md text-xs space-y-1.5 max-w-xs">
          <p className="font-bold text-slate-200 border-b border-slate-700 pb-1">
            {data.fullName}
          </p>
          <div className="flex items-center justify-between gap-4 text-slate-300">
            <span>Progress:</span>
            <span className={`font-bold ${data.isCompleted ? 'text-emerald-400' : 'text-blue-400'}`}>
              {data.progress}% {data.isCompleted ? '(Completed)' : ''}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-slate-300">
            <span>Hours Learned:</span>
            <span className="font-semibold text-white">{data.hoursLearned} of {data.totalHours} hrs</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section 
      className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl sm:rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden relative"
      id="learning-analytics-dashboard"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Continue Learning Section: Resume Last Accessed Course */}
        <ContinueLearningCard onResumeCourse={handleResumeCourse} />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Student Performance & Analytics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Learning Journey & Progress Summary
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Track your dedicated study hours, milestone completions, and course curriculum mastery in real time.
            </p>
          </div>

          {/* Chart View Toggle Pill Bar */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'weekly'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              id="view-weekly-hours-tab"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Weekly Learning Hours</span>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              id="view-course-breakdown-tab"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Courses Completed & Hours</span>
            </button>
          </div>
        </div>

        {/* 4 Core Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Total Hours Learned */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md space-y-2 hover:border-blue-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Hours Learned</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                {totalHoursLearned}
              </span>
              <span className="text-xs font-bold text-blue-400">hrs</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+6.2 hrs logged this week</span>
            </div>
          </div>

          {/* Card 2: Courses Completed */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md space-y-2 hover:border-emerald-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Courses Completed</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                {completedCoursesCount}
              </span>
              <span className="text-xs text-slate-400">of {enrolledCourses.length} enrolled</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedCoursesCount} Verified Diplomas</span>
            </div>
          </div>

          {/* Card 3: Active Enrolled Tracks */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md space-y-2 hover:border-indigo-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Tracks</span>
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                {enrolledCourses.length}
              </span>
              <span className="text-xs text-indigo-400 font-semibold">Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full curriculum access</span>
            </div>
          </div>

          {/* Card 4: Study Streak */}
          <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md space-y-2 hover:border-amber-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Streak</span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                7
              </span>
              <span className="text-xs font-bold text-amber-400">Days Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top 5% student consistency</span>
            </div>
          </div>

        </div>

        {/* Main Bar Chart Visualization Canvas Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/70 border border-slate-800/90 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                {activeTab === 'weekly' ? 'Weekly Time Allocation by Study Category' : 'Course Completion & Learned Hours Breakdown'}
              </h3>
              <p className="text-xs text-slate-400">
                {activeTab === 'weekly' 
                  ? 'Visualizing lecture video stream vs hands-on cloud sandbox lab hours over the past 7 days'
                  : 'Comparing total hours completed across your enrolled and catalog courses'}
              </p>
            </div>

            {/* Quick Stat Legend */}
            <div className="flex items-center gap-4 text-xs font-medium">
              {activeTab === 'weekly' ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-blue-600" />
                    <span className="text-slate-300">Video Lectures</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-indigo-500" />
                    <span className="text-slate-300">Sandbox Labs</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-blue-600" />
                    <span className="text-slate-300">Hours Learned</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-md bg-slate-700" />
                    <span className="text-slate-400">Total Course Duration</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Recharts Bar Chart Container */}
          <div className="h-72 sm:h-80 w-full" id="learning-recharts-barchart">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'weekly' ? (
                <BarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#94a3b8" 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    axisLine={{ stroke: '#475569' }}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    axisLine={{ stroke: '#475569' }}
                    unit="h"
                  />
                  <Tooltip content={<CustomWeeklyTooltip />} />
                  <Bar 
                    dataKey="lectures" 
                    name="Video Lectures" 
                    fill="#2563eb" 
                    radius={[4, 4, 0, 0]} 
                    stackId="a"
                  />
                  <Bar 
                    dataKey="labs" 
                    name="Interactive Labs" 
                    fill="#6366f1" 
                    radius={[6, 6, 0, 0]} 
                    stackId="a"
                  />
                </BarChart>
              ) : (
                <BarChart
                  data={courseData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    angle={-20}
                    textAnchor="end"
                    axisLine={{ stroke: '#475569' }}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    axisLine={{ stroke: '#475569' }}
                    unit="h"
                  />
                  <Tooltip content={<CustomCourseTooltip />} />
                  <Bar 
                    dataKey="totalHours" 
                    name="Total Course Hours" 
                    fill="#334155" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="hoursLearned" 
                    name="Hours Learned" 
                    fill="#2563eb" 
                    radius={[4, 4, 0, 0]}
                  >
                    {courseData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.isCompleted ? '#10b981' : '#3b82f6'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

        </div>

        {/* Interactive Action Bar: Live Progress & Toast Feedback Controls */}
        <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-1 max-w-md">
            <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Interactive Progress & Toast Dispatcher</span>
            </h4>
            <p className="text-xs text-slate-400">
              Advance a lesson to update the bar chart live, or test our instant toast notification triggers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Course Selector for Lesson Completion */}
            <select
              value={selectedCourseForLesson}
              onChange={(e) => setSelectedCourseForLesson(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="course-lesson-progress-select"
            >
              {coursesList.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title} ({courseProgress[c.id] || 0}% done)
                </option>
              ))}
            </select>

            {/* Quick Complete Lesson Button (Triggers Lesson Toast + Updates Bar Chart) */}
            <button
              onClick={handleQuickAdvanceLesson}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md shadow-blue-600/25 active:scale-98 transition-all cursor-pointer"
              id="quick-advance-lesson-btn"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complete Next Lesson (+15%)</span>
            </button>

            {/* Quick Bookmark Toast Trigger */}
            <button
              onClick={() => {
                const target = coursesList.find(c => c.id === selectedCourseForLesson);
                showBookmarkToast(target?.title || "Full-Stack Development", true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-600/60 transition-colors"
              title="Test Course Saved Toast"
              id="test-bookmark-toast-btn"
            >
              <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
              <span>Test Save Toast</span>
            </button>

            {/* Quick Error Toast Trigger */}
            <button
              onClick={() => showErrorToast('Network timeout: Unable to synchronize live cloud laboratory session.', 'Connection Error')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-xs font-semibold text-rose-300 border border-rose-800/60 transition-colors"
              title="Test Error Notification Toast"
              id="test-error-toast-btn"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Test Error Toast</span>
            </button>
          </div>

        </div>

      </div>

      {/* Slide-In Modal for Course Details Preview */}
      {internalPreviewCourse && (
        <CoursePreviewModal
          course={internalPreviewCourse}
          isOpen={Boolean(internalPreviewCourse)}
          onClose={() => setInternalPreviewCourse(null)}
          onEnroll={(c) => {
            enrollInCourse(c.id, c.title);
            setInternalPreviewCourse(null);
          }}
        />
      )}
    </section>
  );
};

export default LearningDashboard;
