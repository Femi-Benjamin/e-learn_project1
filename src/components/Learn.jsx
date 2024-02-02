import React from "react";

export default function Learn() {
  return (
    <div className="bg-[#BDEAFF] md:p-28 p-5 lg:mt-[180px] mt-20">
      <div className="flex md:flex-row flex-col justify-between items-center text-[#082183]">
        <h1 className=" font-bold not-italic text-[28px] md:text-[50px] leading-[45px] md:leading-[75px] md:pb-0 pb-3 lg:text-left text-center">
          Make your personalized <br /> learning experience
        </h1>
        <div className="lg:block md:hidden sm:block lg:px-28">
          <h1 className=" font-normal not-italic text-base md:text-[20px] leading-[25px] lg:text-left text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit.
            Dolor dignissim lacus, aliquet sit molestie.
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center md:flex-row">
        <div className="lg:block md:hidden sm:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 place-items-center text-[#082183]">
            <div className="text-center md:text-left">
              <h1 className="not-italic font-bold  text-5xl leading-[58px] pt-[33px]">
                1
              </h1>
              <h1 className="not-italic font-bold text-2xl leading-[38px] md:pt-[24px]">
                Create account
              </h1>
              <h1 className="not-italic font-normal text-xl leading-[30px] md:pt-[23px]">
                At first create your <br /> account on our website.
              </h1>
            </div>

            <div className="text-center md:text-left">
              <h1 className="font-bold not-italic text-5xl leading-[58px] pt-[33px]">
                2
              </h1>
              <h1 className="not-italic font-bold text-2xl leading-[38px] md:pt-[20px]">
                Select course
              </h1>
              <h1 className="not-italic font-normal text-xl leading-[30px] md:pt-[20px]">
                Then select your preferred <br /> course from our bucket.
              </h1>
            </div>

            <div className="text-center md:text-left">
              <h1 className="font-bold not-italic text-5xl leading-[58px] pt-[33px]">
                3
              </h1>
              <h1 className="not-italic font-bold text-2xl leading-[38px] md:pt-[20px]">
                Learn Skill
              </h1>
              <h1 className="not-italic font-normal text-xl leading-[30px] md:pt-[20px]">
                Learn your skill from the <br /> best learning materials.
              </h1>
            </div>

            <div className="text-center md:text-left">
              <h1 className="font-bold not-italic text-5xl leading-[58px] pt-[33px]">
                4
              </h1>
              <h1 className="not-italic font-bold text-2xl leading-[38px] md:pt-[23px]">
                Create account
              </h1>
              <h1 className="not-italic font-normal text-xl leading-[30px] md:pt-[20px]">
                After learning the course <br /> make steps to success.
              </h1>
            </div>
          </div>
        </div>
        <div>
          <video
            className="rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px] border-[3px] border-white mr-[2rem md:mr-[101px mt-[2rem] md:mt-[90px shadow-xl"
            autoPlay
            loop
            muted
            controls
            src="https://player.vimeo.com/external/517730351.sd.mp4?s=9a026f7d34313485a304232cd8eaf91c9072f997&profile_id=164&oauth2_token_id=57447761"
          ></video>
        </div>
      </div>
    </div>
  );
}
