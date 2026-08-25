import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Search, 
  Star, 
  CheckCircle2, 
  Users, 
  Video, 
  TrendingUp,
  ShieldAlert,
  Code2,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  Award,
  Terminal
} from 'lucide-react';

const showcaseSlides = [
  {
    id: 'cybersec',
    filename: 'live-stream.session.ts',
    badgeText: 'BROADCASTING',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    pulseColor: 'bg-red-500',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    initials: 'MV',
    initialsBg: 'bg-blue-600',
    instructor: 'Dr. Marcus Vance',
    topic: 'Zero-Trust Penetration Testing',
    viewers: '342 online',
    stats: [
      { label: 'Modules', value: '48', color: 'text-blue-400' },
      { label: 'Hands-on', value: '100%', color: 'text-emerald-400' },
      { label: 'Rating', value: '4.9★', color: 'text-amber-400' }
    ],
    pill1: {
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'Career Advancement',
      desc: '92% average salary increase'
    },
    pill2: {
      icon: Code2,
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'Verified Certificate',
      desc: 'Industry Accredited'
    }
  },
  {
    id: 'ai-llm',
    filename: 'model_pipeline.py',
    badgeText: 'AI WORKSHOP',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    pulseColor: 'bg-purple-400',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    initials: 'ER',
    initialsBg: 'bg-purple-600',
    instructor: 'Elena Rostova',
    topic: 'Fine-Tuning Transformer LLMs & Agents',
    viewers: '528 online',
    stats: [
      { label: 'AI Models', value: '36', color: 'text-purple-400' },
      { label: 'GPU Labs', value: '100%', color: 'text-emerald-400' },
      { label: 'Rating', value: '5.0★', color: 'text-amber-400' }
    ],
    pill1: {
      icon: Cpu,
      iconBg: 'bg-purple-50 text-purple-600',
      title: 'H100 Cloud Compute',
      desc: 'Dedicated free lab clusters'
    },
    pill2: {
      icon: Sparkles,
      iconBg: 'bg-indigo-50 text-indigo-600',
      title: 'OpenAI & Google Hiring',
      desc: 'Direct partner referrals'
    }
  },
  {
    id: 'cloud-devops',
    filename: 'distributed-cluster.go',
    badgeText: 'INTERACTIVE LAB',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    pulseColor: 'bg-emerald-400',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    initials: 'SJ',
    initialsBg: 'bg-emerald-600',
    instructor: 'Sarah Jenkins',
    topic: 'Microservices & High-Scale Kubernetes',
    viewers: '419 online',
    stats: [
      { label: 'Projects', value: '52', color: 'text-emerald-400' },
      { label: 'Live Mentors', value: '24/7', color: 'text-sky-400' },
      { label: 'Rating', value: '4.9★', color: 'text-amber-400' }
    ],
    pill1: {
      icon: Terminal,
      iconBg: 'bg-teal-50 text-teal-600',
      title: 'Real Cloud Deployments',
      desc: 'Production AWS/GCP workloads'
    },
    pill2: {
      icon: Award,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'CNCF Certified',
      desc: 'Exam voucher included'
    }
  },
  {
    id: 'design-systems',
    filename: 'design-tokens.figma',
    badgeText: 'MASTERCLASS',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    pulseColor: 'bg-amber-400',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    initials: 'CD',
    initialsBg: 'bg-amber-600',
    instructor: 'Chloe Dupont',
    topic: 'Design Systems & Kinetic Web UI',
    viewers: '286 online',
    stats: [
      { label: 'Components', value: '600+', color: 'text-amber-400' },
      { label: 'Portfolio', value: '100%', color: 'text-emerald-400' },
      { label: 'Rating', value: '4.9★', color: 'text-amber-400' }
    ],
    pill1: {
      icon: Layers,
      iconBg: 'bg-amber-50 text-amber-600',
      title: 'Figma to React Code',
      desc: 'Automated token pipelines'
    },
    pill2: {
      icon: Star,
      iconBg: 'bg-rose-50 text-rose-600',
      title: 'Senior Portfolio Review',
      desc: '1-on-1 staff critiques'
    }
  }
];

const Hero = ({ onOpenModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Auto-scroll carousel timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % showcaseSlides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % showcaseSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length);
  };

  const currentSlide = showcaseSlides[currentSlideIndex];
  const Pill1Icon = currentSlide.pill1.icon;
  const Pill2Icon = currentSlide.pill2.icon;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100/50 dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e120_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e120_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#33415530_1px,transparent_1px),linear-gradient(to_bottom,#33415530_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Headline with Typewriter */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Accelerate your career in <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-300 inline-block">
                  <Typewriter
                    options={{
                      strings: [
                        'Cyber Security',
                        'Full-Stack React',
                        'Applied AI & LLMs',
                        'Cloud & DevOps',
                        'UI/UX Architecture'
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 40,
                      delay: 60,
                    }}
                  />
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Step into live interactive classrooms, build real-world portfolio projects, 
                and earn verified certifications mentored by chief engineers and industry specialists.
              </p>
            </div>

            {/* Search Input Filter */}
            <form 
              onSubmit={handleSearchSubmit} 
              className="max-w-xl mx-auto lg:mx-0 relative flex items-center shadow-lg shadow-slate-200/60 dark:shadow-black/50 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-1.5 sm:p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all"
            >
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 ml-2.5 sm:ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What skill do you want to master? (e.g. React, Security, AI)"
                className="w-full px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none bg-transparent"
                id="hero-course-search-input"
              />
              <button
                type="submit"
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                id="hero-search-submit-btn"
              >
                <span>Find Course</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </form>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenModal}
                id="hero-primary-enroll-btn"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-95 transition-all duration-150 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Explore All Tracks</span>
              </button>

              <button
                onClick={() => navigate('/live-classes')}
                id="hero-watch-live-btn"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow active:scale-95 transition-all duration-150 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/80 flex items-center justify-center text-red-600 dark:text-red-400">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Join Live Stream</span>
              </button>
            </div>

            {/* Trust Stats Stack */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80" alt="Student" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Student" />
                </div>
                <div>
                  <div className="flex items-center text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 ml-1">4.9/5</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">50,000+ Enrolled Students</p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero to Job-Ready Curriculum</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Interactive Showcase Card with Auto-Scroll */}
          <div 
            className="lg:col-span-5 relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none w-full">
              
              {/* Main Visual Card */}
              <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-slate-950/60 text-white border border-slate-800 relative overflow-hidden group transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
                
                {/* Header of Preview */}
                <div className="flex items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-slate-800 mb-3.5 sm:mb-5">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono text-slate-300 font-medium truncate ml-1">
                      {currentSlide.filename}
                    </span>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border shrink-0 ${currentSlide.badgeColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${currentSlide.pulseColor} animate-pulse`} />
                    {currentSlide.badgeText}
                  </span>
                </div>

                {/* Simulated Live Stream Preview Area */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video mb-3.5 sm:mb-5 flex items-center justify-center">
                  <img 
                    key={currentSlide.image}
                    src={currentSlide.image} 
                    alt={currentSlide.topic} 
                    className="w-full h-full object-cover opacity-70 animate-in fade-in zoom-in-95 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${currentSlide.initialsBg} flex items-center justify-center font-bold text-white text-[10px] sm:text-xs shadow-md shrink-0`}>
                        {currentSlide.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white text-xs sm:text-sm truncate leading-tight">{currentSlide.instructor}</p>
                        <p className="text-[10px] text-slate-300 truncate leading-tight">{currentSlide.topic}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-black/75 text-slate-300 text-[10px] font-mono shrink-0 whitespace-nowrap">
                      {currentSlide.viewers}
                    </span>
                  </div>
                </div>

                {/* Quick stats bottom row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2">
                  {currentSlide.stats.map((stat, i) => (
                    <div key={i} className="bg-slate-800/80 rounded-xl p-2 sm:p-3 border border-slate-700/60 text-center">
                      <p className={`text-base sm:text-xl font-bold font-heading ${stat.color}`}>{stat.value}</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-300 font-medium truncate">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Slide Carousel Navigation & Indicators */}
                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {showcaseSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          currentSlideIndex === idx
                            ? 'w-5 sm:w-6 bg-blue-500'
                            : 'w-1.5 sm:w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="text-[10px] sm:text-[11px] font-mono mr-1">
                      {currentSlideIndex + 1} / {showcaseSlides.length}
                    </span>
                    <button
                      onClick={handlePrevSlide}
                      className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Previous slide"
                      id="hero-prev-slide-btn"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      aria-label="Next slide"
                      id="hero-next-slide-btn"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating Pill 1 (Bottom Left) */}
              <div className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-900 rounded-2xl p-3.5 shadow-xl dark:shadow-black/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-float hidden sm:flex transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl ${currentSlide.pill1.iconBg} dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0`}>
                  <Pill1Icon className="w-5 h-5 text-current" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{currentSlide.pill1.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{currentSlide.pill1.desc}</p>
                </div>
              </div>

              {/* Floating Pill 2 (Top Right) */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-xl dark:shadow-black/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 hidden sm:flex transition-all duration-300">
                <div className={`w-8 h-8 rounded-lg ${currentSlide.pill2.iconBg} dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center`}>
                  <Pill2Icon className="w-4 h-4 text-current" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-white">{currentSlide.pill2.title}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{currentSlide.pill2.desc}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
