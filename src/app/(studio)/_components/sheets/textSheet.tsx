import {
  CanvasSelector,
  useCanvasStore,
} from "@/app/lib/store/canvasStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ElementType } from "@/types/canvasTypes";
import { FaSearch } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";

const TextSheet = () => {
  const { addElement } = useCanvasStore(useShallow(CanvasSelector));
  function handleCreateText(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    addElement("text" as ElementType);
  }

  return (
    <ScrollArea  className="sheet-container absolute -left-0 w-full h-full border-[#12161B] bg-[#080A0E] dark:border-[#0a0d10] dark:bg-gray-950 ">
      {/* header starts */}
      <div className="sheet-header flex flex-col gap-4 p-3">
        <p className="templates text-2xl font-sans text-[#A49DB5]">Texts</p>

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
      <div className=" grid grid-cols-2 w-full gap-2 max-h-[80%] overflow-auto py-8 px-3">
        <div
          onClick={handleCreateText}
          className="w-full h-[6rem] bg-[#0B0E12] rounded-lg cursor-pointer hover:hue-rotate-30"
        >
          Basic Text #1
        </div>
        <div className="w-full h-[6rem] bg-[#0B0E12] rounded-lg cursor-pointer hover:hue-rotate-30">
          Basic Text #2
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1].map((template) => (
          <div
            key={template}
            className="w-full h-[6rem] bg-[#0B0E12] rounded-lg"
          ></div>
        ))}
        <Button className="col-span-2">Create your own templates</Button>
      </div>
      {/* template list ends  */}
    </ScrollArea>
  );
};

export default TextSheet;
