import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  DollarSign, 
  Video, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  LogOut, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  X,
  Award,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    coursesList, 
    addCourse, 
    updateCourse, 
    deleteCourse, 
    logoutAdmin,
    showToast 
  } = useAuth();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'students' | 'live' | 'analytics'
  const [courseSearch, setCourseSearch] = useState('');
  
  // Course Modal state (Create / Edit)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    category: 'Development',
    level: 'Beginner',
    duration: '8 Weeks',
    price: 79.99,
    originalPrice: 129.99,
    description: '',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    instructorName: 'Elena Rostova',
    instructorRole: 'Senior Staff Engineer'
  });

  // Mock Students Roster
  const [students, setStudents] = useState([
    { id: 1, name: "Alex Morgan", email: "alex.morgan@student.edu", course: "Cyber Security & Ethical Hacking", progress: 85, status: "Active", joined: "Aug 12, 2026" },
    { id: 2, name: "Sarah Connor", email: "s.connor@defense.org", course: "Full-Stack Web Engineering", progress: 92, status: "Active", joined: "Aug 18, 2026" },
    { id: 3, name: "Marcus Vance Jr.", email: "marcus.jr@vance.io", course: "Applied Machine Learning", progress: 100, status: "Certified", joined: "Jul 24, 2026" },
    { id: 4, name: "Chloe Dupont", email: "chloe@designlabs.co", course: "Modern UI/UX Design Systems", progress: 64, status: "Active", joined: "Aug 20, 2026" },
    { id: 5, name: "Tariq Mansoor", email: "tariq@cloudsys.net", course: "Cloud Solutions Architecture", progress: 48, status: "Active", joined: "Aug 22, 2026" }
  ]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const handleOpenAddCourse = () => {
    setEditingCourseId(null);
    setCourseFormData({
      title: '',
      category: 'Development',
      level: 'Beginner',
      duration: '8 Weeks',
      price: 79.99,
      originalPrice: 129.99,
      description: '',
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      instructorName: 'Sarah Jenkins',
      instructorRole: 'Lead Instructor'
    });
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course) => {
    setEditingCourseId(course.id);
    setCourseFormData({
      title: course.title,
      category: course.category,
      level: course.level || 'Beginner',
      duration: course.duration || '8 Weeks',
      price: course.price || 79.99,
      originalPrice: course.originalPrice || 129.99,
      description: course.description || '',
      badge: course.badge || '',
      image: course.image,
      instructorName: course.instructor?.name || 'Staff Instructor',
      instructorRole: course.instructor?.role || 'Instructor'
    });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!courseFormData.title.trim()) {
      showToast("Please provide a course title", "error");
      return;
    }

    const payload = {
      title: courseFormData.title,
      category: courseFormData.category,
      level: courseFormData.level,
      duration: courseFormData.duration,
      price: parseFloat(courseFormData.price) || 79.99,
      originalPrice: parseFloat(courseFormData.originalPrice) || 129.99,
      description: courseFormData.description,
      badge: courseFormData.badge,
      image: courseFormData.image,
      instructor: {
        name: courseFormData.instructorName,
        role: courseFormData.instructorRole,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      }
    };

    if (editingCourseId) {
      updateCourse(editingCourseId, payload);
    } else {
      addCourse(payload);
    }

    setIsCourseModalOpen(false);
  };

  const filteredCourses = coursesList.filter(c => 
    c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.category.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans flex flex-col justify-between">
      <Navbar />

      {/* Admin Top Command Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  EduPulse Admin Center
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Production
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage curriculum, live broadcasts, enrollment metrics & certification</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddCourse}
              id="admin-create-course-btn"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Course</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 border border-slate-800 transition-colors text-xs font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8">
        
        {/* KPI Metrics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Gross Platform Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-white">$148,290</p>
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% this month
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Active Learners</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-white">54,820</p>
            <span className="text-[11px] text-blue-400 font-bold">840 newly enrolled</span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Published Courses</span>
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-white">{coursesList.length}</p>
            <span className="text-[11px] text-purple-400 font-bold">100% cloud synced</span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Assessment Pass Rate</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-heading font-extrabold text-white">94.8%</p>
            <span className="text-[11px] text-amber-400 font-bold">1,420 certificates issued</span>
          </div>

        </div>

        {/* Admin Workspace Tabs */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          
          {/* Tabs Bar */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'courses' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Course Catalog ({coursesList.length})
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'students' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Students Roster ({students.length})
              </button>
            </div>

            {activeTab === 'courses' && (
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter courses..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}
          </div>

          {/* TAB 1: Courses Management Table */}
          {activeTab === 'courses' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
                  <tr>
                    <th className="py-3.5 px-6">Course</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Instructor</th>
                    <th className="py-3.5 px-4">Rating</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={course.image} alt={course.title} className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700 shrink-0" />
                          <div>
                            <p className="font-bold text-white leading-tight">{course.title}</p>
                            <p className="text-[10px] text-slate-500">{course.duration} • {course.level}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium">
                          {course.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-white font-mono">
                        ${course.price}
                      </td>
                      <td className="py-4 px-4 text-slate-300 font-medium">
                        {course.instructor?.name || 'Staff'}
                      </td>
                      <td className="py-4 px-4 text-amber-400 font-bold">
                        ★ {course.rating ? course.rating.toFixed(1) : "5.0"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditCourse(course)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 transition-colors"
                            aria-label={`Edit ${course.title}`}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/80 text-rose-400 transition-colors"
                            aria-label={`Delete ${course.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: Students Roster */}
          {activeTab === 'students' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10px]">
                  <tr>
                    <th className="py-3.5 px-6">Student</th>
                    <th className="py-3.5 px-4">Enrolled Track</th>
                    <th className="py-3.5 px-4">Curriculum Progress</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {students.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-white">{st.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{st.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-200 font-medium">
                        {st.course}
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${st.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono mt-1 block">{st.progress}% Complete</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          st.status === 'Certified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {st.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-mono text-slate-400">
                        {st.joined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </main>

      {/* Add / Edit Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-5 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-lg text-white">
                {editingCourseId ? "Edit Course Information" : "Create New Course Track"}
              </h3>
              <button
                onClick={() => setIsCourseModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Course Title *</label>
                <input
                  type="text"
                  required
                  value={courseFormData.title}
                  onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                  placeholder="e.g. Distributed Systems Engineering"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Category</label>
                  <select
                    value={courseFormData.category}
                    onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="Security">Security</option>
                    <option value="Development">Development</option>
                    <option value="AI">AI</option>
                    <option value="Data">Data</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Target Level</label>
                  <select
                    value={courseFormData.level}
                    onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={courseFormData.price}
                    onChange={(e) => setCourseFormData({ ...courseFormData, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Duration</label>
                  <input
                    type="text"
                    value={courseFormData.duration}
                    onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                    placeholder="e.g. 10 Weeks"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Course Description</label>
                <textarea
                  rows={3}
                  value={courseFormData.description}
                  onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                  placeholder="Summary of skills learned..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-500/20"
                >
                  {editingCourseId ? "Update Course" : "Publish Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;
