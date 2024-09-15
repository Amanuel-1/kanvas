"use client";
import {
  CanvasSelector,
  useCanvasStore,
} from "@/app/lib/store/canvasStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import ColorPicker from "react-best-gradient-color-picker";
import { useShallow } from "zustand/react/shallow";

export default function ColorInput({
  value,onChange,style}: {value: any;  onChange: (e: React.ChangeEvent) => void;style:string}) {
  const { selectedElement,setElements,elements,recordChange,setSelectedElement } = useCanvasStore(useShallow(CanvasSelector));
  const handleControlWithValueChange = (
    value: string| string[] | number |number[] | undefined,
    styleProperty: string,
    unit = ""
  ) => {
    if (!selectedElement || !selectedElement.id) {
      console.error("No selected element or invalid ID");
      return;
    }

    const computedPair = value?{ [styleProperty]: `${value}${unit}` } :{ [styleProperty]: undefined} ;
    const newElements = elements.map((element) =>
      element.id === selectedElement.id
        ? {
            ...element,
            style: { ...element.style, ...computedPair },
          }
        : element
    );

    setElements(newElements);
    recordChange();
    setSelectedElement({
      ...selectedElement,
      style: { ...selectedElement.style, ...computedPair },
    });
  };
  return (
    <div className="flex items-center gap-0 w-full">
    <Input 
    type="text"
    onChange={onChange}
    value={value}
    className="w-[90%] p-2 rounded-r-none border-r-none"
    />
     
      <Popover>
      <PopoverTrigger asChild>
      <div
        defaultValue={selectedElement?.style?.color}
        className="w-10 h-10 p-0 m-0  rounded-l-none border-l-none"
        style={{ background: value }}
       
      />
      </PopoverTrigger>
      <PopoverContent>
        <ColorPicker className="p-1 m-4"  hideColorGuide hideInputs height={100} width={260} value={value as string} onChange={(value)=>handleControlWithValueChange(value,style)}/>
      </PopoverContent>
      
      </Popover>
    </div>
  );
}
