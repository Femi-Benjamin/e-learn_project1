import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CourseCard, { CourseCardSkeleton } from '../components/CourseCard';
import VideoSection from '../components/VideoSection';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';
import { CoursePreviewModal } from '../components/CoursePreviewModal';
import { PARTNERS_LIST } from '../components/CompanyLogos';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Users, 
  Award, 
  Code2, 
  Zap, 
  HelpCircle, 
  ChevronDown,
  BookOpen,
  Video,
  PlayCircle
} from 'lucide-react';

export const Home = () => {
  const { coursesList } = useAuth();
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState(null);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Only show the 3 featured courses on the homescreen (Security, Development, AI)
  const displayedCourses = coursesList.slice(0, 3);

  const handleOpenEnroll = (course = null) => {
    setSelectedCourseForEnroll(course);
    setIsEnrollModalOpen(true);
  };

  const handleOpenPreview = (course) => {
    setPreviewCourse(course);
  };

  const faqs = [
    {
      q: "Are the live classes recorded if I cannot make the schedule?",
      a: "Yes! Every single live lecture is recorded in high-definition (1080p 60fps) and made available in your student dashboard within 2 hours alongside transcripts, lecture slides, and starter code repositories."
    },
    {
      q: "Do I get a verified certificate upon completion?",
      a: "Absolutely. Once you finish the course milestones and score 80%+ on the final assessment quiz, you receive a cryptographically verified certificate that can be embedded directly into LinkedIn, GitHub, and resumes."
    },
    {
      q: "Can I switch courses after enrolling?",
      a: "Yes, we offer a 30-day flexibility guarantee. If you decide another career track fits your goals better, you can transfer your enrollment anytime with zero administrative fees."
    },
    {
      q: "Are instructors available for 1-on-1 questions?",
      a: "Yes. All students get access to weekly mentor office hours, live stream Q&A chat, and our private student Discord community with dedicated teaching assistants."
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white flex flex-col justify-between transition-colors">
      
      {/* Top Navigation */}
      <Navbar onOpenModal={() => handleOpenEnroll(null)} />

      {/* Hero Section */}
      <Hero onOpenModal={() => handleOpenEnroll(null)} />

      {/* Trust & Hiring Partners Infinite Marquee */}
      <section className="py-8 bg-white dark:bg-slate-950 border-y border-slate-200/80 dark:border-slate-800/80 overflow-hidden relative transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Trusted by engineers and alumni working at industry leaders
          </p>
        </div>

        {/* Marquee Wrapper with left/right gradient fade masks */}
        <div className="relative w-full overflow-hidden">
          {/* Left Fade Mask */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          
          {/* Right Fade Mask */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Continuous Running Marquee Container */}
          <div className="animate-marquee flex items-center gap-10 sm:gap-14 py-2">
            {PARTNERS_LIST.map((partner, index) => {
              const LogoComp = partner.Logo;
              return (
                <div 
                  key={`partner-1-${index}`}
                  className="flex items-center gap-2.5 sm:gap-3 shrink-0 px-3 py-1.5 rounded-2xl group cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
                  title={`${partner.name} - Hiring & Industry Partner`}
                >
                  <div className="p-1 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <LogoComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className={`text-lg sm:text-xl font-medium tracking-tight opacity-75 group-hover:opacity-100 transition-all ${partner.fontClass}`}>
                    {partner.name}
                  </span>
                </div>
              );
            })}

            {/* Duplicate set for seamless continuous marquee loop */}
            {PARTNERS_LIST.map((partner, index) => {
              const LogoComp = partner.Logo;
              return (
                <div 
                  key={`partner-2-${index}`}
                  className="flex items-center gap-2.5 sm:gap-3 shrink-0 px-3 py-1.5 rounded-2xl group cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
                  title={`${partner.name} - Hiring & Industry Partner`}
                >
                  <div className="p-1 rounded-lg transition-transform duration-300 group-hover:scale-110">
                    <LogoComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className={`text-lg sm:text-xl font-medium tracking-tight opacity-75 group-hover:opacity-100 transition-all ${partner.fontClass}`}>
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses Catalog Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        
        {/* Section Header & Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curated Career Tracks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore Industry-Leading Courses
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base">
              Learn practical, battle-tested software engineering, AI architecture, and cybersecurity skills.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:gap-3 transition-all shrink-0"
          >
            <span>View all {coursesList.length} courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" id="home-courses-skeletons-grid">
            {[1, 2, 3].map((idx) => (
              <CourseCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" id="home-courses-catalog-grid">
            {displayedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onOpenEnrollModal={handleOpenEnroll}
                onOpenPreviewModal={handleOpenPreview}
              />
            ))}
          </div>
        )}

        {/* Explore All CTA Button */}
        <div className="text-center pt-6">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-all"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* Interactive Video & Learning Tech Showcase */}
      <VideoSection />

      {/* Bento Grid: Why Learn on EduPulse */}
      <section className="py-20 bg-white dark:bg-slate-900/70 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>The EduPulse Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
              A complete ecosystem built for mastery
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base">
              Everything you need to go from fundamentals to deploying enterprise software.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Bento Card 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-4 hover:border-blue-400 dark:hover:border-blue-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                Interactive Live Classrooms
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Join live code teardowns, ask questions in real-time, and participate in breakout architecture design jams.
              </p>
              <Link to="/live-classes" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                <span>Explore Live Schedule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bento Card 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                Rich Recorded Library
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Take timed interactive notes, search speech transcripts, adjust playback speeds, and download starter code.
              </p>
              <Link to="/recorded-classes" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                <span>View Recorded Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bento Card 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-4 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                Skill Assessments & Tests
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Validate your knowledge with timed technical quizzes and generate certified completion diplomas.
              </p>
              <Link to="/take-test" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                <span>Take Assessment Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Stats Bar Row */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center border border-slate-800">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-blue-400">50k+</p>
              <p className="text-xs text-slate-400 font-medium">Graduated Students</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-emerald-400">94.8%</p>
              <p className="text-xs text-slate-400 font-medium">Completion Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-amber-400">4.9 / 5</p>
              <p className="text-xs text-slate-400 font-medium">Average Rating</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-sky-400">120+</p>
              <p className="text-xs text-slate-400 font-medium">Industry Mentors</p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Everything you need to know about our live classes, certificates, and student benefits.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-slate-900 dark:text-white text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Footer */}
      <Footer onOpenModal={() => handleOpenEnroll(null)} />

      {/* Enrollment Modal */}
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

export default Home;
