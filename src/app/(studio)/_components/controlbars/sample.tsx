import { CanvasSelector, useCanvasStore } from "@/app/lib/store/canvasStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@radix-ui/react-slider";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
  ChevronsLeftRightIcon,
  AlignVerticalJustifyCenter,
  LucideImageDown,
  AlignHorizontalSpaceBetween,
  AlignHorizontalSpaceAround,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalJustifyEndIcon,
  AlignVerticalJustifyStart,
} from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { FontPicker } from "../fontPicker";

export default function Sample() {
  
    const {elements,selectedElement,setElements,getElement,recordChange} = useCanvasStore(useShallow(CanvasSelector))

  const handleOnChanges = (e: any) => {
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    const newElements = elements.map((element) => {
      if (element.id === selectedElement.id) {
        return {
          ...element,
          styles: { ...element.style, ...styleObject },
        };
      }
      return element;
    })
    
  };
  function computeValue(
    e: React.ChangeEvent<any> | React.MouseEvent,
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


  const handleControlChange = (
    e: React.ChangeEvent<any> | React.MouseEvent,
    unit: string = ""
  ) => {

    const styleProperty = e.target.id;

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

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Typography", "Dimensions", "Decorations", "Flexbox"]}
    >
      <AccordionItem value="Custom" className="px-6 py-0  ">
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        {/* <AccordionContent>
          {selectedElement.type === "link" &&
            !Array.isArray(selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https:domain.example.com/pathname"
                  onChange={handleChangeCustomValues}
                  value={selectedElement.content.href}
                />
              </div>
            )}
        </AccordionContent> */}
      </AccordionItem>
      <AccordionItem value="Typography" className="px-6 py-0  border-y-[1px]">
        <AccordionTrigger className="!no-underline">
          Typography
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-2 ">
            <p className="text-muted-foreground">Text Align</p>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "textAlign",
                    value: e,
                  },
                })
              }
              value={selectedElement?.style?.textAlign}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="left"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignLeft size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="right"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignRight size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="center"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignCenter size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="justify"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                >
                  <AlignJustify size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Font Family</p>
            <FontPicker />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Color</p>
            <Input
              id="color"
              onChange={handleOnChanges}
            //   value={selectedElement?.style?.color}
            />
          </div>
          <div className="flex gap-4">
            <div>
              <Label className="text-muted-foreground">Weight</Label>
              <Select
                onValueChange={(e) =>
                  handleOnChanges({
                    target: {
                      id: "font-weight",
                      value: e,
                    },
                  })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Font Weights</SelectLabel>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="normal">Regular</SelectItem>
                    <SelectItem value="lighter">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <Input
                placeholder="px"
                id="fontSize"
                onChange={handleOnChanges}
                value={selectedElement.style?.fontSize}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className=" px-6 py-0 ">
        <AccordionTrigger className="!no-underline">
          Dimensions
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input
                      id="height"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.height}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Width</Label>
                    <Input
                      placeholder="px"
                      id="width"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.width}
                    />
                  </div>
                </div>
              </div>
              <p>Margin px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      id="marginTop"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.marginTop}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="marginBottom"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.marginBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="marginLeft"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.marginLeft}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="marginRight"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.marginRight}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Padding px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      placeholder="px"
                      id="paddingTop"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.paddingTop}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="paddingBottom"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.paddingBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="paddingLeft"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.paddingLeft}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="paddingRight"
                      onChange={handleOnChanges}
                      value={selectedElement.style?.paddingRight}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations" className="px-6 py-0 ">
        <AccordionTrigger className="!no-underline">
          Decorations
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">
                {typeof selectedElement.style?.opacity ===
                "number"
                  ? selectedElement.style?.opacity
                  : parseFloat(
                      (
                        selectedElement.style?.opacity || "0"
                      ).replace("%", "")
                    ) || 0}
                %
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "opacity",
                    value: `${e[0]}%`,
                  },
                });
              }}
              defaultValue={[
                typeof selectedElement.style?.opacity === "number"
                  ? selectedElement.style?.opacity
                  : parseFloat(
                      (
                        selectedElement.style?.opacity || "0"
                      ).replace("%", "")
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>
          <div>
            <Label className="text-muted-foreground">Border Radius</Label>
            <div className="flex items-center justify-end">
              <small className="">
                {typeof selectedElement.style?.borderRadius ===
                "number"
                  ? selectedElement.style?.borderRadius
                  : parseFloat(
                      (
                        selectedElement.style?.borderRadius || "0"
                      ).replace("px", "")
                    ) || 0}
                px
              </small>
            </div>
            <Slider
              onValueChange={(e) => {
                handleOnChanges({
                  target: {
                    id: "borderRadius",
                    value: `${e[0]}px`,
                  },
                });
              }}
              defaultValue={[
                typeof selectedElement.style?.borderRadius ===
                "number"
                  ? selectedElement.style?.borderRadius
                  : parseFloat(
                      (
                        selectedElement.style?.borderRadius || "0"
                      ).replace("%", "")
                    ) || 0,
              ]}
              max={100}
              step={1}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex  border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundColor:
                    selectedElement.style?.backgroundColor,
                }}
              />
              <Input
                placeholder="#HFI245"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundColor"
                onChange={handleOnChanges}
                value={selectedElement.style?.backgroundColor}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex  border-[1px] rounded-md overflow-clip">
              <div
                className="w-12 "
                style={{
                  backgroundImage:
                    selectedElement.style?.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                onChange={handleOnChanges}
                value={selectedElement.style?.backgroundImage}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <Tabs
              onValueChange={(e) =>
                handleOnChanges({
                  target: {
                    id: "backgroundSize",
                    value: e,
                  },
                })
              }
              value={selectedElement.style?.backgroundSize?.toString()}
            >
              <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                <TabsTrigger
                  value="cover"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <ChevronsLeftRightIcon size={18} />
                </TabsTrigger>
                <TabsTrigger
                  value="contain"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <AlignVerticalJustifyCenter size={22} />
                </TabsTrigger>
                <TabsTrigger
                  value="auto"
                  className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                >
                  <LucideImageDown size={18} />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="px-6 py-0  ">
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent>
          <Label className="text-muted-foreground">Justify Content</Label>
          <Tabs
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: "justifyContent",
                  value: e,
                },
              })
            }
            value={selectedElement.style?.justifyContent}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger
                value="space-between"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalSpaceBetween size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="space-evenly"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalSpaceAround size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="center"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignHorizontalJustifyCenterIcon size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="start"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted "
              >
                <AlignHorizontalJustifyStart size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="end"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted "
              >
                <AlignHorizontalJustifyEndIcon size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Label className="text-muted-foreground">Align Items</Label>
          <Tabs
            onValueChange={(e) =>
              handleOnChanges({
                target: {
                  id: "alignItems",
                  value: e,
                },
              })
            }
            value={selectedElement.style?.alignItems}
          >
            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
              <TabsTrigger
                value="center"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
              >
                <AlignVerticalJustifyCenter size={18} />
              </TabsTrigger>
              <TabsTrigger
                value="normal"
                className="w-10 h-10 p-0 data-[state=active]:bg-muted "
              >
                <AlignVerticalJustifyStart size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2">
            <Input
              className="h-4 w-4"
              placeholder="px"
              type="checkbox"
              id="display"
              onChange={(va) => {
                handleOnChanges({
                  target: {
                    id: "display",
                    value: va.target.checked ? "flex" : "block",
                  },
                });
              }}
            />
            <Label className="text-muted-foreground">Flex</Label>
          </div>
          <div>
            <Label className="text-muted-foreground"> Direction</Label>
            <Input
              placeholder="px"
              id="flexDirection"
              onChange={handleOnChanges}
              value={selectedElement.style?.flexDirection}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
