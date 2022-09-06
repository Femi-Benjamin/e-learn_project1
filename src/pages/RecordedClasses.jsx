import React from 'react';
import HomeNav from '../navBar/HomeNav';

export const RecordedClasses = () => {
  return (
    <div className='bg-[#EFF7FF] h-auto w-auto'>
      <HomeNav />
      <div className='text-center m-10'>
        <h1 className='font-extrabold text-[40px] text-[#082183] not-italic'>Assessment History</h1>
        <h1 className='font-bold text-[#082183]'>Here you will find your weekly quiz scores</h1>
      </div>

      <div className='w-[500px] h-[200px] bg-[#4B5FDC] text-white rounded-2xl m-10 shadow-2xl hover:scale-105'>
        <h1 className='font-bold p-5'>Week 1 Quiz</h1>
        <h1 className='p-5'>Review</h1>
          <div className='flex'>
        <h1 className='p-5 text-2xl'>Score</h1>
        <h1 className='p-5 text-2xl font-bold'>50</h1>
        </div>
      </div>
      <div className='w-[500px] h-[200px] bg-[#4B5FDC] text-white rounded-2xl m-10 shadow-2xl hover:scale-105'>
        <h1 className='font-bold p-5'>Week 2 Quiz</h1>
        <h1 className='p-5'>Review</h1>
          <div className='flex'>
        <h1 className='p-5 text-2xl'>Score</h1>
        <h1 className='p-5 text-2xl font-bold'>75</h1>
        </div>
      </div>
      <div className='w-[500px] h-[200px] bg-[#4B5FDC] text-white rounded-2xl m-10 shadow-2xl hover:scale-105'>
        <h1 className='font-bold p-5'>Week 3 Quiz</h1>
        <h1 className='p-5'>Review</h1>
          <div className='flex'>
        <h1 className='p-5 text-2xl rounded-3xl'>Score</h1>
        <h1 className='p-5 text-2xl font-bold'>90</h1>
        </div>
      </div>
      <div className='w-[500px] h-[200px] bg-[#4B5FDC] text-white rounded-2xl m-10 shadow-2xl hover:scale-105'>
        <h1 className='font-bold p-5'>Week 4 Quiz</h1>
        <h1 className='p-5'>Review</h1>
          <div className='flex'>
        <h1 className='p-5 text-2xl rounded-3xl'>Score</h1>
        <h1 className='p-5 text-2xl font-bold'>80</h1>
        </div>
      </div>
    </div>
  )
}
