import React from 'react'

export default function Footer() {
  return (
    <div className='bg-[#0D0C42] h-[269px] mt-[119px]'>
    <div className='grid grid-cols-3 text-white p-[50px] text-center place-items-center'>
          <div>
              <h1 className='p-7 '>
              Ⓒ Copyright 2022 by Ritman University
              </h1>
          </div>

          <div>
                <h1 className='font-bold p-7 text-[20px]'>
                  Contact Us
                </h1>

                <h1 className='font-semibold'>
                  Tel: +234 808 9835170 
                      +234 803 7044797
                </h1>
                <p>
                  Email: info@ritmanuniversity.edu.ng
                </p>
          </div>

          <div>
              <h1 className='font-bold p-7 text-[20px]'>
                Campus Address
              </h1>
              <p>
                104b Umahia road, Ikot Ekpene, 
                Akwa Ibom State. Nigeria.
              </p>
          </div>
      </div>
    </div>
  )
}
