"use client";
import { useRef, useEffect } from "react";

import Ruler from "@scena/react-ruler";
import Moveable, {
  OnDrag,
  OnResize,
  OnResizeEnd,
  OnRotate,
  OnRotateEnd,
} from "react-moveable";
import { Element, ElementType } from "@/types/canvasTypes";
import CreateComponents from "./createComponent";
import { useShallow } from "zustand/react/shallow";
import { ElementContextMenuWrapper } from "./elementContextMenu";
import { CanvasSelector, useCanvasStore } from "@/app/lib/store/canvasStore";
import RenderComp from "./RenderComponent";

export default function CanvasSnapShot() {

   
  const canvasRef = useRef<HTMLDivElement>(null);

  const {elements} = useCanvasStore(useShallow(CanvasSelector))

  return (
    <div className="">

      <div
        key={elements[0]?.id}
        style={{
            width:1200,
            height:630,
            ...elements[0]?.style,
            overflow:'hidden'
        }}
        className="canvas relative  scale-75 backdrop-blur-sm "
        ref={canvasRef}
      >
        {/* <Moveable target={canvasRef} /> */}
        <div className="z-50 absolute top-[-.5rem] bottom-[-.5rem] left-[-.5rem] right-[-.5rem] border-2 border-stone-800 h-[calc(100%+1rem)] w-[calc(100%+1rem)] rounded-lg pointer-events-none"></div>
        {elements.map((element, index) =>
          index > 0 ? (
            
              <RenderComp
              key={element.id}
              element={element}               
              />
              
          ) : null
        )}
     
      </div>
    </div>
  );
}
