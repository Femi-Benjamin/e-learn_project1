import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  BookOpen, 
  Star, 
  CheckCircle, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Video, 
  ArrowRight,
  TrendingUp,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  FileCode,
  CheckCircle2,
  Lock,
  Play,
  Terminal,
  HelpCircle,
  ExternalLink,
  Code2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Helper to provide realistic rich lesson breakdowns and learning outcomes for any course module
const getModuleDetails = (module, courseCategory, moduleIndex) => {
  if (module.lessons && module.lessons.length > 0) {
    return module;
  }

  // Generate contextual syllabus lessons based on the module title and category
  const title = module.title || `Module ${moduleIndex + 1}`;
  
  const sampleLessons = [
    {
      id: `${moduleIndex}-1`,
      title: `1. Core Architecture: ${title.split('&')[0].trim() || 'Fundamentals'}`,
      type: 'Video Lecture',
      duration: '45m',
      isPreviewable: true,
      summary: 'Deep-dive theoretical foundations, memory layout, and industry best practices.'
    },
    {
      id: `${moduleIndex}-2`,
      title: `2. Hands-on Lab: Implementing ${title.split('&')[1]?.trim() || 'Production Patterns'}`,
      type: 'Hands-on Lab',
      duration: '55m',
      isPreviewable: false,
      summary: 'Step-by-step code implementation with live compiler checks and test suites.'
    },
    {
      id: `${moduleIndex}-3`,
      title: `3. Case Study: Real-World Enterprise Teardown & Edge Cases`,
      type: 'Architecture Teardown',
      duration: '40m',
      isPreviewable: false,
      summary: 'Analyzing production failures, performance bottlenecks, and refactoring techniques.'
    },
    {
      id: `${moduleIndex}-4`,
      title: `4. Module Knowledge Check & Code Challenge`,
      type: 'Quiz & Challenge',
      duration: '30m',
      isPreviewable: false,
      summary: 'Timed technical challenge with automated unit test validation and scoring.'
    }
  ];

  const toolsMap = {
    Security: ['Wireshark', 'Metasploit', 'OWASP ZAP', 'Burp Suite', 'Nmap'],
    Development: ['TypeScript 5', 'React 18', 'Tailwind CSS', 'TanStack Query', 'Express'],
    AI: ['PyTorch', 'HuggingFace', 'LangChain', 'ChromaDB', 'CUDA'],
    Data: ['PostgreSQL', 'Python Pandas', 'PowerBI', 'Tableau', 'dbt'],
    Cloud: ['AWS VPC', 'Kubernetes', 'Terraform', 'Docker', 'Prometheus'],
    Design: ['Figma Variables', 'Design Tokens', 'Auto-Layout', 'Prototyping', 'Storybook'],
    Business: ['Jira Agile', 'Mixpanel', 'Notion PRDs', 'A/B Testing Frameworks'],
    Marketing: ['Google Analytics 4', 'Meta Ads Manager', 'SEMrush', 'Customer.io']
  };

  const relevantTools = toolsMap[courseCategory] || ['Git', 'VS Code', 'CLI Tools', 'Docker'];

  return {
    ...module,
    lessons: sampleLessons,
    labProject: `Capstone Lab: Build & test a resilient ${title.toLowerCase()} implementation for a high-concurrency production workload.`,
    skills: relevantTools.slice(0, 4)
  };
};

export const CoursePreviewModal = ({ course, isOpen, onClose, onEnroll }) => {
  const { enrolledCourses, courseProgress, updateCourseProgress, setLastAccessedCourse } = useAuth();
  
  // State for expanded module accordions
  // Default to having the first module expanded so the user immediately sees it's interactive
  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [previewVideoLesson, setPreviewVideoLesson] = useState(null);
  const [completedLessonIds, setCompletedLessonIds] = useState({});

  useEffect(() => {
    if (isOpen && course?.id && setLastAccessedCourse) {
      setLastAccessedCourse(course.id);
    }
  }, [isOpen, course?.id, setLastAccessedCourse]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !course) return null;

  const isEnrolled = enrolledCourses.includes(course.id);
  const progressPercent = courseProgress && courseProgress[course.id] !== undefined
    ? courseProgress[course.id]
    : (isEnrolled ? 25 : 0);

  const totalLessons = course.lessonsCount || 36;
  const completedLessons = Math.round((progressPercent / 100) * totalLessons);

  const toggleModule = (index) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const expandAll = () => {
    const all = {};
    (course.modules || []).forEach((_, idx) => {
      all[idx] = true;
    });
    setExpandedModules(all);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  const areAllExpanded = (course.modules || []).length > 0 && 
    (course.modules || []).every((_, idx) => !!expandedModules[idx]);

  const handleToggleLessonComplete = (lessonId, e) => {
    e.stopPropagation();
    setCompletedLessonIds(prev => {
      const next = { ...prev, [lessonId]: !prev[lessonId] };
      return next;
    });
    // Bump progress slightly
    if (isEnrolled) {
      updateCourseProgress(course.id, Math.min(100, progressPercent + 10), course.title);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col transition-all animate-slide-in-bottom sm:animate-slide-in-right"
        id="course-preview-modal"
      >
        {/* Header with image cover */}
        <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-colors cursor-pointer z-10"
            aria-label="Close preview modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-600">
                {course.category}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-xs">
                {course.level}
              </span>
              {course.badge && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/90 text-white">
                  {course.badge}
                </span>
              )}
              {isEnrolled && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-500 text-white flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {progressPercent}% Complete
                </span>
              )}
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-2xl leading-tight text-white drop-shadow-xs">
              {course.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-xs sm:text-sm">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                <span>{course.rating || 4.9}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">{course.reviewsCount || 420} verified reviews</p>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-800">
              <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{totalLessons} Lessons</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">{course.duration || '8 Weeks'}</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{course.studentsEnrolled?.toLocaleString() || '4,200'}</p>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">Learners Enrolled</p>
            </div>
          </div>

          {/* Learning Progress Card if Enrolled */}
          {isEnrolled && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/60 space-y-3">
              <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Your Learning Journey Progress</span>
                </div>
                <span className="font-bold text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 shadow-2xs">
                  {progressPercent}% Complete ({completedLessons}/{totalLessons} Lessons)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-white/80 dark:bg-slate-950 rounded-full overflow-hidden border border-blue-200/60 dark:border-blue-900/60 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
                <span>Click individual module lessons below to inspect syllabus topics or view free samples.</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateCourseProgress(course.id, Math.min(100, progressPercent + 15), course.title)}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    id="complete-lesson-btn"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Quick Complete (+15%)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Course Overview Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Course Overview
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Interactive Curriculum Modules Accordion */}
          {course.modules && course.modules.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-sm font-heading font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Curriculum Modules ({course.modules.length})</span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Click on any module to inspect lessons, practical labs, and preview video lectures.
                  </p>
                </div>

                {/* Expand / Collapse All Button */}
                <button
                  onClick={areAllExpanded ? collapseAll : expandAll}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  id="toggle-expand-all-modules-btn"
                >
                  {areAllExpanded ? 'Collapse All' : 'Expand All'}
                </button>
              </div>

              {/* Modules List Accordion */}
              <div className="space-y-2.5">
                {course.modules.map((rawMod, idx) => {
                  const isExpanded = !!expandedModules[idx];
                  const mod = getModuleDetails(rawMod, course.category, idx);

                  return (
                    <div 
                      key={idx}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isExpanded 
                          ? 'bg-white dark:bg-slate-900 border-blue-300 dark:border-blue-800 shadow-md shadow-blue-500/5 ring-1 ring-blue-500/20' 
                          : 'bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {/* Module Header Toggle Button */}
                      <button
                        onClick={() => toggleModule(idx)}
                        className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
                        aria-expanded={isExpanded}
                        id={`module-toggle-btn-${idx}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                            isExpanded
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          }`}>
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block truncate">
                              {mod.title}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              <span>{mod.lessons?.length || 4} Lessons</span>
                              <span>•</span>
                              <span className="font-mono">{mod.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`p-1 rounded-lg transition-transform duration-200 ${isExpanded ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </div>
                      </button>

                      {/* Module Expanded Details */}
                      {isExpanded && (
                        <div className="px-3.5 sm:px-4 pb-4 pt-1 space-y-3.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 animate-in slide-in-from-top-1 duration-150">
                          
                          {/* Module Lab / Project Banner */}
                          {mod.labProject && (
                            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/80 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                              <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                              <div className="space-y-0.5">
                                <span className="font-bold text-blue-900 dark:text-blue-300">Hands-on Deliverable:</span>
                                <p className="text-[11px] text-slate-600 dark:text-slate-300">{mod.labProject}</p>
                              </div>
                            </div>
                          )}

                          {/* Lessons Breakdown List */}
                          <div className="space-y-1.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Module Lessons & Activities
                            </p>

                            <div className="space-y-1.5">
                              {mod.lessons.map((lesson) => {
                                const isChecked = !!completedLessonIds[lesson.id];

                                return (
                                  <div 
                                    key={lesson.id}
                                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3 text-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                                  >
                                    <div className="flex items-start gap-2.5 min-w-0">
                                      {/* Checkbox for enrolled users or icon */}
                                      {isEnrolled ? (
                                        <button
                                          onClick={(e) => handleToggleLessonComplete(lesson.id, e)}
                                          className={`mt-0.5 p-0.5 rounded-md transition-colors cursor-pointer ${
                                            isChecked 
                                              ? 'text-emerald-600 dark:text-emerald-400' 
                                              : 'text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400'
                                          }`}
                                          title={isChecked ? "Mark as Incomplete" : "Mark as Completed"}
                                        >
                                          <CheckCircle2 className="w-4 h-4 fill-current" />
                                        </button>
                                      ) : (
                                        <div className="mt-0.5 text-blue-600 dark:text-blue-400">
                                          {lesson.isPreviewable ? (
                                            <PlayCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                          ) : (
                                            <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                                          )}
                                        </div>
                                      )}

                                      <div className="min-w-0 space-y-0.5">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                                            {lesson.title}
                                          </span>
                                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                            {lesson.type}
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                          {lesson.summary}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Action button: Watch Preview / Duration */}
                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className="text-[11px] text-slate-400 font-mono">
                                        {lesson.duration}
                                      </span>

                                      {lesson.isPreviewable && !isEnrolled && (
                                        <button
                                          onClick={() => setPreviewVideoLesson({ ...lesson, courseTitle: course.title })}
                                          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer"
                                          title="Watch Free Preview Lesson"
                                        >
                                          <Play className="w-3 h-3 fill-current" />
                                          <span>Preview</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Skill Tags */}
                          {mod.skills && mod.skills.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap pt-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Technologies:</span>
                              {mod.skills.map((skill, sIdx) => (
                                <span 
                                  key={sIdx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instructor Bio */}
          {course.instructor && (
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-center gap-4">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-300 dark:ring-blue-700 shrink-0" 
              />
              <div>
                <p className="text-xs text-blue-700 dark:text-blue-400 font-bold uppercase tracking-wider">Lead Instructor</p>
                <h5 className="font-heading font-bold text-slate-900 dark:text-white text-base">{course.instructor.name}</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300">{course.instructor.role}</p>
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Full lifetime access to all lectures</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Verified Certificate of Completion</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Weekly live interactive mentor workshops</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Footer with Price & Enroll Action */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 transition-colors">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
                ${course.price || "79.99"}
              </span>
              {course.originalPrice && (
                <span className="text-xs sm:text-sm text-slate-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">One-time enrollment fee</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            {isEnrolled ? (
              <span className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Enrolled</span>
              </span>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onEnroll(course);
                }}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                id="modal-enroll-action-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Video Sample Preview Player Popup */}
      {previewVideoLesson && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-3xl overflow-hidden max-w-xl w-full border border-slate-800 shadow-2xl text-white space-y-4 p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Free Sample Lecture
                </span>
                <h4 className="font-heading font-bold text-base text-white">
                  {previewVideoLesson.title}
                </h4>
              </div>
              <button
                onClick={() => setPreviewVideoLesson(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="rounded-2xl overflow-hidden aspect-video bg-black relative border border-slate-800">
              <video 
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-white">Lecture Takeaway:</p>
              <p className="text-[11px] text-slate-400">{previewVideoLesson.summary}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Unlock all {totalLessons} lectures and capstone labs upon enrolling.
              </span>
              <button
                onClick={() => {
                  setPreviewVideoLesson(null);
                  onClose();
                  onEnroll(course);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CoursePreviewModal;
