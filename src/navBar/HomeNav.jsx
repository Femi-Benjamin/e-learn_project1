import React from 'react'

export default function HomeNav() {
  return (
  <div className='bg-[#EFF7FF] h-[81px] shadow-lg'>
  <div className='flex justify-between p-5 items-center'>

    <div className='flex'>
    
        <h1  className='w-[148px] h-[60px] not-italic font-semibold text-4xl leading-10 text-[#082183] ml-[100px]'>Ritman</h1>
    </div>

    <div className='flex gap-6 text-[#4CC0F8] h-[30px] mb-3'>
        <a href="/" className='text-[#082183]'>Home</a>
        <a href="/" className='hover:text-[#082183]'>Courses</a>
        <a href="/" className='hover:text-[#082183]'>Live Classes</a>
        <a href="/" className='hover:text-[#082183]'>Recorded Classes</a>
        <a href="/" className='hover:text-[#082183]'>Take Test</a>
    </div>

    <div className='w-[150px] h-[49px] bg-[#082183] rounded-2xl mr-[108px] mb-5'>
        <button className='text-[#FFFFFF] text-2xl leading-9 font-semibold text-center ml-8 mt-1'>Sign Up</button>
    </div>

    </div>
    </div>
  )
}
