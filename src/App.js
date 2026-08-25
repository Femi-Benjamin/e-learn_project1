import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { LiveClasses } from './pages/LiveClasses';
import { RecordedClasses } from './pages/RecordedClasses';
import { TakeTest } from './pages/TakeTest';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/live-classes" element={<LiveClasses />} />
          <Route path="/recorded-classes" element={<RecordedClasses />} />
          <Route path="/take-test" element={<TakeTest />} />
          
          {/* Admin Protected Route */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
