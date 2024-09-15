'use client'
import { Button } from "@/components/ui/button"
import {
    useCanvasStore,
    CanvasSelector,
    useSheetStore,
    SheetSelector,
  } from "@/app/lib/store/canvasStore";
import { FaSearch } from "react-icons/fa"
import { IoSquare,IoTriangle,IoEllipse ,IoStarSharp,IoHeartSharp} from "react-icons/io5";
import { PiHexagonFill ,PiPentagonFill,PiOctagonFill,PiPolygonFill,PiShieldFill} from "react-icons/pi";
import { useShallow } from "zustand/react/shallow";
import { ElementType } from "@/types/canvasTypes";
import { ScrollArea } from "@/components/ui/scroll-area";
const shapes  =[
    {
        id:1,
        name:'Rectangle',
        icon:<IoSquare/>,
        shapeType:"rectangle"
    },
    {
        id:2,
        name:'Ellipse',
        icon:<IoEllipse/>,
        shapeType:"ellipse"
    },
    {
        id:3,
        name:'Triangle',
        icon:<IoTriangle/>,
        shapeType:"triangle"
    },
    {
        id:6,
        name:'Star',
        icon:<IoStarSharp/>,
        shapeType:"star"
    },
    {
        id:7,
        name:'Heart',
        icon:<IoHeartSharp/>,
        shapeType:"heart"
    },
    {
        id:8,
        name:'Pentagon',
        icon:<PiPentagonFill/>,
        shapeType:"pentagon"
    },
    {
        id:9,
        name:'Hexagon',
        icon:<PiHexagonFill/>,
        shapeType:"hexagon"
    },
    {
        id:10,
        name:'Octagon',
        icon:<PiOctagonFill/>,
        shapeType:"octagon"
    },
    {
        id:11,
        name:'Polygon',
        icon:<PiPolygonFill/>,
        shapeType:"polygon"
    },
    
]
const ShapesSheet = () => {

    const { addElement, undo, redo, isUndoable } = useCanvasStore(
        useShallow(CanvasSelector)
      );
    return (

        <ScrollArea className="sheet-container absolute -left-0 flex flex-col items-center w-full h-full border-[#12161B] bg-[#080A0E] dark:border-[#0a0d10] dark:bg-gray-950 ">
        {/* header starts */}
        <div className="sheet-header flex flex-col gap-4 p-3 w-full">
            <p className="templates text-2xl font-sans text-[#A49DB5]">
                Shapes
            </p>
            
            <div className="search flex w-full">
                <input
                    className="w-[90%] bg-[#0f1318] py-2 rounded-l-md focus:ring-0 text-[#A49DB5] px-3"
                    type="text"
                    name="search"
                    id="search"
                />
                <Button className="rounded-r-lg rounded-l-none ">
                    <FaSearch />
                </Button>
            </div>
        </div>
        {/* template list starts */}
        <div  className=" grid grid-cols-3 w-full gap-2 max-h-[80%] overflow-auto py-8 px-3">
            {shapes.map((shape) => (
                <Button
                    key={shape.id}
                    size={"lg"}
                   onClick={()=>addElement(shape.shapeType as ElementType)}
                    className="w-full h-full  bg-[#0B0E12] rounded-lg  text-7xl text-[#5B5568] flex justify-center items-center hover:bg-[#140a1a5b]"
                >
                   {
                    shape.icon
                   }
                </Button>
            ))}
        </div>
        {/* template list ends  */}
        <Button className="col-span-3 ">Create your own templates</Button>
    </ScrollArea>
    )
  }
  
  export default ShapesSheet