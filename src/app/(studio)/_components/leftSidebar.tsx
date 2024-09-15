'use client'
import {
  useCanvasStore,
  CanvasSelector,
  useSheetStore,
  SheetSelector,
} from "@/app/lib/store/canvasStore";
import { Button } from "@/components/ui/button";
import {
  LayoutTemplateIcon,
  ShapesIcon,
  TextIcon,
  ImageIcon,
  WallpaperIcon,
} from "lucide-react";
import React from "react";
import { useShallow } from "zustand/react/shallow";

import { FaBlackTie, FaRedo, FaSave, FaSearch, FaUndo } from "react-icons/fa";
import { LuLayoutGrid } from "react-icons/lu";
import { TbBackground } from "react-icons/tb";
import { FaDownload, FaRegImages } from "react-icons/fa6";
import { LuShapes } from "react-icons/lu";
import { RiText } from "react-icons/ri";
import ShapesSheet from "./sheets/shapesSheet";
import TemplatesSheet from "./sheets/templatesSheet";
import BackgroundsSheet from "./sheets/background";
import ImagesSheet from "./sheets/imagesSheet";
import TextSheet from "./sheets/textSheet";
import {Element} from "@/types/canvasTypes"
import { ScrollArea } from "@/components/ui/scroll-area";
const LeftSidebar = () => {
  const { addElement,setElements, undo, redo,isRedoable, isUndoable ,elements} = useCanvasStore(
    useShallow(CanvasSelector)
  );
  const {isSheetOpen,setSheetOpen,sheetContent,setSheetContent} = useSheetStore(useShallow(SheetSelector))

  const handleSheetDisplay = (content:React.ReactNode)=>{
    setSheetContent(content)
      setSheetOpen(true);

  }

  const handleSaveToLocal = ()=>{
    localStorage.setItem("elements",JSON.stringify(elements))
    alert("saved to local storage")
  }
  const handleLoadFromLocal  = ()=>{
    const elements = localStorage.getItem("elements")
    if(elements){
      setElements(JSON.parse(elements) as Element[])
      alert("loaded from local storage")
    }
  }

  return (
    <ScrollArea className="z-50">
      {/* <Sheet/> */}
      {/* tools starts */}
      <div className="relative border-r border-[#12161B]   bg-[#080A0E] px-2 py-6 dark:border-[#12161B] dark:bg-gray-950 h-full z-[200]">
        <div className="grid gap-1">
          <Button
            onClick={() => handleSheetDisplay(<TemplatesSheet/>)}
            className="flex flex-col gap-0 text-3xl text-[#6a5e86] hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2"
            size={null}
            variant="ghost"
          >
            <LuLayoutGrid className="h-4 w-4 font-semibold" />
            <small className="text-xs">Templates</small>
          </Button>
          <Button
            onClick={() =>handleSheetDisplay(<ShapesSheet/>)}
            className="flex flex-col gap-1 text-[#6a5e86] hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2"
            size={null}
            variant="ghost"
          >
            <LuShapes className="h-4 w-4 font-semibold" />
            <small className="text-xs">Shapes</small>
          </Button>
          <Button
            onClick={() => handleSheetDisplay(<TextSheet/>)}
            className="flex flex-col gap-1 text-[#6a5e86] hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2"
            size={null}
            variant="ghost" 
          >
            <RiText className="h-4 w-4 font-semibold" />
            <small className="text-xs">Text</small>
          </Button>
          <Button
            onClick={() => handleSheetDisplay(<ImagesSheet/>)}
            className="flex flex-col gap-1 text-[#6a5e86] hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2"
            size={null}
            variant="ghost"
          >
            <FaRegImages className="h-4 w-4 font-semibold" />
            <small className="text-xs">Image</small>
          </Button>
          <Button
          onClick={() => handleSheetDisplay(<BackgroundsSheet/>)}
            className="flex flex-col gap-1 text-[#6a5e86] hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2"
            size={null}
            variant="ghost"
          >
            <TbBackground className="h-4 w-4 font-semibold" />
            <small className="text-xs">Background</small>
          </Button>

          <Button
            onClick={undo}
            className={`flex flex-col gap-1 ${isUndoable?'text-[#1b8b34]':'text-[#503a31]'}  hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2`}
            size={null}
            variant="ghost"
          >
           <FaUndo className="h-4 w-4 font-semibold" />
           <small className="text-xs">undo</small>
          </Button>
          <Button
            className={`flex flex-col gap-1 ${isRedoable?'text-[#1b8b34]':'text-[#503a31]'}  hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2`}
            size={null}
            variant="ghost"
            onClick={redo}
          >
            <FaRedo className="h-4 w-4 font-semibold" />
            <small className="text-xs">redo</small>
          </Button>
          <Button
            className="flex flex-col gap-1 text-[#6a5e86] hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2"
            size={null}
            variant="ghost"
            onClick={handleSaveToLocal}
          >
            <FaSave className="h-4 w-4 font-semibold" />
            <small className="text-xs">save</small>
          </Button>
          <Button
            className="flex flex-col gap-1 text-[#6a5e86] hover:bg-[#2c1f37ab] hover:text-[#6a5e86] py-2"
            size={null}
            variant="ghost"
            onClick={handleLoadFromLocal}
          >
            <FaDownload className="h-4 w-4 font-semibold" />
            <small className="text-xs">load</small>
          </Button>

        </div>
      </div>
      
      {/* tools ends */}

    </ScrollArea>
  );
};

export default LeftSidebar;

