'use client'

import { Sidebar } from "./controlbars/shapesControl"

const RightSidebar = () => {
  return (
    <div className=' right-0 flex flex-col gap-6  h-full  py-6 items-center  overflow-hidden overflow-y-hidden bg-[#080A0E] border border-[#12161B]  text-[rgb(38,37,55)] z-[15]'>
           {/* <ShapesControl/> */}
           <Sidebar/>
    </div>
  )
}

export default RightSidebar





