export interface Element {
  id: string;
  parameter?:{name?:string, value?:string};
  isParametrized:boolean;
  imgSrc?:string;
  type: ElementType;
  text: string;
  style:React.CSSProperties;
  visible:boolean;
  locked:boolean;
  contentEditable:boolean;
  // x: number;
  // y: number;
  // width: number;
  // height: number;
  // imageSrc?: string;
  // angle: number;
}

export type ElementType =
  | "rectangle"
  | "triangle"
  | "ellipse"
  | "star"
  | "heart"
  | "pentagon"
  | "hexagon"
  | "octagon"
  | "polygon"
  | "image"
  | "text"
  | "background"
  | "frame";

//   export interface Element {
//     id: string;
//     type: ElementType;
//     text: string;
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     imageSrc?:string;
//     angle:number
//   }
