import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Courses } from './pages/Courses';
import { Home } from "./pages/Home";
import { LiveClasses } from './pages/LiveClasses';
import { RecordedClasses } from './pages/RecordedClasses';
import { TakeTest } from './pages/TakeTest';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/live-classes' element={<LiveClasses />} />
        <Route path='/recorded-classes' element={<RecordedClasses />} />
        <Route path='/take-test' element={<TakeTest />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/login' element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
