import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Bookmark, 
  Sparkles, 
  Trophy, 
  X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useAuth();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
      id="toast-notification-system"
    >
      {toasts.map((toast) => {
        const type = toast.type || 'info';

        let icon = <Info className="w-5 h-5 text-blue-400" />;
        let borderColor = 'border-slate-700';
        let bgGradient = 'bg-slate-900/95';
        let badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        let typeLabel = 'Notification';

        if (type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          borderColor = 'border-emerald-500/40';
          bgGradient = 'bg-slate-950/95';
          badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
          typeLabel = 'Success';
        } else if (type === 'error') {
          icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
          borderColor = 'border-rose-500/50';
          bgGradient = 'bg-slate-950/95';
          badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/30';
          typeLabel = 'Error Encountered';
        } else if (type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          borderColor = 'border-amber-500/40';
          bgGradient = 'bg-slate-950/95';
          badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
          typeLabel = 'Attention';
        } else if (type === 'bookmark') {
          icon = <Bookmark className="w-5 h-5 text-indigo-400 shrink-0 fill-indigo-400/20" />;
          borderColor = 'border-indigo-500/40';
          bgGradient = 'bg-slate-950/95';
          badgeColor = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
          typeLabel = 'Course Bookmark';
        } else if (type === 'lesson') {
          icon = <Trophy className="w-5 h-5 text-amber-400 shrink-0" />;
          borderColor = 'border-blue-500/50';
          bgGradient = 'bg-slate-950/95';
          badgeColor = 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-sky-300 border-blue-400/30';
          typeLabel = 'Lesson Milestone';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl ${bgGradient} border ${borderColor} text-white shadow-2xl backdrop-blur-md flex items-start gap-3.5 transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in`}
            role="alert"
          >
            <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-xs shrink-0">
              {icon}
            </div>

            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}`}>
                  {toast.title || typeLabel}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Just now</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed break-words">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
