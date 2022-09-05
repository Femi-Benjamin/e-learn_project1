import React from 'react'

export default function Learn() {
  return (
    <div className='bg-[#BDEAFF] h-[924px] w-[1440px] mt-[182px]'>
        <div className='flex'>
            <div>
                <h1 className='text-[#082183] font-bold not-italic text-[50px] leading-[75px] ml-[100px] pt-[108px] w-[606px]'>Make your personalized learning experience</h1>
            </div>

            <div className='text-[#082183] font-normal not-italics  text-[20px] leading-[30px] mr-[140px] pt-[153px] pl-[81px]'>
                <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor dignissim lacus, aliquet sit molestie.</h1>
            </div> 
        </div>
        <div className='flex'>
            <div className='grid grid-cols-2 gap-0'>
                <div >
                    <h1 className='font-bold not-italic text-5xl pl-[104px] leading-[58px] pt-[33px] text-[#082183]'>1</h1>
                    <h1 className='not-italics font-bold text-2xl pl-[100px] leadind-[38px] pt-[24px] text-[#082183]'>Create account</h1>
                    <h1 className='not-italics font-normal text-xl pl-[100px] leading-[30px] pt-[23px] text-[#082183]'>At first create your <br /> account on our website.</h1>
                </div>
                <div >
                    <h1 className='font-bold not-italic text-5xl pl-[104px] leading-[58px] pt-[33px] text-[#082183]'>2</h1>
                    <h1 className='not-italics font-bold text-2xl pl-[100px] leadind-[38px] pt-[24px] text-[#082183]'>Select course</h1>
                    <h1 className='not-italics font-normal text-xl pl-[100px] leading-[30px] pt-[23px] text-[#082183]'>Then select your preferred <br /> course from our bucket.</h1>
                </div>
                <div >
                    <h1 className='font-bold not-italic text-5xl pl-[104px] leading-[58px] pt-[33px] text-[#082183]'>3</h1>
                    <h1 className='not-italics font-bold text-2xl pl-[100px] leadind-[38px] pt-[24px] text-[#082183]'>Create account</h1>
                    <h1 className='not-italics font-normal text-xl pl-[100px] leading-[30px] pt-[23px] text-[#082183]'>Learn your skill from the <br /> best learning materials.</h1>
                </div>
                <div >
                    <h1 className='font-bold not-italic text-5xl pl-[104px] leading-[58px] pt-[33px] text-[#082183]'>4</h1>
                    <h1 className='not-italics font-bold text-2xl pl-[100px] leadind-[38px] pt-[24px] text-[#082183]'>Create account</h1>
                    <h1 className='not-italics font-normal text-xl pl-[100px] leading-[30px] pt-[23px] text-[#082183]'>After learning the course <br /> make steps to success.</h1>
                </div>
            </div>

            <div>
                <video className='pl-[30px] pt-[80px] video-parallax border-white' autoPlay loop muted controls  src="https://player.vimeo.com/external/517730351.sd.mp4?s=9a026f7d34313485a304232cd8eaf91c9072f997&profile_id=164&oauth2_token_id=57447761"></video>
            </div>
        </div>
    </div>
  )
}
