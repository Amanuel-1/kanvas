import React from "react";
import { Element } from "@/types/canvasTypes";
import {
  CanvasSelector,
  useCanvasStore,
} from "@/app/lib/store/canvasStore";
import { useShallow } from "zustand/react/shallow";

const CreateComponents = ({
  element,
  selectedElement,
  setSelectedElement,
}: {
  element: Element;
  selectedElement: Element;

  setSelectedElement: (el: Element) => void;
}) => {
  const { elements, setElements,recordChange } = useCanvasStore(useShallow(CanvasSelector));

  const handleElementClick = (
    e: React.MouseEvent<HTMLDivElement>,
    currentElement: Element
  ) => {
    setSelectedElement(currentElement);
  };
  const handleTextClicked = (targetElement: Element) => {
    const newElements = elements.map((element) => {
      if (element.id === targetElement.id) {
        return {
          ...element,
          contentEditable: !targetElement.contentEditable,
        };
      } else {
        return element;
      }
    });
    setElements(newElements);
    recordChange();
  };

  const handleTextChange = (e: React.ChangeEvent, element: Element) => {
    const newElements = elements.map((elmnt) => {
      if (elmnt.id == element.id) {
        return {
          ...element,
          text: e.currentTarget.textContent as string,
        };
      } else {
        return elmnt;
      }
    });

    setElements(newElements);
  };

  const toggleEditable = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return null;
    }

    element.contentEditable = "true";

    // console.log("got the element . toggle editable")
    // if (element.isContentEditable){
    //   element.contentEditable  = "false"
    //   element.style.cursor = "auto"
    // }
    // else {
    //   element.contentEditable = "true"
    //   element.style.cursor = "text"
    // }
  };
  const handleBlurText = (
    e: React.FocusEvent<HTMLDivElement>,
    element: Element
  ) => {
    e.currentTarget.contentEditable = "false";
    const newElements = elements.map((elmnt) => {
      if (elmnt.id == element.id) {
        return {
          ...element,
          text: e.currentTarget.textContent as string,
        };
      } else {
        return elmnt;
      }
    });

    setElements(newElements);
  };

  console.log("element created ", element);

  switch (element.type) {
    case "text":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            display: element.visible ? "flex" : "none",
            flexDirection: "row", // or "column", depending on your layout
            flexWrap: "wrap", // allows the content to wrap
            whiteSpace: "normal", // allows text to wrap normally
            wordBreak: "break-word", // breaks long words to fit within the container
            lineHeight: "1", // or any other value suitable for your design
            // overflow: "hidden", // hides overflow content
            // textOverflow: "ellipsis", // adds ellipsis for overflow text
            msTextAutospace: "ideograph-parenthesis",
            minHeight: "fit",
            minWidth: "fit",
          }}
          className={`${element.isParametrized ? "outline-dashed outline-[#b173c967]" : ""}`}
        >
          <p
            style={{
              cursor: element.contentEditable ? "text" : "cell",
            }}
            onBlur={(e) => handleBlurText(e, element)}
            contentEditable={element.contentEditable}
            onDoubleClick={(e) => handleTextClicked(element)}
          >
            {element.text}
          </p>

          {element.isParametrized && selectedElement && element.id == selectedElement.id ? (
            <div className="absolute top-0 right-0 bg-black text-[#bfb4da] text-2xl font-bold font-mono h-[5vh] px-4 rounded-bl-xl rounded-sm z-50  ">
              <small>{element.parameter?.name}</small>
            </div>
          ) : null}
          {/* <button onClick={()=>handleTextClicked(element)} className=" top-0 right-0 bg-blue-500 text-[50%] h-fit w-fit p-2 rounded-sm"><small>Edit</small></button>  */}
        </div>
      );
      break;
      case "image":
        return (
          <div
            key={element.id}
            id={element.id}
            onClick={(e) => handleElementClick(e, element)}
            style={{
              ...element.style,
              display: element.visible ? "block" : "none",
              backgroundImage: `url(${element.imgSrc})`,
              backgroundSize: 'contain',
              overflow:"hidden",
          
              // Remove width and height from inline style
              width: element.style.width,
              height: element.style.height,
            }}
            className="image-element"
          >
            <img style={{
              imageResolution:'from-image',
              width: "100%",
              height: "100%",
            }} 
            src={element.imgSrc} alt="image" />
          </div>
        );
        break;
    case "rectangle":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            display: element.visible ? "block" : "none",
          }}

          // className="rectangle no-clip"
        ></div>
      );
      break;
    case "ellipse":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            clipPath: "ellipse(50% 50% at 50% 50%)",
            display: element.visible ? "block" : "none",
          }}
          // className="ellipse"
        ></div>
      );
      break;
    case "triangle":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            display: element.visible ? "block" : "none",
          }}
          // className="triangle"
        ></div>
      );
      break;
    case "star":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            display: element.visible ? "block" : "none",
          }}
          // className="star"
        ></div>
      );
      break;
    case "heart":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            display: element.visible ? "block" : "none",
          }}
          // className="heart"
        ></div>
      );
      break;
    case "pentagon":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
            display: element.visible ? "block" : "none",
          }}
          // className="pentagon"
        ></div>
      );
      break;
    case "hexagon":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            display: element.visible ? "block" : "none",
          }}
          // className="hexagon"
        ></div>
      );
      break;
    case "octagon":
      return (
        <div
          key={element.id}
          id={element.id}
          onClick={(e) => handleElementClick(e, element)}
          style={{
            ...element.style,
            clipPath:
              "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%, 71% 100%, 29% 100%, 0% 71%, 0% 29%)",
            display: element.visible ? "block" : "none",
          }}
          className="octagon"
        ></div>
      );
      break;
  }
};

export default CreateComponents;
