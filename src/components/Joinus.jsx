import React from "react";

export default function Joinus() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#EFF7FF] py-12 md:py-10 lg:py-20 md:px-0 px-5">
        <div className="text-center not-italic font-bold text-2xl md:text-4xl lg:text-5xl leading-[2.5rem] md:leading-[4rem] lg:leading-[4.5rem] text-[#082183] pt- capitalize">
          <h1>
            Join us and scale up your IQ, <br /> friends, and family
          </h1>
        </div>

        <div className="not-italic font-medium text-lg md:text-xl lg:text-2xl leading-[1.875rem] md:leading-[2rem] lg:leading-[3rem] text-center text-[#082183] pt-4 md:pt-8">
          <h1>
            We provide awesome course content and support our <br /> students so
            that they shine in their lives perfectly.
          </h1>
        </div>

        <div className="pt-4 md:pt-8 flex justify-center">
          <button className="w-[190px] h-[53px] md:w-[250px] md:h-[64px] bg-[#082183] rounded-[15px]">
            <h1 className="not-italics font-semibold text-base md:text-xl lg:text-2xl leading-[1.5rem] md:leading-[2.25rem] text-[#FFFFFF]">
              Join for free
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}
