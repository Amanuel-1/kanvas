import React from "react";

import { BiBorderRadius, BiCurrentLocation, BiDisc } from "react-icons/bi";
import { MdHorizontalRule, MdOutlineBorderColor } from "react-icons/md";
import { BsBorderWidth, BsLink } from "react-icons/bs";
import {
  CanvasSelector,
  useCanvasStore,
} from "@/app/lib/store/canvasStore";
import { useShallow } from "zustand/react/shallow";
import { Element } from "@/types/canvasTypes";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CgAlignBottom,
  CgAlignCenter,
  CgAlignLeft,
  CgAlignMiddle,
  CgAlignRight,
  CgAlignTop,
  CgBorderStyleDashed,
  CgBorderStyleDotted,
  CgBorderStyleSolid,
  CgEye,
  CgFormatText,
  CgLock,
  CgLockUnlock,
  CgSquare,
} from "react-icons/cg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parse } from "path";
import {
  PiLineSegmentThin,
  PiStamp,
  PiTextAlignCenter,
  PiTextAlignLeft,
} from "react-icons/pi";
import {
  ChevronDown,
  CornerDownLeft,
  CornerDownRight,
  EyeOff,
  ImageIcon,
  LucidePanelRight,
  PanelLeft,
} from "lucide-react";
import { ShapeToIconMap } from "@/app/lib/helpers/shapes";
import { cn } from "@/lib/utils";
import { FontPicker } from "../fontPicker";
import { ElementContextMenuWrapper } from "../elementContextMenu";
import ColorInput from "../colorInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
export const Sidebar = () => {
  const {
    selectedElement,
    elements,
    setElements,
    setSelectedElement,
    getElement,
    recordChange,
  } = useCanvasStore(useShallow(CanvasSelector));
  const [initialOpacity, initialFontSize] = [
    parseFloat(selectedElement?.style?.opacity as string) || 1,
    parseFloat(selectedElement?.style?.fontSize as string) || 5,
  ];
  // const  {handleChange,setGradient} = useColorPicker("",(value)=>{
  //   alert("color changed")
  // })
  const { setSolid, setGradient } = useColorPicker("rgb(250,10,200)",(value)=> handleControlWithValueChange(value, 'backgroundColor'));


  const handleAlignment = (
    e: React.MouseEvent,
    position: "left" | "right" | "center" | "top" | "bottom" | "middle"
  ) => {
    if (!selectedElement || !selectedElement.id) {
      console.error("No selected element or invalid ID");
      return;
    }

    const currentElement = getElement(selectedElement.id);
    if (!currentElement) {
      console.error("Current element not found");
      return;
    }

    const containerWidth = Math.max(
      1,
      parseFloat(elements[0]?.style?.width as string) || 1
    );
    const containerHeight = Math.max(
      1,
      parseFloat(elements[0]?.style?.height as string) || 1
    );
    const elementWidth =
      parseFloat((currentElement.style.width as string).substring(0, 5)) || 0;
    const elementHeight =
      parseFloat((currentElement.style.height as string).substring(0, 5)) || 0;
    const leftStr = (currentElement.style.left as string) || "0%";
    const topStr = (currentElement.style.top as string) || "0%";

    let left = parseFloat(leftStr);
    let top = parseFloat(topStr);

    switch (position) {
      case "left":
        left = 0;
        break;
      case "right":
        left = 100 - elementWidth;
        break;
      case "center":
        left = 50 - elementWidth / 2;
        break;
      case "top":
        top = 0;
        break;
      case "middle":
        top = 50 - elementHeight / 2;
        break;
      case "bottom":
        top = 100 - elementHeight;
        break;
    }

    const newElements = elements.map((element) =>
      element.id === selectedElement.id
        ? {
            ...element,
            style: { ...element.style, left: `${left}%`, top: `${top}%` },
          }
        : element
    );

    setElements(newElements);
    setSelectedElement({
      ...selectedElement,
      style: { ...selectedElement.style, left: `${left}%`, top: `${top}%` },
    });
  };



  function handleElementChange(
    e: React.ChangeEvent<any>,
    attribute: string,
    value: any
  ): void {
    const newElements = elements.map((element) => {
      if (element.id === selectedElement.id) {
        const newElement = {
          ...element,
          [attribute]: value,
        };
        // setSelectedElement(newElement);

        return newElement;
      }
      return element;
    });
    setElements(newElements);
    recordChange();
  }

  function handleBorderThickness(value: string): void {
    throw new Error("Function not implemented.");
  }

  function toggleVisibility(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    element: Element
  ): void {
    const newElements = elements.map((elements: Element) => {
      if (elements.id === element.id) {
        elements.visible = !elements.visible;
      }
      return elements;
    });

    setElements(newElements);
  }

  function toggleLock(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    element: Element
  ): void {
    const newElements = elements.map((elements: Element) => {
      if (elements.id === element.id) {
        elements.locked = !elements.locked;
      }
      return elements;
    });

    setElements(newElements);
  }

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

  const handleControlChange = (
    e: React.ChangeEvent<any> | React.MouseEvent,
    type: string,
    styleProperty: string,
    unit: string = ""
  ) => {
    if (!selectedElement || !selectedElement.id) {
      console.error("No selected element or invalid ID");
      return;
    }

    const value = e.target ? e.target.value : e;
    const newValue = `${value}${unit}`;
    const computedPair = computeValue(e, type, styleProperty, unit);

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

  function computeValue(
    e: React.ChangeEvent<any> | React.MouseEvent,
    type: string,
    styleProperty: string,
    unit: string = ""
  ) {
    let computedPair;
    if (type === "position") {
      const containerWidth = Math.max(
        1,
        parseFloat(elements[0]?.style?.width as string) || 1
      );
      const currentElement = getElement(selectedElement.id);
      if (!currentElement) {
        console.error("Current element not found");
        return;
      }
      const containerHeight = Math.max(
        1,
        parseFloat(elements[0]?.style?.height as string) || 1
      );

      const elementWidth =
        parseFloat((currentElement.style.width as string).substring(0, 5)) || 0;
      const elementHeight =
        parseFloat((currentElement.style.height as string).substring(0, 5)) ||
        0;
      const leftStr = (currentElement.style.left as string) || "0%";
      const topStr = (currentElement.style.top as string) || "0%";

      let left = parseFloat(leftStr);
      let top = parseFloat(topStr);

      switch (styleProperty) {
        case "left":
          left = 0;
          break;
        case "right":
          left = 100 - elementWidth;
          break;
        case "center":
          left = 50 - elementWidth / 2;
          break;
        case "top":
          top = 0;
          break;
        case "middle":
          top = 50 - elementHeight / 2;
          break;
        case "bottom":
          top = 100 - elementHeight;
          break;
      }

      computedPair = { left: `${left}%`, top: `${top}%` };
    } else {
      computedPair = { [styleProperty]: `${e.target.value}${unit}` };
      console.log(
        "these is the computed pair for height or width",
        computedPair
      );
    }

    return computedPair;
  }

  return (
    <div className="bg-transparent">
      <Tabs
        style={{
          minWidth: "200px",
          maxWidth: "300px",
        }}
        defaultValue="layers"
        color="primary"
        className="min-w-full w-[400px]"
      >
        <TabsList className="grid bg-transparent grid-cols-3 text-sm">
          <TabsTrigger value="layers">layers</TabsTrigger>
          <TabsTrigger value="actions">actions</TabsTrigger>
          <TabsTrigger value="parametric">Parametric</TabsTrigger>
        </TabsList>
        <TabsContent value="layers" className="h-[70vh] overflow-auto p-0 m-0">
          <ScrollArea>
            {elements.map((element: Element) => (
              <ElementContextMenuWrapper key={element.id} element={element}>
                <div
                  onClick={() => setSelectedElement(element)}
                  className={cn(
                    "flex items-center justify-between bg-transparent p-3  hover:-hue-rotate-15 text-sm cursor-pointer",
                    element.id === selectedElement?.id ? "bg-card" : ""
                  )}
                >
                  <div className="flex items-center gap-2 ">
                    {
                      ShapeToIconMap[
                        element.type as keyof typeof ShapeToIconMap
                      ]
                    }
                    <span className="text-primary">
                      {element.id.substring(0, 15)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={(e) => toggleVisibility(e, element)}
                      variant="ghost"
                      size="icon"
                      className=""
                    >
                      {element.visible ? (
                        <CgEye className="h-6 w-6" />
                      ) : (
                        <EyeOff className="h-6 w-6" />
                      )}
                      <span className="sr-only">Toggle visibility</span>
                    </Button>
                    <Button
                      onClick={(e) => toggleLock(e, element)}
                      variant="ghost"
                      size="icon"
                      className=""
                    >
                      {element.locked ? (
                        <CgLock className="h-6 w-6" />
                      ) : (
                        <CgLockUnlock className="h-6 w-6" />
                      )}
                      <span className="sr-only">Toggle lock</span>
                    </Button>
                  </div>
                </div>
              </ElementContextMenuWrapper>
            ))}
          </ScrollArea>
        </TabsContent>
        <ScrollArea>
          <TabsContent value="actions" className="text-[#6a5e86]">
            {selectedElement ? (
              <div className="h-[70vh] control-container  w-[80%] p-4  ">
                <div className="flex flex-col items-start justify-start gap-4    ">
                  <div className="flex flex-col gap-2 w-full my-2">
                    <Label htmlFor="alignment">Alignment</Label>
                    <div className="flex gap-2  justify-start">
                      <Button
                        onClick={(e) =>
                          handleControlChange(e, "position", "left", "%")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <CgAlignLeft className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Align Left</span>
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleControlChange(e, "position", "center", "%")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <CgAlignCenter className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Align Center</span>
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleControlChange(e, "position", "right", "%")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <CgAlignRight className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Align Right</span>
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleControlChange(e, "position", "top", "%")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <CgAlignTop className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Align Top</span>
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleControlChange(e, "position", "middle", "%")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <CgAlignMiddle className="h-6 w-6 text-muted-foreground" />
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleControlChange(e, "position", "bottom", "%")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <CgAlignBottom className="h-6 w-6 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        type="number"
                        disabled={!selectedElement?.id}
                        className="w-full max-w-[110px]"
                        // defaultValue={0}
                        value={
                          parseFloat(selectedElement?.style?.width as string) ||
                          0
                        }
                        onChange={(e) =>
                          handleControlChange(e, "size", "width", "%")
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        disabled={!selectedElement?.id}
                        className="w-full max-w-[110px]"
                        // defaultValue={parseFloat(selectedElement?.style?.height as string) || 0}
                        value={
                          parseFloat(
                            selectedElement?.style?.height as string
                          ) || 0
                        }
                        onChange={(e) =>
                          handleControlChange(e, "size", "height", "%")
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full ">
                    <Label htmlFor="opacity">Opacity</Label>
                    <Slider
                      id="opacity"
                      min={0}
                      max={1}
                      step={0.01}
                      value={[initialOpacity]} // Set the value directly from the selected element's style
                      className="h-5 w-3/4 [&>span:first-child]:h-1 [&>span:first-child]:bg-muted/50 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
                      onValueChange={(value) =>
                        handleControlWithValueChange(value, "opacity")
                      }
                      // Use the appropriate event handler
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="rotation">Rotation</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="rotation"
                        type="number"
                        className="w-full max-w-[110px]"
                        onChange={(e) =>
                          handleControlChange(e, "rotation", "rotate", "deg")
                        }
                        defaultValue={0}
                      />
                      <span>degrees</span>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="text">Text</Label>
                    <Textarea
                      id="text"
                      placeholder="Enter text..."
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <Label htmlFor="font">Font</Label>
                    <FontPicker />
                  </div>
                  <div className="flex flex-col gap-2 w-full ">
                    <Label htmlFor="fontSize">font size</Label>
                    <Slider
                      id="fontSize"
                      min={1}
                      max={15}
                      step={0.5}
                      value={[initialFontSize]}
                      className="h-5 w-3/4 [&>span:first-child]:h-1 [&>span:first-child]:bg-muted/50 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
                      onValueChange={(value) =>
                        handleControlWithValueChange(value, "fontSize", "rem")
                      }
                      // Use the appropriate event handler
                    />
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <Label htmlFor="rotation">Font weight</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <CgBorderStyleSolid className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm sr-only">
                            Border Thickness
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {[300, 500, 700, 800, 900].map((weight) => (
                          <DropdownMenuItem
                            key={weight}
                            onClick={() =>
                              handleControlWithValueChange(weight, "fontWeight")
                            }
                          >
                            <div className="flex items-center gap-2">
                              <MdHorizontalRule
                                className={cn(
                                  "h-4 w-4 text-muted-foreground",
                                  `font-[${weight}]`
                                )}
                              />
                              <span>{weight}</span>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-col display-center gap-2 w-full">
                    <Label htmlFor="font-size">Text Color</Label>
                    <ColorInput
                      value={selectedElement?.style?.color}
                      style="color"
                      onChange={(e) =>
                        handleControlChange(e, "color", "color", "")
                      }
                    />
                  </div>
                  <div className="flex flex-col display-center gap-2 w-full">
                    <Label htmlFor="font-size">Text stroke Color</Label>
                    <ColorInput
                      value={selectedElement?.style?.WebkitTextStrokeColor}
                      style="WebkitTextStrokeColor"
                      onChange={(e) =>
                        handleControlChange(
                          e,
                          "color",
                          "WebkitTextStrokeColor",
                          ""
                        )
                      }
                    />
                  </div>
                  <Input
                    id="borderTopLeftRadius"
                    type="number"
                    className="w-full max-w-[110px]"
                    defaultValue={0}
                    onChange={(e) =>
                      handleControlChange(
                        e,
                        "strokeWidth",
                        "WebkitTextStrokeWidth",
                        "px"
                      )
                    }
                  />

                  <div className="flex flex-col gap-2 w-full my-6">
                    <Label htmlFor="alignment">Alignment</Label>
                    <div className="flex gap-2  justify-start">
                      <Button
                        onClick={(e) =>
                          handleControlWithValueChange("left", "text-align")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <PiTextAlignLeft className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Align Left</span>
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleControlWithValueChange("center", "text-align")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <PiTextAlignCenter className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Align Center</span>
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleControlWithValueChange("right", "text-align")
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <PiTextAlignLeft className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Align right</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-2 w-full">
                    <Label htmlFor="font-size">Background Color</Label>
                    <ColorInput
                      value={selectedElement?.style?.background}
                      style="background"
                      onChange={(e) =>
                        handleControlChange(e, "color", "background", "")
                      }
                    />
                  </div>
                 
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="border-radius">Border Radius</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <CornerDownLeft className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Top Left</span>
                      </Button>
                      <Input
                        id="borderTopLeftRadius"
                        type="number"
                        className="w-full max-w-[110px]"
                        defaultValue={0}
                        onChange={(e) =>
                          handleControlChange(
                            e,
                            "borderRadius",
                            "borderTopLeftRadius",
                            "rem"
                          )
                        }
                      />
                      <Button variant="ghost" size="icon">
                        <CornerDownRight className="h-6 w-6  text-muted-foreground" />
                        <span className="text-sm sr-only">Top Right</span>
                      </Button>
                      <Input
                        id="borderTopRightRadius"
                        type="number"
                        className="w-full max-w-[110px]"
                        defaultValue={0}
                        onChange={(e) =>
                          handleControlChange(
                            e,
                            "border-radius",
                            "borderTopRightRadius",
                            "rem"
                          )
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <PanelLeft className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Bottom Left</span>
                      </Button>
                      <Input
                        id="borderBottomLeftRadius"
                        type="number"
                        className="w-full max-w-[110px]"
                        defaultValue={0}
                        onChange={(e) =>
                          handleControlChange(
                            e,
                            "border-radius",
                            "borderBottomLeftRadius",
                            "rem"
                          )
                        }
                      />
                      <Button variant="ghost" size="icon">
                        <LucidePanelRight className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm sr-only">Bottom Right</span>
                      </Button>
                      <Input
                        id="borderBottomRightRadius"
                        type="number"
                        className="w-full max-w-[110px]"
                        defaultValue={0}
                        onChange={(e) =>
                          handleControlChange(
                            e,
                            "border-radius",
                            "borderBottomRightRadius",
                            "rem"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="border-thickness">Border</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <PiStamp className="h-6 w-6 text-muted-foreground" />
                          <span className="text-sm sr-only">
                            Border Thickness
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2">
                            <PiStamp className="h-6 w-6 text-muted-foreground" />
                            <span>1px</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2">
                            <BsLink className="h-6 w-6 text-muted-foreground" />
                            <span>2px</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2">
                            <BiDisc className="h-6 w-6 text-muted-foreground" />
                            <span>3px</span>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2">
                            <PiStamp className="h-6 w-6 text-muted-foreground" />
                            <span>4px</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ) 
            : (
              <div className="flex flex-col py-32  h-full items-center px-3">
                <h1 className="font-bold text-secondary-foreground text-2xl">
                  No Actions
                </h1>
                <p className="   text-center ">
                  You haven&apos t selected any canvas element yet . select a
                  canvas element to peform some actions
                </p>
              </div>
            )}
          </TabsContent>
        </ScrollArea>
        <TabsContent value="parametric" className="p-4 text-[#6a5e86]">
          <ScrollArea>
            {selectedElement ? (
              <div className="h-screen control-container w-full">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="is-parametrized">Parametrized</Label>
                    <input
                      id="is-parametrized"
                      type="checkbox"
                      checked={selectedElement?.isParametrized}
                      onChange={(e) =>
                        handleElementChange(
                          e,
                          "isParametrized",
                          e.target.checked
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full my-6">
                    <Label htmlFor="parameter-name">Parameter Name</Label>
                    <Input
                      id="parameter-name"
                      type="text"
                      value={selectedElement.parameter?.name || ""}
                      placeholder="Enter parameter name"
                      onChange={(e) =>
                        handleElementChange(e, "parameter", {
                          name: e.currentTarget.value,
                          value: "",
                        })
                      }
                    />
                  </div>
                  {/* <div className="flex flex-col gap-2 w-full my-6">
            <Label htmlFor="parameter-value">Parameter Value</Label>
            <Input
              id="parameter-value"
              type="text"
              value={selectedElement.parameter?.value || ""}
              placeholder="Enter parameter value"
              onChange={(e) =>
                handleControlChange(e, "parameter", "value", "")
              }
            />
          </div> */}
                </div>
              </div>
            ) : (
              <div className="flex flex-col py-32 w-full h-full m-auto items-center px-3">
                <h1 className="font-bold text-secondary-foreground text-2xl text-center">
                  No Parametric Controls
                </h1>
                <p className="text-center">
                  You haven &apos t selected any canvas element yet. Select a canvas
                  element to set its parametric properties.
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
