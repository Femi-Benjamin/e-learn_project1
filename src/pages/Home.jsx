import React, { useEffect } from 'react';
import HomeNav from '../navBar/HomeNav';
import img from "../img/Group.png";
import imgi from "../imgi/Ellipse7.png";
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Learn from "../components/Learn";
import Joinus from "../components/Joinus";
import Footer from "../components/Footer";
import 'aos/dist/aos.css';
import Typewriter from "typewriter-effect";
//import AOS from 'aos';

export const Home = () => {
  useEffect(() => {

  }, []);

  return (
    <div className="bg-[#EFF7FF] h-auto w-auto">
      <HomeNav />
      <div className=''>
        <img className='absolute' src={imgi} alt="" />
      </div>
      <div className='flex flex-col lg:flex-row justify-around items-center lg:items-stretch md:px-0 px-5 lg:pt-32'>
        <div className='lg:text-left text-center items-center z-50'>
          <h1 className='text-4xl lg:text-6xl pt-8 lg:pt-0 text-[#082183] lg:leading-[105px] leading-normal'>
            Get Quality <span className='font-bold'> Tutoring <br /> Through 1-on-1</span> <br />
            <Typewriter
              options={{
                strings: ['Online Tutoring'],
                autoStart: true,
                loop: true,
                delay: 200,
              }}
            />
          </h1>
          <h1 className='pt-4 lg:pt-8 text-[#082183] leading-8 text-xl lg:text-lg not-italic font-medium'>
            Private, 1-on-1 lessons with experts, instructor-based learning in the field of interest
          </h1>
          <button className='lg:w-[190px] w-56 h-[53px] bg-[#082183] rounded-[15px] mt-6 lg:mt-8'>
            <h1 className='font-semibold text-[24px] leading-[36px] text-[#FFFFFF]'>Join for free</h1>
          </button>
        </div>
        <div className='h-full'>
          <img className='absolute' src={imgi} alt="" />
        </div>
        <div className='pt-16 lg:pt-0 z-50'>
          <img src={img} alt="learn" className='lg:w-auto w-full' />
        </div>

      </div>
      <Sidebar />
      <div className='flex flex-col items-center lg:flex-row justify-center lg:justify-around z-10 py-8 lg:py-[50px] md:gap-5 gap-6'>
        <div className='hover:animate-bounce z-10'>
          <Card
            headerImage="/Line Chart.png"
            headOne="Cyber"
            headTwo="Security"
            backgroundColor="bg-[#4B5FDC]"
          />
        </div>
        <div className='hover:animate-bounce z-10'>
          <Card
            headerImage="/Vector (1).png"
            headOne="Business"
            headTwo="Management"
            backgroundColor="bg-[#4EC5F8]"
          />
        </div>
        <div className='hover:animate-bounce z-10'>
          <Card
            headerImage="Vector (2).png"
            headOne="Data"
            headTwo="Analytics"
            backgroundColor="bg-[#082183]"
          />
        </div>
      </div>
      <Learn />
      <Joinus />
      <Footer />
    </div>
  );
};

