import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Sparkles,
  ExternalLink,
  Globe
} from 'lucide-react';

const Footer = ({ onOpenModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Callout Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 border border-blue-900/50 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stay Ahead in Tech</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                Get weekly architecture deep dives & course drops
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Join 45,000+ engineers receiving our weekly curated breakdowns on modern system design, zero-day security, and AI research.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>You're in! Check your inbox for the System Design cheat sheet.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 shadow-md shadow-blue-500/20"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                Edu<span className="text-blue-500">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering engineers and tech professionals with verified masterclasses, live interactive streaming, and real-world hands-on project labs.
            </p>
            
            {/* Live Uptime Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* Column: Learning Tracks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Learning Tracks
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses?category=Security" className="hover:text-white transition-colors">Cyber Security</Link></li>
              <li><Link to="/courses?category=Development" className="hover:text-white transition-colors">Full-Stack React</Link></li>
              <li><Link to="/courses?category=AI" className="hover:text-white transition-colors">Applied Machine Learning</Link></li>
              <li><Link to="/courses?category=Data" className="hover:text-white transition-colors">Data Analytics</Link></li>
              <li><Link to="/courses?category=Cloud" className="hover:text-white transition-colors">Cloud Architecture</Link></li>
              <li><Link to="/courses?category=Design" className="hover:text-white transition-colors">UI/UX Systems</Link></li>
            </ul>
          </div>

          {/* Column: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Features
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/live-classes" className="hover:text-white transition-colors flex items-center gap-1.5"><span>Live Classrooms</span><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"/></Link></li>
              <li><Link to="/recorded-classes" className="hover:text-white transition-colors">Recorded Masterclasses</Link></li>
              <li><Link to="/take-test" className="hover:text-white transition-colors">Skill Assessments & Quizzes</Link></li>
              <li><button onClick={onOpenModal} className="hover:text-white transition-colors text-left">Fast-Track Enrollment</button></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Column: Resources & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Accreditation Standards</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Student Code of Conduct</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Security Disclosures</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EduPulse Interactive Technologies Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
