import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeNav() {
  return (
    <div className='bg-[#EFF7FF] h-[81px] shadow-lg'>
      <div className='flex items-center p-5 justify-evenly'>

        <div className='flex'>
          <h1 className='w-[148px] h-[60px] not-italic font-semibold text-4xl leading-10 text-[#082183]'>Ritman</h1>
        </div>

        <div className='flex gap-6 text-[#4CC0F8] h-[30px] mb-3'>
          <Link to="/"><p className='text-[#082183] cursor-pointer transition-all duration-300'>Home</p></Link>
          <Link to="/courses"><p className='hover:text-[#082183] cursor-pointer transition-all duration-300'>Courses</p></Link>
          <Link to="/live-classes"><p className='hover:text-[#082183] cursor-pointer transition-all duration-300'>Live Classes</p></Link>
          <Link to="/recorded-classes"><p className='hover:text-[#082183] cursor-pointer transition-all duration-300'>Recorded Classes</p></Link>
          <Link to="/take-test"><p className='hover:text-[#082183] cursor-pointer transition-all duration-300'>Take Test</p></Link>
        </div>

        <div className=' bg-[#082183] rounded-2xl mb-7 w-[174px] h-[40px]'>
          <button className='text-[#FFFFFF] text-[24px] leading-9 font-[600] text-center ml-[44px]'>Sign Up</button>
        </div>

      </div>
    </div>
  )
}
