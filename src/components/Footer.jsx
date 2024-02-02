// import React from 'react'

// export default function Footer() {
//   return (
//     <div className='bg-[#0D0C42] h-[269px] md:mt-[110px'>
//     <div className='grid grid-cols-3 text-white p-[50px] text-center place-items-center'>
//           <div>
//               <h1 className='p-7 '>
//               Ⓒ Copyright 2022 by Ritman University
//               </h1>
//           </div>

//           <div>
//                 <h1 className='font-bold p-7 text-[20px]'>
//                   Contact Us
//                 </h1>

//                 <h1 className='font-semibold'>
//                   Tel: +234 808 9835170
//                       +234 803 7044797
//                 </h1>
//                 <p>
//                   Email: info@ritmanuniversity.edu.ng
//                 </p>
//           </div>

//           <div>
//               <h1 className='font-bold p-7 text-[20px]'>
//                 Campus Address
//               </h1>
//               <p>
//                 104b Umahia road, Ikot Ekpene,
//                 Akwa Ibom State. Nigeria.
//               </p>
//           </div>
//       </div>
//     </div>
//   )
// }

import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#0D0C42] md:h-[269px] md:mt-[110px]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-0 gap-5 text-white p-[20px] md:p-[50px] text-center place-items-center">
        <div className="md:col-span-1 text-xl">
          <h1 className="font-bold p-3 md:p-7 text-[20px]">Contact Us</h1>
          <h1 className="font-semibold">
            Tel: +234 808 9835170 <br />
            +234 803 7044797
          </h1>
          <p>Email: info@ritmanuniversity.edu.ng</p>
        </div>

        <div className="md:col-span-1 text-xl">
          <h1 className="font-bold py-4 md:py-7 text-[20px]">Campus Address</h1>
          <p>
            104b Umahia road, Ikot Ekpene, <br />
            Akwa Ibom State. Nigeria.
          </p>
        </div>
        <div className="md:col-span-1 text-xl">
          <h1 className="py-4 md:py-7 font-semibold">
            Ⓒ Copyright 2022 by Ritman University
          </h1>
        </div>
      </div>
    </div>
  );
}
