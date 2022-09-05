import React from 'react'

function Card({ headerImage, headOne, headTwo, backgroundColor }) {
  return (
    <div className={`w-[351px] h-[321px] ${backgroundColor} rounded-[20px]`}>
        <div className='flex justify-center items-center pt-[38px]'>
            <div className='bg-white rounded-full w-[123px] h-[123px] flex justify-center items-center'>
                <img src={headerImage} alt="" />
            </div>
        </div>
        <div className='text-center pt-[33px]'>
            <h4 className='text-white font-[500] leading-[42px] text-[28px]'>{headOne}<br />{headTwo}</h4>
        </div>
    </div>
  )
}

export default Card;