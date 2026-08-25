import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCourses } from '../data/courses';
import ToastContainer from '../components/ToastContainer';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Theme state (light / dark)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('elearn_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Sync theme with document class and local storage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('elearn_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      showToast(
        nextTheme === 'dark' ? 'Switched to Dark Mode 🌙' : 'Switched to Light Mode ☀️',
        'info',
        'Theme Changed'
      );
      return nextTheme;
    });
  };

  // Auth state
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('elearn_isAdmin') === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('elearn_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return {
      name: "Alex Morgan",
      email: "alex.morgan@student.edu",
      role: "Student",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      joinedDate: "January 2026",
      completedLessons: 18,
      streakDays: 7
    };
  });

  // Dynamic courses state (supports CRUD from admin dashboard)
  const [coursesList, setCoursesList] = useState(() => {
    const saved = localStorage.getItem('elearn_courses');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge: ensure all initialCourses (e.g. newly added Computer Science tracks) are present
          const existingIds = new Set(parsed.map(c => c.id));
          const missingDefaults = initialCourses.filter(c => !existingIds.has(c.id));
          if (missingDefaults.length > 0) {
            const merged = [...parsed, ...missingDefaults];
            localStorage.setItem('elearn_courses', JSON.stringify(merged));
            return merged;
          }
          return parsed;
        }
      } catch (e) {
        return initialCourses;
      }
    }
    return initialCourses;
  });

  // Enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('elearn_enrolled');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ["cs-101", "web-201"];
      }
    }
    return ["cs-101", "web-201"];
  });

  // Bookmarks
  const [bookmarkedCourses, setBookmarkedCourses] = useState(() => {
    const saved = localStorage.getItem('elearn_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ["ai-301"];
      }
    }
    return ["ai-301"];
  });

  // Test results history
  const [testHistory, setTestHistory] = useState(() => {
    const saved = localStorage.getItem('elearn_test_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Course learning journey progress tracking (percent: 0 - 100)
  const [courseProgress, setCourseProgress] = useState(() => {
    const saved = localStorage.getItem('elearn_course_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { "cs-101": 68, "web-201": 35 };
      }
    }
    return { "cs-101": 68, "web-201": 35 };
  });

  // Track the last accessed course for the 'Continue Learning' section
  const [lastAccessedCourseId, setLastAccessedCourseId] = useState(() => {
    const saved = localStorage.getItem('elearn_last_accessed');
    return saved || 'cs-101';
  });

  const setLastAccessedCourse = (courseId) => {
    if (!courseId) return;
    setLastAccessedCourseId(courseId);
    localStorage.setItem('elearn_last_accessed', courseId);
  };

  // Toast / Notification system (supports multi-toasts, custom titles, icons, and error handling)
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const showToast = (messageOrObj, type = 'success', title = null) => {
    let newToast;
    if (typeof messageOrObj === 'object' && messageOrObj !== null) {
      newToast = {
        id: Date.now() + Math.random(),
        message: messageOrObj.message || 'Action completed',
        type: messageOrObj.type || type,
        title: messageOrObj.title || title,
        duration: messageOrObj.duration || 4500
      };
    } else {
      newToast = {
        id: Date.now() + Math.random(),
        message: String(messageOrObj),
        type,
        title,
        duration: 4500
      };
    }

    setToasts(prev => [...prev.slice(-3), newToast]); // keep last 4 toasts max

    setTimeout(() => {
      removeToast(newToast.id);
    }, newToast.duration);
  };

  const showErrorToast = (message, title = "Error Encountered") => {
    showToast({ message, type: 'error', title, duration: 5000 });
  };

  const showLessonToast = (courseTitle, newPercent, totalLessons = 36) => {
    const completedCount = Math.round((newPercent / 100) * totalLessons);
    if (newPercent >= 100) {
      showToast({
        title: "Course Completed! 🏆",
        message: `Outstanding! You finished all lessons in ${courseTitle}. Your certificate is unlocked!`,
        type: "lesson",
        duration: 6000
      });
    } else {
      showToast({
        title: "Lesson Completed! 🚀",
        message: `Progress updated to ${newPercent}% (${completedCount}/${totalLessons} lessons) for ${courseTitle}.`,
        type: "lesson",
        duration: 4500
      });
    }
  };

  const showBookmarkToast = (courseTitle, isSaved) => {
    if (isSaved) {
      showToast({
        title: "Course Saved 🔖",
        message: `"${courseTitle}" has been added to your saved bookmarks for quick access.`,
        type: "bookmark",
        duration: 4000
      });
    } else {
      showToast({
        title: "Bookmark Removed",
        message: `"${courseTitle}" was removed from your saved list.`,
        type: "info",
        duration: 3500
      });
    }
  };

  useEffect(() => {
    localStorage.setItem('elearn_isAdmin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('elearn_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('elearn_courses', JSON.stringify(coursesList));
  }, [coursesList]);

  useEffect(() => {
    localStorage.setItem('elearn_enrolled', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('elearn_bookmarks', JSON.stringify(bookmarkedCourses));
  }, [bookmarkedCourses]);

  useEffect(() => {
    localStorage.setItem('elearn_test_history', JSON.stringify(testHistory));
  }, [testHistory]);

  useEffect(() => {
    localStorage.setItem('elearn_course_progress', JSON.stringify(courseProgress));
  }, [courseProgress]);

  const loginAsAdmin = (email, password) => {
    if (email.toLowerCase() === 'admin@elearn.com' && password === 'admin123') {
      setIsAdmin(true);
      showToast("Successfully authenticated as Administrator", "success");
      return { success: true };
    }
    return { success: false, error: "Invalid admin credentials. Use admin@elearn.com / admin123" };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    showToast("Logged out of Admin Portal", "info");
  };

  const enrollInCourse = (courseId, courseTitle = "the course") => {
    setLastAccessedCourse(courseId);
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      setCourseProgress(prev => {
        if (prev[courseId] !== undefined) return prev;
        return { ...prev, [courseId]: 10 }; // start with introductory lesson unlocked
      });
      showToast(`🎉 Enrolled successfully in ${courseTitle}!`, "success");
    } else {
      showToast(`You are already enrolled in ${courseTitle}`, "info");
    }
  };

  const updateCourseProgress = (courseId, newPercent, courseTitle = "Course") => {
    setLastAccessedCourse(courseId);
    const clamped = Math.max(0, Math.min(100, Math.round(newPercent)));
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: clamped
    }));
    
    // Find course title if not provided or generic
    const targetCourse = coursesList.find(c => c.id === courseId);
    const resolvedTitle = targetCourse?.title || courseTitle;
    const lessonsCount = targetCourse?.lessonsCount || 36;
    
    showLessonToast(resolvedTitle, clamped, lessonsCount);
  };

  const toggleBookmark = (courseId, courseTitle = null) => {
    // Find title if not provided
    const targetCourse = coursesList.find(c => c.id === courseId);
    const resolvedTitle = courseTitle || targetCourse?.title || "Selected Course";

    setBookmarkedCourses(prev => {
      const exists = prev.includes(courseId);
      if (exists) {
        showBookmarkToast(resolvedTitle, false);
        return prev.filter(id => id !== courseId);
      } else {
        showBookmarkToast(resolvedTitle, true);
        return [...prev, courseId];
      }
    });
  };

  const addCourse = (newCourse) => {
    const fullCourse = {
      id: `course-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      studentsEnrolled: 0,
      badge: "New",
      ...newCourse
    };
    setCoursesList(prev => [fullCourse, ...prev]);
    showToast({
      title: "Course Published",
      message: `"${fullCourse.title}" is now live in the course catalog.`,
      type: "success"
    });
  };

  const updateCourse = (id, updatedData) => {
    setCoursesList(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    showToast({
      title: "Course Updated",
      message: "Course curriculum and settings have been updated.",
      type: "info"
    });
  };

  const deleteCourse = (id) => {
    setCoursesList(prev => prev.filter(c => c.id !== id));
    showToast({
      title: "Course Deleted",
      message: "The course has been removed from the platform catalog.",
      type: "warning"
    });
  };

  const saveTestResult = (result) => {
    const record = {
      id: `test-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...result
    };
    setTestHistory(prev => [record, ...prev]);
  };

  return (
    <AuthContext.Provider value={{
      theme,
      toggleTheme,
      setTheme,
      isAdmin,
      currentUser,
      coursesList,
      enrolledCourses,
      bookmarkedCourses,
      courseProgress,
      lastAccessedCourseId,
      setLastAccessedCourse,
      testHistory,
      toasts,
      toastMessage: toasts[toasts.length - 1] || null, // backwards compatibility
      loginAsAdmin,
      logoutAdmin,
      enrollInCourse,
      updateCourseProgress,
      toggleBookmark,
      addCourse,
      updateCourse,
      deleteCourse,
      saveTestResult,
      showToast,
      showErrorToast,
      showLessonToast,
      showBookmarkToast,
      removeToast
    }}>
      {children}
      {/* Global Toast Notification System */}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
