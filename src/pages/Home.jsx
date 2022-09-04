import React from 'react';
import HomeNav from '../navBar/HomeNav';
import img from "../img/Group.png"
import imgi from "../imgi/Ellipse7.png"

import shadow from "../shadow/Ellipse2.png"
import Sidebar from '../components/Sidebar';

export const Home = () => {
  return (
    <div className="bg-[#EFF7FF] h-auto w-auto">
    <img className='absolute w-[318px] h-[318px] left-2 top-[100px] blur-3xl' src={imgi} alt="" />
    <img className='absolute w-[654px] h-[654px] left-[900px] top-[89px] blur-3xl' src={shadow} alt="" />
      <HomeNav/> 
      <Sidebar/>
      <div className='flex'>
        <div className='not-italic font-semibold text-6xl mt-[160px] ml-[100px] text-[#082183] leading-[104px] z-50'>
          <h1>Get Quality <span className='font-bold'> Tutoring <br /> Through 1-on-1</span> <br />Online Tutoring</h1>

          <h1 className='mt-8 w-[526px] text-[#082183] leading-8 text-xl h-[60px] not-italic font-medium'>Private, 1-on-1 lessons with experts, instructor based learning in field or interest</h1>
           
           <button className='w-[190px] h-[53px]    bg-[#082183] rounded-[15px] mt-[38px]'>
            <h1 className='w-[144px] p-[23] ml-[23px] h-[36px] font-semibold text-[24px] leading-[36px] text-[#FFFFFF] '>Join for free</h1>
           </button>
        </div>
        
        <div className='mt-[200px] ml-10 z-50'>
          <img src={img} alt="learn" />
        </div>
      </div>

   

        <div>
          <h1 className='w-[419px] h-[75px] not-italic font-bold text-[50px]  text-[#082183]'>Popular Courses</h1>
        </div>

    </div>
  )
}
