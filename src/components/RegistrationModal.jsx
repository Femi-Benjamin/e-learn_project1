import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  User, 
  Mail, 
  BookOpen, 
  Lock,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegistrationModal = ({ isOpen, onClose, preselectedCourse = null }) => {
  const { coursesList, enrollInCourse, showErrorToast } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    courseId: '',
    experienceLevel: 'Beginner',
    paymentPlan: 'one-time'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (preselectedCourse) {
      setFormData(prev => ({ ...prev, courseId: preselectedCourse.id || '' }));
    } else if (coursesList.length > 0 && !formData.courseId) {
      setFormData(prev => ({ ...prev, courseId: coursesList[0].id }));
    }
  }, [preselectedCourse, coursesList, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      const msg = 'Please provide your full legal name for your course credential.';
      setErrorMessage(msg);
      showErrorToast(msg, 'Enrollment Validation');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      const msg = 'Please enter a valid student email address.';
      setErrorMessage(msg);
      showErrorToast(msg, 'Invalid Email Format');
      return;
    }

    if (!formData.courseId) {
      const msg = 'Please select a course track to enroll in.';
      setErrorMessage(msg);
      showErrorToast(msg, 'Course Selection Required');
      return;
    }

    setIsSubmitting(true);

    // Simulate API enrollment
    setTimeout(() => {
      const selectedCourse = coursesList.find(c => c.id === formData.courseId);
      enrollInCourse(formData.courseId, selectedCourse?.title || "Selected Course");
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setErrorMessage('');
    onClose();
  };

  const selectedCourseObj = coursesList.find(c => c.id === formData.courseId) || coursesList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
        id="registration-enrollment-modal"
      >
        {/* Top Gradient Banner */}
        <div className="h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />

        {/* Modal Header */}
        <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
                {isSuccess ? "Welcome Aboard!" : "Fast-Track Enrollment"}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                {isSuccess ? "Your access has been unlocked" : "Instant access to live classes, labs, & mentorship"}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close enrollment modal"
            id="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">Enrollment Confirmed!</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                Congratulations, <strong className="text-slate-900 dark:text-white">{formData.fullName}</strong>! You now have full access to <strong className="text-blue-600 dark:text-blue-400">{selectedCourseObj?.title}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Account Email:</span>
                <strong className="text-slate-900 dark:text-white">{formData.email}</strong>
              </div>
              <div className="flex justify-between">
                <span>Curriculum Access:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Immediate Unlocked</span>
              </div>
              <div className="flex justify-between">
                <span>Live Q&A Access:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">Enabled</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              Start Learning Now
            </button>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="px-5 sm:px-6 pb-6 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            {/* Course Selector */}
            <div className="space-y-1.5">
              <label htmlFor="courseId" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Course Track *
              </label>
              <div className="relative">
                <select
                  id="courseId"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none"
                >
                  {coursesList.map((c) => (
                    <option key={c.id} value={c.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {c.title} (${c.price || "79.99"})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Full Name *
              </label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Email Address (for course portal access) *
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="alex.morgan@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none"
                />
              </div>
            </div>

            {/* Skill Level Selection */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setFormData(prev => ({ ...prev, experienceLevel: lvl }))}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    formData.experienceLevel === lvl
                      ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Security Guarantee Note */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5 text-slate-600 dark:text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>30-Day 100% money-back guarantee with zero risk.</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              id="confirm-enrollment-btn"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 active:scale-98 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Activating Enrollment...</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Enrollment (${selectedCourseObj?.price || "79.99"})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default RegistrationModal;
