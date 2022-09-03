import React from 'react'

export default function HomeNav() {
  return (
  <div className='bg-[#EFF7FF] h-[81px] shadow-lg'>
  <div className='flex justify-between p-5'>

    <div>
        <h1  className='w-[148px] h-[60px] not-italic font-semibold text-4xl leading-10 text-[#082183]'>Ritman</h1>
    </div>

    <div className='flex gap-6 text-[#4CC0F8] h-[30px]'>
        <a href="/">Home</a>
        <a href="/">Courses</a>
        <a href="/">Live Classes</a>
        <a href="/">Recorded Classes</a>
        <a href="/">Take Test</a>
    </div>

    <div className='w-[174px] h-[49px] bg-[#082183] rounded-2xl'>
        <button className='text-[#FFFFFF] text-2xl leading-9 font-semibold'>Sign Up</button>
    </div>

    </div>
    </div>
  )
}
