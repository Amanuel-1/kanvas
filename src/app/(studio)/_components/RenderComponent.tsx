import React from "react";
import { Element } from "@/types/canvasTypes";

const RenderComp = ({
  element,
  params,
}: {
  element: Element;
  params?: URLSearchParams;
}) => {
  // console.log("element created " ,element)

  switch (element.type) {
    case "text":
      const substitute_text = params?.get(element?.parameter?.name as string);

      if (element.isParametrized && substitute_text) {
        element.text = substitute_text;
      }

      if ((element.style.background as string).includes("gradient")) {
        element.style.backgroundImage = element.style.background as string;
        element.style.background = "";
        console.log(element.style.backgroundImage)
      }

      return (
        <div
          key={element.id}
          id={element.id}
          style={{
            ...element.style,
            // display: element.visible ? "flex" : "none",
            // flexDirection: "row", // or "column", depending on your layout
            // flexWrap: "wrap", // allows the content to wrap
            // whiteSpace: "normal", // allows text to wrap normally
            // wordBreak: "break-word", // breaks long words to fit within the container
            // lineHeight: "1", // or any other value suitable for your design
            // // overflow: "hidden", // hides overflow content
            // // textOverflow: "ellipsis", // adds ellipsis for overflow text
            // msTextAutospace: "ideograph-parenthesis",
            // minHeight:'fit',
            // minWidth:'fit',
          }}
        >
          {element.text}
        </div>
      );
      break;
    case "image":
      return (
        <div
          key={element.id}
          id={element.id}
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
          style={{
            display: "flex",
            ...element.style
          }}

          // className="rectangle no-clip"
        >
          <pre style={{fontSize:"0.5rem",textWrap:'pretty'}}>{JSON.stringify(element.style)}</pre>
          {/* {(element.style.backgroundImage as string).length > 0 ? "not showing":"nothing to show"} */}
           </div>
      );
      break;
    case "ellipse":
      return (
        <div
          key={element.id}
          id={element.id}
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

export default RenderComp;
