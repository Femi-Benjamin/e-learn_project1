import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockLiveSessions } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { 
  Video, 
  Send, 
  Users, 
  MessageSquare, 
  Hand, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Calendar, 
  Clock, 
  ThumbsUp, 
  Smile, 
  Radio,
  CheckCircle2,
  Bell
} from 'lucide-react';

export const LiveClasses = () => {
  const { showToast, currentUser } = useAuth();
  const [activeSession, setActiveSession] = useState(mockLiveSessions[0]);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'attendees' | 'qa'
  const [handRaised, setHandRaised] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [streamQuality, setStreamQuality] = useState('1080p');

  // Interactive Live Chat
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Sarah Jenkins", role: "TA", text: "Welcome everyone! Dr. Marcus Vance will begin the penetration testing lab shortly.", time: "10:01 AM", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" },
    { id: 2, sender: "Devon Miles", role: "Student", text: "Are the Wireshark sample .pcap files uploaded to the resource tab?", time: "10:02 AM", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
    { id: 3, sender: "Dr. Marcus Vance", role: "Instructor", text: "Yes Devon, check the lab repo in branch `live-demo-v1`!", time: "10:03 AM", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  // Attendees list
  const [attendees] = useState([
    { name: "Dr. Marcus Vance", role: "Host / Instructor", status: "Speaking", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    { name: "Sarah Jenkins", role: "Moderator", status: "Online", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" },
    { name: "Alex Morgan (You)", role: "Student", status: "Listening", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
    { name: "Elena Rostova", role: "Guest Speaker", status: "Online", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80" },
    { name: "Kenji Sato", role: "Student", status: "Listening", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" }
  ]);

  // Q&A Questions
  const [qaList, setQaList] = useState([
    { id: 1, author: "Kenji Sato", question: "How do zero-day mitigations differ when operating in multi-tenant Kubernetes clusters?", upvotes: 14, answered: true },
    { id: 2, author: "Maya Lin", question: "What is the computational overhead of continuous TLS inspection at line-rate 10Gbps?", upvotes: 9, answered: false }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: currentUser?.name || "Alex Morgan",
      role: "Student",
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');
  };

  const handleReaction = (emoji) => {
    const reactionMsg = {
      id: Date.now(),
      sender: currentUser?.name || "Alex Morgan",
      role: "Student",
      text: `reacted with ${emoji}`,
      isReaction: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: currentUser?.avatar
    };
    setChatMessages(prev => [...prev, reactionMsg]);
    showToast(`Sent reaction ${emoji}`, "info");
  };

  const handleToggleHand = () => {
    setHandRaised(!handRaised);
    if (!handRaised) {
      showToast("✋ Hand raised! Instructor will grant speaking privileges shortly.", "info");
    } else {
      showToast("Hand lowered.", "info");
    }
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setQaList(prev => [
      ...prev,
      {
        id: Date.now(),
        author: currentUser?.name || "Alex Morgan",
        question: newQuestionText.trim(),
        upvotes: 1,
        answered: false
      }
    ]);
    setNewQuestionText('');
    showToast("Question submitted to instructor queue!", "success");
  };

  const handleUpvoteQuestion = (id) => {
    setQaList(prev => prev.map(q => q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans flex flex-col justify-between">
      <Navbar />

      {/* Top Session Breadcrumb Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
            <span>LIVE SESSION</span>
          </div>
          <h1 className="font-heading font-bold text-sm sm:text-base text-white tracking-tight truncate max-w-md sm:max-w-xl">
            {activeSession.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>{activeSession.attendees + (chatMessages.length - 3)} live viewers</span>
          </div>

          <select
            value={streamQuality}
            onChange={(e) => setStreamQuality(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="1080p">1080p 60fps (HD)</option>
            <option value="720p">720p 60fps</option>
            <option value="480p">480p (Data Saver)</option>
          </select>
        </div>
      </div>

      {/* Main Studio View (Video Left, Chat/QA Right) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Video Stream Canvas (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Stream Player Viewport */}
            <div className="relative rounded-3xl bg-black border border-slate-800 shadow-2xl overflow-hidden aspect-video flex items-center justify-center group">
              
              {/* Background Screen Presentation */}
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80"
                alt="Live Classroom Slide"
                className="w-full h-full object-cover opacity-80"
              />

              {/* Picture-in-Picture Webcam of Instructor */}
              <div className="absolute top-4 right-4 w-32 sm:w-44 aspect-video rounded-2xl bg-slate-950 border-2 border-blue-500/80 shadow-2xl overflow-hidden z-20">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                  alt="Dr. Marcus Vance (Live Camera)"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Dr. Vance
                </div>
              </div>

              {/* Hand Raised Notification Banner inside screen */}
              {handRaised && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-lg animate-bounce">
                  <Hand className="w-4 h-4" />
                  <span>Your hand is raised! Waiting for host...</span>
                </div>
              )}

              {/* Bottom Stream Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-center justify-between text-xs text-white z-20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-white" />}
                  </button>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-mono text-xs text-slate-300">LIVE 00:42:18</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleHand}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      handRaised
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <Hand className="w-4 h-4" />
                    <span>{handRaised ? "Lower Hand" : "Raise Hand"}</span>
                  </button>

                  <button 
                    onClick={() => showToast("Full screen mode toggled", "info")}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Toggle fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Session Info Details Bar */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{activeSession.course}</span>
                  <h2 className="font-heading font-extrabold text-xl text-white mt-0.5">{activeSession.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <img src={activeSession.instructorAvatar} alt={activeSession.instructor} className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500" />
                  <div className="text-xs text-left">
                    <p className="font-bold text-white">{activeSession.instructor}</p>
                    <p className="text-[11px] text-slate-400">Lead Host</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{activeSession.topic}</p>
            </div>

            {/* Upcoming Masterclasses Schedule */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Upcoming Live Sessions</span>
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {mockLiveSessions.slice(1).map((session) => (
                  <div key={session.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {session.scheduledTime}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{session.duration}</span>
                    </div>

                    <h4 className="font-heading font-bold text-sm text-white line-clamp-1">{session.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{session.topic}</p>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                      <span className="text-slate-300 font-medium">{session.instructor}</span>
                      <button
                        onClick={() => showToast(`📅 Reminder set for ${session.title}`, "success")}
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Remind Me</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Real-Time Interactive Chat & Q&A Panel (4 cols) */}
          <div className="lg:col-span-4 h-[650px] flex flex-col rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
            
            {/* Panel Tabs */}
            <div className="p-2 bg-slate-900 border-b border-slate-800 grid grid-cols-3 gap-1">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'chat' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>

              <button
                onClick={() => setActiveTab('qa')}
                className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'qa' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Q&A ({qaList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('attendees')}
                className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'attendees' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>People</span>
              </button>
            </div>

            {/* TAB CONTENT: Live Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                
                {/* Scrollable messages container */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-2.5 text-xs">
                      <img src={msg.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} alt={msg.sender} className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{msg.sender}</span>
                          {msg.role === 'Instructor' && (
                            <span className="px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 text-[9px] font-bold">HOST</span>
                          )}
                          {msg.role === 'TA' && (
                            <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">TA</span>
                          )}
                          <span className="text-[10px] text-slate-500">{msg.time}</span>
                        </div>
                        <p className={`p-2.5 rounded-2xl leading-relaxed ${
                          msg.role === 'Instructor' ? 'bg-blue-950/70 border border-blue-800/80 text-blue-100' : 'bg-slate-900 text-slate-300'
                        }`}>
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Quick Emoji Reactions Bar */}
                <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">React</span>
                  <div className="flex items-center gap-2">
                    {['🔥', '👏', '❤️', '💡', '🚀'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(emoji)}
                        className="hover:scale-125 transition-transform text-sm p-1"
                        aria-label={`Send ${emoji} reaction`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Input Box */}
                <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Send message to live class..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    id="live-chat-input"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors shrink-0 shadow-xs"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            )}

            {/* TAB CONTENT: Q&A Tab */}
            {activeTab === 'qa' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 space-y-4">
                <div className="flex-1 overflow-y-auto space-y-3">
                  {qaList.map((qa) => (
                    <div key={qa.id} className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-300">{qa.author}</span>
                        {qa.answered ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                            <CheckCircle2 className="w-3 h-3" /> Answered
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-400 font-bold">In Queue</span>
                        )}
                      </div>
                      <p className="text-white font-medium">{qa.question}</p>
                      <div className="pt-1 flex items-center justify-end">
                        <button
                          onClick={() => handleUpvoteQuestion(qa.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{qa.upvotes}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddQuestion} className="space-y-2 pt-2 border-t border-slate-800">
                  <textarea
                    rows={2}
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Ask instructor a question..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Submit Question
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT: Attendees Drawer */}
            {activeTab === 'attendees' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Active Participants ({attendees.length})</p>
                {attendees.map((person, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={person.avatar} alt={person.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-white">{person.name}</p>
                        <p className="text-[10px] text-slate-400">{person.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                      {person.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LiveClasses;
