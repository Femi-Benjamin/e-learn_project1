import React from 'react';
import HomeNav from '../navBar/HomeNav';

export const TakeTest = () => {
  return (
    <div>
      <HomeNav />
      <div className=' bg-[#EFF7FF] h-auto w-auto m-5 p-5 text-center text-[#082183] not-italic text-2xl'>
        <h1 className='font-extrabold p-5'>You Have Taken All Quiz Assigned to You!</h1>
        <h1 className='p-5'>Please Head Over To Recorded Classes To Check Score.</h1>
        <h1 className='font-bold'>THANK YOU!</h1>
      </div>
    </div>
  )
}
