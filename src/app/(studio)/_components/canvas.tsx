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

export default function Canvas() {
  const {
    selectedElement,
    setSelectedElement,
    elements,
    setElements,

    recordChange,
    zoomfactor,
    setZoomFactor,
    getElement,
    history,
  } = useCanvasStore(useShallow(CanvasSelector));

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("elements have been changed.", elements);
    // recordChange();
    const currentElement = getElement(selectedElement?.id) as Element;
    // setSelectedElement(getElement(selectedElement.id) as Element);
    console.log("🚀🚀🚀🚀🚀", JSON.stringify(elements));
    setSelectedElement(currentElement);
    // console.log('🔥🔥🔥🔥🔥',selectedElement.style.top,selectedElement.style.left)
  }, [elements, recordChange]);

  const handleElementClick = (
    e: React.MouseEvent<HTMLDivElement>,
    currentElement: Element
  ) => {
    setSelectedElement(currentElement);
  };

  const addElement = (type: ElementType) => {
    const newElement: Element = {
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      text: type === "text" ? "Double click to edit" : "",
      visible: true,
      locked: false,
      contentEditable: false,
      isParametrized: false,
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        border: "1px solid",
        resize: "both",
        overflow: "visible",
        cursor: "move",
        backgroundSize: "cover",
        backgroundImage: "green",
        width: 100,
        height: 100,
      },
    };
    setElements([...elements, newElement]);
  };

  const handleDoubleClick = (id: string) => {
    const newElements = elements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          text: prompt("Enter text:", element.text) || element.text,
        };
      } else {
        return element;
      }
    });
    setElements(newElements);
  };

  const toPercent = (value: number, total: number) => (value / total) * 100;

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    // if the ctrl key is pressed
    if (event.ctrlKey) {
      const zoomStep = 0.1;
      const newZoomScale =
        zoomfactor + (event.deltaY > 0 ? -zoomStep : zoomStep);

      elements[0].style.transformOrigin = `${event.x}px ${event.y}px`;
      // Ensure the new zoom scale is within the desired range
      setZoomFactor(Math.min(Math.max(newZoomScale, 0.1), 2));
    }
  };

  useEffect(() => {
    // Attach the wheel event listener
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [zoomfactor]);

  return (
    <div className="z-0 flex flex-grow items-center justify-center h-full w-[70vw] text-[#473a66] bg-black overflow-auto">
      <Ruler
        lineColor="#473a66"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "30px",
          zIndex: 100,
        }}
        backgroundColor="#080A0E"
        scrollPos={0}
        textColor="#272b30"
        type="horizontal"
        ref={(e) => {
          console.log("ruler", e);
        }}
      />
      <Ruler
        lineColor="#473a66"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "30px",
          height: "100%",
          zIndex: 100,
        }}
        backgroundColor="#080A0E"
        textColor="#272b30"
        type="vertical"
        ref={(e) => {
          console.log("ruler", e);
        }}
      />
      <div style={{
        position:"absolute",
        
        width:1200,
        height:630,
        scale:zoomfactor,
        

      }} className="absolute scale-50">
        <div
          key={elements[0]?.id}
          id="canvas"
          style={{ ...elements[0]?.style }}
          className="canvas relative bg-[#ffddf4c2] backdrop-blur-sm"
          ref={canvasRef}
        >
          {/* <Moveable target={canvasRef} /> */}
          <div className="z-50 absolute top-[-.5rem] bottom-[-.5rem] left-[-.5rem] right-[-.5rem] border-2 border-stone-800 h-[calc(100%+1rem)] w-[calc(100%+1rem)] rounded-lg pointer-events-none"></div>
          {elements.map((element, index) =>
            index > 0 ? (
              <ElementContextMenuWrapper key={element.id} element={element}>
                <CreateComponents
                  key={element.id}
                  element={element}
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                />
              </ElementContextMenuWrapper>
            ) : null
          )}
          {selectedElement?.id && !selectedElement.locked && (
            <Moveable
              originRelative={true}
              target={`#${selectedElement.id}`}
              container={null}
              origin={true}
              className="z-50 transformer fixed"
              draggable={!selectedElement.contentEditable}
              edge={false}
              throttleDrag={0}
              onDrag={({ target, left, top }: OnDrag) => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const canvasWidth = canvas.offsetWidth;
                const canvasHeight = canvas.offsetHeight;

                const leftPercent = toPercent(left, canvasWidth);
                const topPercent = toPercent(top, canvasHeight);

                target.style.left = `${leftPercent}%`;
                target.style.top = `${topPercent}%`;
              }}
              onDragEnd={({ target }) => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const newElements = elements.map((el) => {
                  if (el.id === selectedElement.id) {
                    return {
                      ...el,
                      style: {
                        ...el.style,
                        left: target.style.left,
                        top: target.style.top,
                      },
                    };
                  }
                  return el;
                });

                setElements(newElements);
                recordChange();
              }}
              keepRatio={false}
              resizable={!selectedElement.contentEditable}
              throttleResize={0}
              onResize={({ target, width, height, drag }: OnResize) => {
                const canvas = canvasRef.current;
                if (!canvas) return;

                const canvasWidth = canvas.offsetWidth;
                const canvasHeight = canvas.offsetHeight;

                const widthPercent = toPercent(width, canvasWidth);
                const heightPercent = toPercent(height, canvasHeight);

                target.style.width = `${widthPercent}%`;
                target.style.height = `${heightPercent}%`;
                // target.style.transform = drag.transform;
                // target.style.cssText += `width: ${target.style.width}; height: ${target.style.height}`;
              }}
              onResizeEnd={({ lastEvent }: OnResizeEnd) => {
                const canvas = canvasRef.current;
                if (!canvas || !lastEvent) return;

                const newElements = elements.map((el) => {
                  if (el.id === selectedElement.id) {
                    const canvasWidth = canvas.offsetWidth;
                    const canvasHeight = canvas.offsetHeight;
                    const widthPercent = toPercent(
                      lastEvent.width,
                      canvasWidth
                    );
                    const heightPercent = toPercent(
                      lastEvent.height,
                      canvasHeight
                    );

                    return {
                      ...el,
                      style: {
                        ...el.style,
                        width: `${widthPercent}%`,
                        height: `${heightPercent}%`,
                      },
                    };
                  }
                  return el;
                });

                setElements(newElements);
                recordChange();
              }}
              rotatable={!selectedElement.contentEditable}
              throttleRotate={0}
              onRotate={({ target, transform }: OnRotate) => {
                target.style.transform = transform;
              }}
              onRotateEnd={({ lastEvent }: OnRotateEnd) => {
                const newElements = elements.map((el) => {
                  if (el.id === selectedElement.id) {
                    return {
                      ...el,
                      style: {
                        ...el.style,
                        transform: lastEvent?.transform,
                      },
                    };
                  }
                  return el;
                });

                setElements(newElements);
                recordChange();
              }}
              pinchable={!selectedElement.contentEditable}
              renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export interface RulerInterface {
  scroll(scrollPos: number): any;
  resize(): any;
}

export interface RulerProps {
  type?: "horizontal" | "vertical";
  width?: number;
  height?: number;
  unit?: number;
  zoom?: number;
  direction?: "start" | "end";
  style?: React.CSSProperties;
  backgroundColor?: string;
  lineColor?: string;
  textColor?: string;
  textFormat?: (scale: number) => string;
}
