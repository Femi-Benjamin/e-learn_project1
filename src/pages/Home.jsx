import React, { useEffect } from 'react';
import HomeNav from '../navBar/HomeNav'
import img from "../img/Group.png"
import imgi from "../imgi/Ellipse7.png";
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Learn from "../components/Learn";
import Joinus from "../components/Joinus";
import Footer from "../components/Footer";
//import AOS from 'aos';
import 'aos/dist/aos.css';

export const Home = () => {
  useEffect(() => {
    
  }, [])
  
  return (
    <div className="bg-[#EFF7FF] h-auto w-auto">
      <HomeNav />
      <img className='absolute' src={imgi} alt="" />
      <div className='flex justify-evenly'>
        <div className='not-italic font-semibold text-6xl mt-[160px] ml-[100px] text-[#082183] leading-[104px] z-50'>
          <h1>Get Quality <span className='font-bold'> Tutoring <br /> Through 1-on-1</span> <br />Online Tutoring</h1>
          <h1 className='mt-8 w-[526px] text-[#082183] leading-8 text-xl h-[60px] not-italic font-medium'>Private, 1-on-1 lessons with experts, instructor based learning in field or interest</h1>
          <button className='w-[190px] h-[53px] bg-[#082183] rounded-[15px] mt-[38px]'>
            <h1 className='p-[23] font-semibold text-[24px] leading-[36px] text-[#FFFFFF] '>Join for free</h1>
          </button>
        </div>
        <div className='mt-[200px] pr-5 z-50'>
          <img src={img} alt="learn" />
        </div>
      </div>
      <Sidebar />
      {/* <div className='w-[654px] h-[654px] bg-[#CFEDFF] blur-2xl rounded-full ml-[394px]'></div> */}
      {/*  */}
      <div className='flex justify-between items-center z-50 px-[100px] pt-[65px]'>
        <Card 
          headerImage="/Line Chart.png"
          headOne="Business"
          headTwo="Management"
          backgroundColor="bg-[#4B5FDC]"
        />
        <Card 
          headerImage="/Vector (1).png"
          headOne="Business"
          headTwo="Management"
          backgroundColor="bg-[#4EC5F8]"
        />
        <Card 
          headerImage="Vector (2).png"
          headOne="Business"
          headTwo="Management"
          backgroundColor="bg-[#082183]"
        />
      </div>
      <Learn/>
      <Joinus/>
      <Footer/>
    </div>
  )
}
