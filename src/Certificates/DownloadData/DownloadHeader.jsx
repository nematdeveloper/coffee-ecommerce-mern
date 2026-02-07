import { Download } from 'lucide-react';
import React from 'react'
import { CiSearch } from "react-icons/ci";
const  DownloadHeader = () => {
  return (
    <div >
      <div className='flex justify-center mb-20 flex-col  items-center gap-5 mt-20'>
       
        <h3 className='text-3xl font-bold'>Download Files</h3>
        <p className='text-text-second'>Need a file? here are all files</p>
     <div className="relative w-[80%] ">
             {/* Search Icon */}
             <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
     
             {/* Input */}
             <input
               type="text"
               placeholder="Search"
               className="w-full h-[44px] bg-[#F3F3F3]  rounded-[8px] pl-10 pr-4 outline-none text-gray-700"
                  
              
             />
          
           </div>
      </div>
    </div>
  )
}

export default DownloadHeader