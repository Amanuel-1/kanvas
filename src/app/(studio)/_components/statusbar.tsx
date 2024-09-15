'use client'
import { CanvasSelector, useCanvasStore } from '@/app/lib/store/canvasStore'
import ZoomSlider from '@/components/ui/zoomSlider'

import { useShallow } from 'zustand/react/shallow'

const Statusbar = () => {
  const {elements}   = useCanvasStore(useShallow(CanvasSelector))
  return (
    <div className='flex gap-6 justify-between items-center bg-[#0f0d1a] w-full min-h-[1vh] max-h-[5vh]'>
      <div className='flex justify-between items-center h-[20vh]  px-4'>
        <div className='text-white font-bold'>Statusbar {elements.length}</div>
        <div className='flex items-center space-x-4'>
          <div className='text-white'>Zoom: 100%</div>
          <div className='text-white'>100 x 100</div>
        </div>
       <ZoomSlider/>
      </div>
      
    </div>
  )
}

export default Statusbar