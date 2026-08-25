import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockQuestions } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { 
  FileCheck, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Flag, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck,
  Download,
  Printer
} from 'lucide-react';

export const TakeTest = () => {
  const { currentUser, saveTestResult, showToast } = useAuth();
  
  // Test State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showCertificate, setShowCertificate] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const currentQ = mockQuestions[currentQuestionIndex];

  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const toggleFlag = (index) => {
    setFlaggedQuestions(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const calculateScore = () => {
    let score = 0;
    mockQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    const percentage = Math.round((score / mockQuestions.length) * 100);

    saveTestResult({
      score,
      total: mockQuestions.length,
      percentage,
      passed: percentage >= 70
    });

    if (percentage >= 70) {
      showToast(`🏆 Congratulations! You scored ${percentage}% and earned a certificate!`, "success");
    } else {
      showToast(`Assessment submitted. Score: ${percentage}%. You can retake to improve!`, "info");
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions([]);
    setIsSubmitted(false);
    setTimeLeft(300);
    setCurrentQuestionIndex(0);
    setShowCertificate(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const score = calculateScore();
  const percentage = Math.round((score / mockQuestions.length) * 100);
  const passed = percentage >= 70;

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans flex flex-col justify-between transition-colors">
      <Navbar />

      {/* Header bar with Timer & Progress */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white py-4 sm:py-5 px-4 sm:px-6 lg:px-8 border-b border-slate-800 sticky top-16 sm:top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-heading font-bold text-white tracking-tight line-clamp-1">
                Full-Stack & Cloud Architecture Assessment
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400">Timed technical certification exam</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Timer countdown pill */}
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold border ${
                timeLeft < 60 
                  ? 'bg-rose-950/80 border-rose-600 text-rose-400 animate-pulse' 
                  : 'bg-slate-800 border-slate-700 text-amber-400'
              }`}>
                <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}

            {!isSubmitted ? (
              <button
                onClick={handleSubmitTest}
                className="px-4 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Quiz Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1">
        
        {/* If Submitted: Result Scorecard & Certificate Trigger */}
        {isSubmitted && (
          <div className="mb-8 sm:mb-10 p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6 transition-colors">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Exam Evaluation Complete</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-slate-900 dark:text-white">
                  {passed ? "🎉 Congratulations! You Passed the Exam" : "Assessment Complete - Review Your Answers"}
                </h2>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  {passed 
                    ? `Outstanding work, ${currentUser?.name || "Student"}! You answered ${score} out of ${mockQuestions.length} questions correctly (${percentage}%). Your certified diploma has been generated.`
                    : `You answered ${score} out of ${mockQuestions.length} questions correctly (${percentage}%). A score of 70% or higher is required to receive the verified credential.`
                  }
                </p>

                {passed && (
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setShowCertificate(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>View & Print Official Certificate</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-center space-y-1">
                  <p className="text-4xl sm:text-5xl font-heading font-black text-blue-600 dark:text-blue-400">
                    {percentage}%
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Final Score ({score}/{mockQuestions.length})
                  </p>
                </div>
                <span className={`mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                  passed ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                }`}>
                  {passed ? 'PASSED & CERTIFIED' : 'REQUIRES RETAKE'}
                </span>
              </div>

            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Active Question & Options (8 cols) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft p-5 sm:p-8 space-y-6 transition-colors">
            
            {/* Question Header & Flag toggle */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  Question {currentQuestionIndex + 1} of {mockQuestions.length}
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  • {currentQ.category}
                </span>
              </div>

              <button
                onClick={() => toggleFlag(currentQuestionIndex)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  flaggedQuestions.includes(currentQuestionIndex)
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${flaggedQuestions.includes(currentQuestionIndex) ? 'fill-current' : ''}`} />
                <span>{flaggedQuestions.includes(currentQuestionIndex) ? 'Flagged' : 'Flag for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <h3 className="font-heading font-bold text-base sm:text-xl text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((opt, optIndex) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIndex;
                const isCorrect = isSubmitted && optIndex === currentQ.correctAnswer;
                const isWrongSelected = isSubmitted && isSelected && !isCorrect;

                let optionClass = 'bg-slate-50 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

                if (isSubmitted) {
                  if (isCorrect) {
                    optionClass = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isWrongSelected) {
                    optionClass = 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-900 dark:text-rose-200';
                  }
                } else if (isSelected) {
                  optionClass = 'bg-blue-50 dark:bg-blue-950/70 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-200 font-bold shadow-xs';
                }

                return (
                  <button
                    key={optIndex}
                    onClick={() => handleSelectOption(optIndex)}
                    disabled={isSubmitted}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${optionClass}`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed flex-1">{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                    {isSubmitted && isWrongSelected && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Post-submission explanation box */}
            {isSubmitted && currentQ.explanation && (
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Technical Explanation:</span>
                </p>
                <p className="leading-relaxed text-slate-700 dark:text-slate-300">{currentQ.explanation}</p>
              </div>
            )}

            {/* Next / Prev Navigation */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => setCurrentQuestionIndex(prev => Math.min(mockQuestions.length - 1, prev + 1))}
                disabled={currentQuestionIndex === mockQuestions.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Question Grid Matrix (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-soft p-5 sm:p-6 space-y-5 transition-colors">
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                Question Navigator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Jump directly to any problem</p>
            </div>

            {/* Grid of numbers */}
            <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
              {mockQuestions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isFlagged = flaggedQuestions.includes(idx);
                const isCurrent = currentQuestionIndex === idx;

                let btnStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';
                if (isCurrent) {
                  btnStyle = 'ring-2 ring-blue-600 font-bold bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-300';
                } else if (isAnswered) {
                  btnStyle = 'bg-blue-600 text-white font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 sm:h-11 rounded-xl flex flex-col items-center justify-center text-xs transition-all relative cursor-pointer ${btnStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-600" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700" />
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 ml-0.5" />
                <span>Flagged for Review</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 sm:p-12 border-4 sm:border-8 border-double border-blue-900 dark:border-blue-700 text-center space-y-5 sm:space-y-6">
            
            {/* Certificate Header */}
            <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
              <Award className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="space-y-1">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">EduPulse Institute of Technology</p>
              <h2 className="font-heading font-black text-xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                CERTIFICATE OF ACHIEVEMENT
              </h2>
              <p className="text-xs text-slate-400 font-serif italic">This verified document is proudly presented to</p>
            </div>

            {/* Student Name Display */}
            <div className="py-2 border-b-2 border-slate-200 dark:border-slate-700 max-w-md mx-auto">
              <h3 className="font-heading font-extrabold text-xl sm:text-3xl text-blue-700 dark:text-blue-400">
                {currentUser?.name || "Alex Morgan"}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              for successfully passing the comprehensive examination in <strong className="text-slate-900 dark:text-white">Full-Stack & Cloud Architecture</strong> with a certified score of <strong className="text-blue-600 dark:text-blue-400">{percentage}%</strong>.
            </p>

            {/* Signatures & Seal Bar */}
            <div className="pt-4 sm:pt-6 grid grid-cols-2 gap-4 sm:gap-8 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto">
              <div>
                <p className="font-serif italic font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">Dr. Marcus Vance</p>
                <p className="text-[10px]">Academic Director</p>
              </div>
              <div>
                <p className="font-mono text-slate-800 dark:text-slate-200 text-xs">{new Date().toLocaleDateString()}</p>
                <p className="text-[10px]">Issue Date</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 sm:pt-4">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white font-bold text-xs transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TakeTest;
