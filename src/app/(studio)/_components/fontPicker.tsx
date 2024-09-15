import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CanvasSelector, useCanvasStore } from "@/app/lib/store/canvasStore";
import { useShallow } from "zustand/react/shallow";

export function FontPicker() {
  const { selectedElement, recordChange, setElements, elements } = useCanvasStore(useShallow(CanvasSelector));

  function handleFontChange(value: string): void {
    const newElements = elements.map((element) => {
      if (element.id === selectedElement.id) {
        return {
          ...element,
          style: {
            ...element.style,
            fontFamily: value,
          },
        };
      } else {
        return element;
      }
    });
    setElements(newElements);
    recordChange();
  }

  return (
    <>
      
      <Select onValueChange={handleFontChange}>
        <SelectTrigger className="w-[280px] ">
          <SelectValue className={`font-[${selectedElement?.style?.fontFamily}]`} placeholder={selectedElement?.style?.fontFamily}>{selectedElement.style.fontFamily}</SelectValue>
        </SelectTrigger>
        <SelectContent className="text-xl ">
          <SelectGroup className="max-h-[280px] ">
            <SelectLabel>Custom Fonts</SelectLabel>
            <SelectItem value="a-song-for-jennifer-bold">
              <span className="font-[a-song-for-jennifer-bold]">A Song For Jennifer Bold</span>
            </SelectItem>
            <SelectItem value="a-song-for-jennifer">
              <span className="font-[a-song-for-jennifer]">A Song For Jennifer</span>
            </SelectItem>
            <SelectItem value="angelina">
              <span className="font-[angelina]">Angelina</span>
            </SelectItem>
            <SelectItem value="apalu">
              <span className="font-[apalu]">Apalu</span>
            </SelectItem>
            <SelectItem value="a-typewriter-for-me">
              <span className="font-[a-typewriter-for-me]">A Typewriter For Me</span>
            </SelectItem>
            <SelectItem value="dancing-script-bold">
              <span className="font-[dancing-script-bold]">Dancing Script Bold</span>
            </SelectItem>
            <SelectItem value="dancing-script-regular">
              <span className="font-[dancing-script-regular]">Dancing Script Regular</span>
            </SelectItem>
            <SelectItem value="data-latin">
              <span className="font-[data-latin]">Data Latin</span>
            </SelectItem>
            <SelectItem value="data-unifon">
              <span className="font-[data-unifon]">Data Unifon</span>
            </SelectItem>
            <SelectItem value="embossed-germanica">
              <span className="font-[embossed-germanica]">Embossed Germanica</span>
            </SelectItem>
            <SelectItem value="fluted-germanica">
              <span className="font-[fluted-germanica]">Fluted Germanica</span>
            </SelectItem>
            <SelectItem value="glass-houses">
              <span className="font-[glass-houses]">Glass Houses</span>
            </SelectItem>
            <SelectItem value="karma-future">
              <span className="font-[karma-future]">Karma Future</span>
            </SelectItem>
            <SelectItem value="metalord">
              <span className="font-[metalord]">METALORD</span>
            </SelectItem>
            <SelectItem value="national-cartoon">
              <span className="font-[national-cartoon]">National Cartoon</span>
            </SelectItem>
            <SelectItem value="oblivious-font">
              <span className="font-[oblivious-font]">Oblivious Font</span>
            </SelectItem>
            <SelectItem value="chopic">
              <span className="font-[chopic]">Chopic</span>
            </SelectItem>
            <SelectItem value="digitalts-plum">
              <span className="font-[digitalts-plum]">Digitalts Plum</span>
            </SelectItem>
            <SelectItem value="ds-mysticora">
              <span className="font-[ds-mysticora]">Ds Mysticora</span>
            </SelectItem>
            <SelectItem value="grim-reaper">
              <span className="font-[grim-reaper]">Grim Reaper</span>
            </SelectItem>
            <SelectItem value="kg-happy">
              <span className="font-[kg-happy]">Kg Happy</span>
            </SelectItem>
            <SelectItem value="nasa">
              <span className="font-[nasa]">Nasa</span>
            </SelectItem>
            <SelectItem value="quite-magical-regular">
              <span className="font-[quite-magical-regular]">Quite Magical Regular</span>
            </SelectItem>
            <SelectItem value="roughen-corner-regular">
              <span className="font-[roughen-corner-regular]">Roughen Corner Regular</span>
            </SelectItem>
            <SelectItem value="sundiary">
              <span className="font-[sundiary]">Sundiary</span>
            </SelectItem>
            <SelectItem value="vacation-postcard">
              <span className="font-[vacation-postcard]">Vacation Postcard</span>
            </SelectItem>
            <SelectItem value="zibriqriq">
              <span className="font-[zibriqriq]">Vacation Postcard</span>
            </SelectItem>
            <SelectItem value="chiret-regular">
              <span className="font-[chiret-regular]">Vacation Postcard</span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
