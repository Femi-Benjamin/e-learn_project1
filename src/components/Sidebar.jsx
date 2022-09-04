import React from 'react'
import spin from "../spin/Logo.png"
import bluelogo from "../bluelogo/Vector.png"

export default function sidebar() {
  return (
    <div>
        <div className='flex absolute w-[1130px] h-[261px] bg-white shadow-2xl rounded-tl-3xl rounded-bl-3xl left-[310px] mt-[88px]'>
        <h1 className='w-[520px] h-[120px] text-[40px] leading-10 not-italic text-[#082183] ml-[43px] p-[70px] font-bold'>Over 500  plus courses in one place</h1>
        <img className='w-[199px] h-[76px] mt-[80px]' src={spin} alt="" />
        <img className='w-[105px] h-[89px] ml-32 mt-[78px]' src={bluelogo} alt="" />
        </div>
    </div>
  )
}
