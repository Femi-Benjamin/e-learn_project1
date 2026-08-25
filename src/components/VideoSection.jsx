import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2,
  Code, 
  Cpu, 
  Terminal, 
  MessageSquare, 
  Award,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  FastForward,
  Layers,
  Check,
  Radio,
  Sliders
} from 'lucide-react';

const videoFeatures = [
  {
    id: 'sandbox',
    icon: Terminal,
    title: 'Interactive Code Sandbox',
    desc: 'Execute real cloud code alongside video lectures without configuring local environments.',
    highlight: 'Built-in Linux terminal, node runtime & Docker support',
    streamName: 'cloud-sandbox-runtime.session.ts',
    badgeText: 'LIVE RUNTIME',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    quality: 'HD 1080p 60fps',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
    durationSeconds: 1240, // 20:40
    instructor: 'Alex Morgan • Principal DevOps Lead',
    command: 'curl -X POST https://api.elearn.internal/v1/sandbox/deploy',
    logs: '[SUCCESS] Docker container initialized in 142ms. Terminal connection established on port 8080.',
    accentColor: 'from-emerald-500/20 to-blue-500/20'
  },
  {
    id: 'ai-tutor',
    icon: Cpu,
    title: 'Real-Time AI Code Assistant',
    desc: 'Instant debugging hints, line-by-line code explanation, and intelligent code review.',
    highlight: 'Available 24/7 inside your interactive editor',
    streamName: 'gemini-copilot-debugger.py',
    badgeText: 'AI COGNITIVE AGENT',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    quality: '4K Ultra HD',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80',
    durationSeconds: 875, // 14:35
    instructor: 'Elena Rostova • AI Research Scientist',
    command: 'ai-copilot --inspect --trace ./src/core/neural_indexer.ts',
    logs: '[ANALYSIS] Memory leak detected at line 142: unbounded cache allocation. Suggested fix applied automatically.',
    accentColor: 'from-purple-500/20 to-indigo-500/20'
  },
  {
    id: 'mentorship',
    icon: MessageSquare,
    title: 'Live 1-on-1 Office Hours',
    desc: 'Direct screen sharing and architectural teardowns with senior principal engineers.',
    highlight: 'Book weekly mentor slots anytime',
    streamName: 'webrtc-mentor-session.live',
    badgeText: '1-ON-1 STREAM',
    badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    quality: '1080p Low Latency',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80',
    durationSeconds: 1800, // 30:00
    instructor: 'Dr. Marcus Vance • VP Architecture',
    command: 'webrtc-connect --room=arch-teardown-802 --token=SEC_LIVE_OK',
    logs: '[CONNECTED] Audio/Video streams synchronized. Screen share active with Marcus Vance (Principal Architect).',
    accentColor: 'from-sky-500/20 to-blue-500/20'
  },
  {
    id: 'certification',
    icon: Award,
    title: 'Industry-Recognized Credentials',
    desc: 'Prove your proficiency with cryptographically verifiable certificates for LinkedIn & resumes.',
    highlight: 'Endorsed by leading tech hiring partners',
    streamName: 'cryptographic-credential.sol',
    badgeText: 'VERIFIED DIPLOMA',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    quality: 'HD 1080p Secure',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80',
    durationSeconds: 615, // 10:15
    instructor: 'Sarah Jenkins • Technical Director',
    command: 'creds-verify --hash=0x9b4f28e8201a7d6 --issuer=EduPulseOrg',
    logs: '[VALIDATED] Cryptographic signature verified against Ethereum ledger block #1948201. Issued to Active Graduate.',
    accentColor: 'from-amber-500/20 to-orange-500/20'
  }
];

const VideoSection = () => {
  const [activeFeatureId, setActiveFeatureId] = useState('sandbox');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(255); // 04:15
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const playerContainerRef = useRef(null);
  const progressRef = useRef(null);

  const activeFeature = videoFeatures.find(f => f.id === activeFeatureId) || videoFeatures[0];

  // Playback timer simulation
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec(prev => {
          if (prev >= activeFeature.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, activeFeature.durationSeconds]);

  // When user switches video, reset playback state smoothly
  const handleSelectFeature = (id) => {
    setActiveFeatureId(id);
    const newFeat = videoFeatures.find(f => f.id === id);
    if (newFeat) {
      // Start around 20% into new video to demonstrate active playback
      setCurrentTimeSec(Math.floor(newFeat.durationSeconds * 0.18));
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    const total = Math.floor(seconds);
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    setCurrentTimeSec(Math.floor(percentage * activeFeature.durationSeconds));
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const progressPercentage = Math.min(
    100,
    (currentTimeSec / activeFeature.durationSeconds) * 100
  );

  return (
    <section className="py-12 sm:py-20 bg-slate-900 text-white relative overflow-hidden" id="interactive-video-section">
      {/* Dynamic Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Next-Generation Learning Tech</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Designed for how modern engineers <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 font-black">actually learn</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Say goodbye to passive video watching. Select any technology module below to interact with live code execution, real-world simulations, and instant feedback.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 items-start lg:items-center">
          
          {/* Left Column: Fully Interactive Video Player */}
          <div className="lg:col-span-7 w-full" ref={playerContainerRef}>
            <div className="relative rounded-2xl sm:rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden group transition-all duration-300">
              
              {/* Window Titlebar */}
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between z-20 relative">
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden min-w-0 pr-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90 shrink-0" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/90 shrink-0" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/90 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-mono text-slate-300 ml-1.5 truncate font-medium max-w-[140px] sm:max-w-xs">
                    {activeFeature.streamName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-3 text-xs shrink-0">
                  <span className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border ${activeFeature.badgeColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
                    <span className="truncate">{activeFeature.badgeText}</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 hidden xs:inline">
                    {activeFeature.quality}
                  </span>
                </div>
              </div>

              {/* Video Surface */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden select-none">
                {/* Background Video Poster with smooth transition */}
                <img
                  key={activeFeature.image}
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isPlaying ? 'opacity-85 scale-105 filter saturate-110' : 'opacity-65 scale-100'
                  }`}
                />
                
                {/* Visual Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

                {/* Top Overlay details */}
                <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex items-center justify-between text-xs text-white pointer-events-none z-10">
                  <div className="bg-black/70 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-white/10 flex items-center gap-1.5 sm:gap-2 max-w-[85%]">
                    <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400 animate-pulse shrink-0" />
                    <span className="font-medium text-slate-200 text-[10px] sm:text-[11px] truncate">{activeFeature.instructor}</span>
                  </div>
                </div>

                {/* PERFECTLY CENTERED PLAY / PAUSE BUTTON */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="pointer-events-auto w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 border border-blue-400/40 backdrop-blur-md hover:scale-110 active:scale-90 transition-all duration-200 group-hover:shadow-blue-500/80 cursor-pointer"
                    aria-label={isPlaying ? "Pause stream video" : "Play stream video"}
                    id="center-play-button"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-9 sm:h-9 fill-white text-white ml-0.5 sm:ml-1.5 drop-shadow" />
                    )}
                  </button>
                </div>

                {/* Video controls bottom bar */}
                <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-4 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col gap-1.5 sm:gap-2.5 text-xs text-slate-300 z-20">
                  
                  {/* Interactive Scrub Bar with generous touch target */}
                  <div 
                    ref={progressRef}
                    onClick={handleProgressBarClick}
                    className="w-full py-1 -my-1 cursor-pointer group/scrub"
                  >
                    <div className="w-full h-1.5 sm:h-2 bg-slate-700/80 group-hover/scrub:h-2.5 rounded-full relative overflow-hidden transition-all">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full relative"
                        style={{ width: `${progressPercentage}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full shadow-md scale-0 group-hover/scrub:scale-100 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-1.5 sm:gap-3">
                      {/* Play/Pause icon button */}
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-1.5 sm:p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />}
                      </button>

                      {/* Restart video */}
                      <button 
                        onClick={() => { setCurrentTimeSec(0); setIsPlaying(true); }}
                        className="p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                        title="Replay from start"
                        aria-label="Restart video"
                      >
                        <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>

                      {/* Volume controls */}
                      <div className="flex items-center gap-1.5 sm:gap-2 group/vol">
                        <button 
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-1.5 rounded-lg hover:bg-slate-800/80 text-slate-300 hover:text-white transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                          aria-label="Toggle mute"
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => {
                            setVolume(parseFloat(e.target.value));
                            if (isMuted) setIsMuted(false);
                          }}
                          className="w-12 sm:w-16 h-1.5 accent-blue-500 bg-slate-700 rounded-lg cursor-pointer hidden md:block opacity-70 group-hover/vol:opacity-100 transition-opacity"
                        />
                      </div>

                      {/* Time display */}
                      <span className="font-mono text-[10px] sm:text-[11px] text-slate-300 tracking-wider">
                        {formatTime(currentTimeSec)} / {formatTime(activeFeature.durationSeconds)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 relative">
                      {/* Playback Speed selector */}
                      <div className="relative">
                        <button 
                          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                          className="px-2 sm:px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-[10px] sm:text-[11px] font-mono text-slate-200 border border-slate-700/80 transition-colors flex items-center gap-0.5 sm:gap-1 cursor-pointer min-h-[30px]"
                          aria-label="Playback speed"
                        >
                          <span>{playbackSpeed}x</span>
                        </button>

                        {showSpeedMenu && (
                          <div className="absolute bottom-full right-0 mb-2 py-1.5 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-30 min-w-[85px] flex flex-col">
                            {[0.75, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                              <button
                                key={speed}
                                onClick={() => {
                                  setPlaybackSpeed(speed);
                                  setShowSpeedMenu(false);
                                }}
                                className={`px-3 py-1.5 text-[11px] font-mono text-left flex items-center justify-between hover:bg-slate-800 ${
                                  playbackSpeed === speed ? 'text-blue-400 font-bold bg-blue-500/10' : 'text-slate-300'
                                }`}
                              >
                                <span>{speed}x</span>
                                {playbackSpeed === speed && <Check className="w-3 h-3 text-blue-400" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Fullscreen Button */}
                      <button 
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center" 
                        aria-label="Toggle Fullscreen"
                      >
                        {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time terminal output simulator dynamically mapped to current video */}
              <div className="p-3 sm:p-4 bg-slate-950 font-mono text-[11px] sm:text-xs text-slate-300 border-t border-slate-800/80 space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 min-w-0">
                    <span className="font-bold shrink-0">❯</span>
                    <span className="truncate text-[10px] sm:text-xs">{activeFeature.command}</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                    CONNECTED
                  </span>
                </div>
                <div className="text-slate-400 text-[10px] sm:text-[11px] leading-relaxed break-words">
                  {activeFeature.logs}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Dynamic Feature Selector List */}
          <div className="lg:col-span-5 space-y-2.5 sm:space-y-3.5 w-full">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Interactive Video Module
              </p>
              <span className="text-[10px] text-slate-500 sm:hidden">Tap to switch</span>
            </div>

            {videoFeatures.map((feat) => {
              const active = activeFeatureId === feat.id;
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => handleSelectFeature(feat.id)}
                  className={`p-3.5 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 border relative group touch-manipulation ${
                    active 
                      ? 'bg-slate-800/95 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/40 lg:translate-x-1' 
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700 active:bg-slate-800/90'
                  }`}
                  id={`feature-card-${feat.id}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2.5 sm:p-3 rounded-xl transition-colors shrink-0 ${
                      active 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                        : 'bg-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700'
                    }`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`font-heading font-bold text-sm sm:text-base truncate ${active ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                          {feat.title}
                        </h3>
                        {active && (
                          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                            Active Stream
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {feat.desc}
                      </p>
                      {active && (
                        <div className="pt-1.5 sm:pt-2 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-blue-400 animate-in fade-in duration-300">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{feat.highlight}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoSection;
