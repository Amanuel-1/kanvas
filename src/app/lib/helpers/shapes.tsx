
import { Frame } from "lucide-react";
import { IoSquare,IoTriangle,IoEllipse ,IoStarSharp,IoHeartSharp} from "react-icons/io5";
import { PiHexagonFill ,PiPentagonFill,PiOctagonFill,PiPolygonFill,PiShieldFill, PiTextT, PiImage} from "react-icons/pi";

export const ShapeToIconMap = {
    'frame':<Frame className="h-5 w-5"/>,
    'rectangle': <IoSquare className="h-5 w-5"/>,
    'ellipse': <IoEllipse className="h-5 w-5"/>,
    'triangle': <IoTriangle className="h-5 w-5"/>,
    'star': <IoStarSharp className="h-5 w-5"/> ,
    'heart': <IoHeartSharp className="h-5 w-5"/>,
    'pentagon': <PiPentagonFill className="h-5 w-5"/> ,
    'hexagon': <PiHexagonFill className="h-5 w-5"/>,
    'octagon': <PiOctagonFill className="h-5 w-5"/> ,
    'polygon': <PiPolygonFill className="h-5 w-5"/>,
    'text':<PiTextT className="h-5 w-5"/>,
    'image':<PiImage className="h-5 w-5"/>
};
