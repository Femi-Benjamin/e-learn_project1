import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockRecordedLessons } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { 
  PlayCircle, 
  BookOpen, 
  Download, 
  FileText, 
  Search, 
  Clock, 
  Eye, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  ArrowRight,
  ListVideo,
  Settings,
  ChevronRight,
  FileCode
} from 'lucide-react';

export const RecordedClasses = () => {
  const { showToast } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(mockRecordedLessons[0]);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'transcript' | 'resources'
  
  // Note-taking state with persistence per lesson
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem(`elearn_notes_${selectedLesson.id}`) || 
`## ${selectedLesson.title}
Key Takeaways:
- STRIDE threat categorization: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege.
- Zero-trust principle: Never trust, always verify every ingress network packet.`;
  });

  const [transcriptSearch, setTranscriptSearch] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem(`elearn_notes_${selectedLesson.id}`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes(`## Notes for: ${selectedLesson.title}\n\n- Key points:\n- Questions for mentor:\n- Implementation checklist:`);
    }
  }, [selectedLesson]);

  const handleSaveNotes = () => {
    localStorage.setItem(`elearn_notes_${selectedLesson.id}`, notes);
    showToast("Notes saved to local storage!", "success");
  };

  const handleDownloadNotes = () => {
    const element = document.createElement("a");
    const file = new Blob([notes], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedLesson.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast("Notes downloaded as text file!", "info");
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans flex flex-col justify-between transition-colors">
      <Navbar />

      {/* Header bar */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <ListVideo className="w-4 h-4" />
              <span>On-Demand Masterclass Library</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
              {selectedLesson.title}
            </h1>
            <p className="text-xs text-slate-400">{selectedLesson.course} • Mentored by {selectedLesson.instructor}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedLesson.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main LMS Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Player & Interactive Tab Panels (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* HTML5 Video Player Container */}
            <div className="relative rounded-3xl bg-black border border-slate-200/80 dark:border-slate-800 shadow-soft-lg overflow-hidden aspect-video">
              <video
                key={selectedLesson.videoUrl}
                controls
                playsInline
                poster={selectedLesson.thumbnail}
                className="w-full h-full object-cover"
                id="recorded-video-player"
              >
                <source src={selectedLesson.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Quick Action Bar under player */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs transition-colors">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="font-bold text-slate-700 dark:text-slate-300">Playback Speed:</span>
                {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => {
                      setPlaybackSpeed(spd);
                      const vid = document.getElementById('recorded-video-player');
                      if (vid) vid.playbackRate = spd;
                    }}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all ${
                      playbackSpeed === spd 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast("Marked as Completed! +50 XP", "success")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors border border-emerald-200 dark:border-emerald-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </button>
              </div>
            </div>

            {/* Interactive Workspace Tabs (Notes / Transcript / Resources) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden transition-colors">
              
              {/* Tab Header */}
              <div className="border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 pt-4 flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
                    activeTab === 'notes'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Interactive Notes</span>
                </button>

                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`pb-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
                    activeTab === 'transcript'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Searchable Transcript</span>
                </button>

                <button
                  onClick={() => setActiveTab('resources')}
                  className={`pb-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
                    activeTab === 'resources'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Resources & Code</span>
                </button>
              </div>

              {/* Tab Body */}
              <div className="p-4 sm:p-6">
                
                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Auto-saves to browser memory</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSaveNotes}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/70 text-xs font-bold transition-colors border border-blue-200 dark:border-blue-800"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Note</span>
                        </button>
                        <button
                          onClick={handleDownloadNotes}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-700"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export .txt</span>
                        </button>
                      </div>
                    </div>

                    <textarea
                      rows={8}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Write your study notes and code snippets here..."
                      className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
                    />
                  </div>
                )}

                {/* Transcript Tab */}
                {activeTab === 'transcript' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={transcriptSearch}
                      onChange={(e) => setTranscriptSearch(e.target.value)}
                      placeholder="Search within speech transcript..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-h-60 overflow-y-auto">
                      {selectedLesson.transcript}
                    </div>
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Download starter materials and cheat sheets for this lesson:</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {selectedLesson.resources?.map((res, i) => (
                        <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <FileCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <div>
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px]">{res.name}</p>
                              <p className="text-[10px] text-slate-400">{res.size}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => showToast(`Downloaded ${res.name}`, "info")}
                            className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                            aria-label="Download resource file"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Right Column: Playlist & Lessons Navigator (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft p-5 space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Course Playlist ({mockRecordedLessons.length})
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">100% On-Demand</span>
            </div>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {mockRecordedLessons.map((lesson, idx) => {
                const isActive = lesson.id === selectedLesson.id;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                      isActive
                        ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-500 shadow-xs'
                        : 'bg-slate-50/70 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {idx + 1}
                      </div>

                      <div className="space-y-1 flex-1">
                        <h4 className={`text-xs font-bold leading-tight ${isActive ? 'text-blue-900 dark:text-blue-300' : 'text-slate-800 dark:text-slate-200'}`}>
                          {lesson.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {lesson.duration}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">{lesson.uploadedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-blue-950 text-white text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Ready to test your knowledge?</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Take the certification assessment to earn your completion badge.
                </p>
                <a
                  href="/take-test"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-300 hover:text-white underline pt-1"
                >
                  <span>Go to Assessment Portal</span>
                  <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecordedClasses;
