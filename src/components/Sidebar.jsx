import React from "react";
import spin from "../spin/Logo.png";
import bluelogo from "../bluelogo/Vector.png";
import imgi from "../imgi/Ellipse7.png";

export default function sidebar() {
  return (
    <>
      <div className="flex justify-end">
        <div className="flex md:flex-row flex-col justify-evenly items-center lg:p-20 p-5 md:w-[1130px] w-full md:text-left text-center bg-white shadow-2xl md:rounded-tl-3xl md:rounded-bl-3xl mt-[88px]">
          <h1 className=" md:text-[40px] text-2xl leading-10 not-italic text-[#082183] font-bold pb-3">
            Over 500 plus <br/> courses in one place
          </h1>
          <img className="md:pb-0 pb-5 md:w-44 w-20" src={spin} alt="" />
          <img className="md:pb-0 p-2 md:w-32 w-20" src={bluelogo} alt="" />
        </div>
      </div>
      {/*  */}
      <div className="text-center mt-[100px] pb-10">
        <h1 className="font-bold lg:text-[50px] text-4xl text-[#082183]">
          Popular Courses
        </h1>
      </div>
      <div className="h-full flex justify-center">
        <img className="absolute" src={imgi} alt="" />
      </div>
    </>
  );
}
