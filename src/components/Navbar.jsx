import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Video, 
  PlayCircle, 
  FileCheck, 
  LayoutDashboard, 
  BookOpen, 
  Menu, 
  X, 
  Sparkles,
  ShieldCheck,
  LogOut,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Code2,
  Cloud,
  Cpu,
  ShieldAlert,
  Compass,
  Laptop
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [learningDropdownOpen, setLearningDropdownOpen] = useState(false);

  const coursesDropdownRef = useRef(null);
  const learningDropdownRef = useRef(null);

  const location = useLocation();
  const { 
    isAdmin, 
    logoutAdmin, 
    theme,
    toggleTheme 
  } = useAuth();

  const isDark = theme === 'dark';

  // Close dropdowns on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setCoursesDropdownOpen(false);
    setLearningDropdownOpen(false);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coursesDropdownRef.current && !coursesDropdownRef.current.contains(event.target)) {
        setCoursesDropdownOpen(false);
      }
      if (learningDropdownRef.current && !learningDropdownRef.current.contains(event.target)) {
        setLearningDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const courseCategories = [
    {
      title: 'Web & Full-Stack Engineering',
      desc: 'React 18, TypeScript, Node.js & Cloud Deployments',
      icon: Code2,
      category: 'Development',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800'
    },
    {
      title: 'Cloud Architecture & DevOps',
      desc: 'Kubernetes, AWS/GCP, Docker & CI/CD Pipelines',
      icon: Cloud,
      category: 'Cloud & DevOps',
      color: 'text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800'
    },
    {
      title: 'AI & Machine Learning Systems',
      desc: 'LLMs, PyTorch, Neural Nets & Agentic Pipelines',
      icon: Cpu,
      category: 'AI & ML',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800'
    },
    {
      title: 'Cybersecurity & Defense',
      desc: 'Ethical Hacking, Penetration Testing & Zero-Trust',
      icon: ShieldAlert,
      category: 'Security',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800'
    }
  ];

  const learningPrograms = [
    {
      title: 'Live Interactive Classes',
      desc: 'Live code teardowns, real-time instructor Q&A & live chat',
      path: '/live-classes',
      icon: Video,
      badge: 'LIVE',
      badgeColor: 'bg-red-600 text-white font-black',
      color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/80 border border-red-200 dark:border-red-800'
    },
    {
      title: 'Recorded Video Archive',
      desc: 'High-definition video library with searchable transcripts',
      path: '/recorded-classes',
      icon: PlayCircle,
      badge: 'Self-Paced',
      badgeColor: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 font-bold border border-indigo-200 dark:border-indigo-800',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800'
    },
    {
      title: 'Skill Assessment & Quizzes',
      desc: 'Timed technical evaluation tests with verified diplomas',
      path: '/take-test',
      icon: FileCheck,
      badge: 'Certified',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-200 dark:border-emerald-800',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800'
    }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-5 min-h-[80px] sm:min-h-[88px]">
            
            {/* Left Brand Identity */}
            <div className="flex items-center gap-8">
              <Link 
                to="/" 
                className="flex items-center gap-3 group focus:outline-none shrink-0"
                id="brand-logo-link"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Edu<span className="text-blue-600 dark:text-blue-400">Pulse</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 -mt-0.5 hidden xs:block">
                    Engineering Academy
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-2">
                
                {/* Home */}
                <Link
                  to="/"
                  id="nav-link-home"
                  className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                    location.pathname === '/'
                      ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Home
                </Link>

                {/* Courses Dropdown */}
                <div 
                  ref={coursesDropdownRef} 
                  className="relative"
                  onMouseEnter={() => setCoursesDropdownOpen(true)}
                  onMouseLeave={() => setCoursesDropdownOpen(false)}
                >
                  <button
                    onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                    id="nav-dropdown-courses-btn"
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      isActive('/courses') || coursesDropdownOpen
                        ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                        : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    aria-expanded={coursesDropdownOpen}
                  >
                    <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Courses</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${coursesDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-500'}`} />
                  </button>

                  {coursesDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-96 animate-in fade-in-0 zoom-in-95 duration-150 z-50">
                      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2.5 space-y-1">
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Specialized Tracks
                          </p>
                        </div>

                        <div className="space-y-1 pt-1">
                          {courseCategories.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={idx}
                                to={`/courses?category=${encodeURIComponent(item.category)}`}
                                onClick={() => setCoursesDropdownOpen(false)}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                              >
                                <div className={`p-2 rounded-lg shrink-0 ${item.color}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5">
                                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                          <Link
                            to="/courses"
                            onClick={() => setCoursesDropdownOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-bold transition-colors border border-blue-200/60 dark:border-blue-800/60"
                          >
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" />
                              Browse Full Course Catalog
                            </span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Live Classes Link */}
                <Link
                  to="/live-classes"
                  id="nav-link-live-classes"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive('/live-classes')
                      ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                  </span>
                  <span>Live Classes</span>
                </Link>

                {/* Learning Hub Dropdown (Recorded + Tests) */}
                <div 
                  ref={learningDropdownRef} 
                  className="relative"
                  onMouseEnter={() => setLearningDropdownOpen(true)}
                  onMouseLeave={() => setLearningDropdownOpen(false)}
                >
                  <button
                    onClick={() => setLearningDropdownOpen(!learningDropdownOpen)}
                    id="nav-dropdown-learning-btn"
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      isActive('/recorded-classes') || isActive('/take-test') || learningDropdownOpen
                        ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                        : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    aria-expanded={learningDropdownOpen}
                  >
                    <Laptop className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Learning Hub</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${learningDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-500'}`} />
                  </button>

                  {learningDropdownOpen && (
                    <div className="absolute top-full left-0 pt-2 w-88 animate-in fade-in-0 zoom-in-95 duration-150 z-50">
                      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 space-y-1">
                        {learningPrograms.map((prog, idx) => {
                          const Icon = prog.icon;
                          return (
                            <Link
                              key={idx}
                              to={prog.path}
                              onClick={() => setLearningDropdownOpen(false)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                            >
                              <div className={`p-2 rounded-lg shrink-0 ${prog.color}`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {prog.title}
                                  </p>
                                  {prog.badge && (
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${prog.badgeColor}`}>
                                      {prog.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                                  {prog.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Action Controls (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                id="desktop-theme-toggle-btn"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700"
              >
                {isDark ? (
                  <Sun className="w-4.5 h-4.5 text-amber-400" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-indigo-600" />
                )}
              </button>

              {/* Admin Portal Status or Link */}
              {isAdmin ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/admin"
                    id="admin-dashboard-nav-btn"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-colors shadow-2xs"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Admin</span>
                  </Link>
                  <button
                    onClick={logoutAdmin}
                    title="Logout Admin"
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer border border-transparent hover:border-rose-200 dark:hover:border-rose-800"
                    aria-label="Logout Admin"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  id="admin-login-nav-btn"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Admin</span>
                </Link>
              )}

              {/* Enroll CTA */}
              <button
                onClick={onOpenModal}
                id="header-enroll-btn"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-md shadow-blue-500/25 transition-all duration-150 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enroll Now</span>
              </button>
            </div>

            {/* Mobile Actions: Theme + Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                id="mobile-theme-toggle-btn"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                id="mobile-menu-toggle-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu with 100% Solid Background & High Legibility */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 relative z-50">
            
            <div className="space-y-2">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold border transition-colors ${
                  location.pathname === '/' 
                    ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800 shadow-xs' 
                    : 'text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-base font-bold">Home</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* All Courses */}
              <Link
                to="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold border transition-colors ${
                  isActive('/courses') 
                    ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800 shadow-xs' 
                    : 'text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-bold block">All Courses</span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Engineering Tracks & Bootcamps</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Live Classes */}
              <Link
                to="/live-classes"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold border transition-colors ${
                  isActive('/live-classes') 
                    ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800 shadow-xs' 
                    : 'text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/60 flex items-center justify-center text-red-600 dark:text-red-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-bold block">Live Classes</span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Interactive Mentor Workshops</span>
                  </div>
                </div>
                <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-red-600 text-white uppercase shadow-xs">
                  LIVE
                </span>
              </Link>

              {/* Recorded Archive */}
              <Link
                to="/recorded-classes"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold border transition-colors ${
                  isActive('/recorded-classes') 
                    ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800 shadow-xs' 
                    : 'text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <PlayCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-bold block">Recorded Archive</span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Self-Paced HD Video Library</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              {/* Skill Assessment */}
              <Link
                to="/take-test"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold border transition-colors ${
                  isActive('/take-test') 
                    ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800 shadow-xs' 
                    : 'text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-base font-bold block">Skill Assessment</span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Quizzes & Verified Certificates</span>
                  </div>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 uppercase">
                  QUIZ
                </span>
              </Link>
            </div>

            {/* Mobile Footer Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
              {isAdmin ? (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 shadow-2xs">
                  <Link 
                    to="/admin" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-extrabold text-emerald-800 dark:text-emerald-200"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Admin Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      logoutAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline px-2 py-1"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>Admin Portal Access</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 active:scale-98 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in a Course</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Dimmed backdrop when mobile menu is open to ensure zero background interference */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
