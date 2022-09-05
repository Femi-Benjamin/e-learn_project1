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
        <Route path='/liveClasses' element={<LiveClasses/>}/>
        <Route path='/recordedClasses' element={<RecordedClasses/>}/>
        <Route path='/takeTest' element={<TakeTest/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
