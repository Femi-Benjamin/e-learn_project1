import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import { Courses } from './pages/Courses';
import { Home } from "./pages/Home";
import { LiveClasses } from './pages/LiveClasses';
import { RecordedClasses } from './pages/RecordedClasses';
import { TakeTest } from './pages/TakeTest';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path='/live-classes' element={<LiveClasses/>}/>
        <Route path='/recorded-classes' element={<RecordedClasses/>}/>
        <Route path='/take-test' element={<TakeTest/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
