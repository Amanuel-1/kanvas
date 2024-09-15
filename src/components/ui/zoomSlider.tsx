'use client'

import { CanvasSelector, useCanvasStore } from "@/app/lib/store/canvasStore";
import { useShallow } from "zustand/react/shallow";

const ZoomSlider = () => {
  const {zoomfactor,setZoomFactor}=useCanvasStore(useShallow(CanvasSelector))
  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoomFactor(parseFloat(event.target.value));
  };

  return (
    <div>
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.1"
        value={zoomfactor}
        onChange={handleZoomChange}
        style={{ width: '100%' }}
      />
      <p className="text-lg font-bold">Zoom: {zoomfactor}x</p>
    </div>
  );
};

export default ZoomSlider;
