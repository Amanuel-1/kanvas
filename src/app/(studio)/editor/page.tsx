'use client'
import { useRef } from "react";
import Moveable from "react-moveable";

export default function App() {
  const targetRef =  useRef<HTMLDivElement>(null);
  const target =  useRef<HTMLDivElement>(null);

    return (
        <div className="root" style={{
            paddingLeft: "100px",
            paddingTop: "100px",
        }}>
            <div className="" style={{
                transformOrigin: "0 0",
                clipRule: "evenodd",
                maskClip: "content-box",
            }}>
                <div  style={{
                    border: "1px solid black",
                    width: "200px",
                    height: "200px",
                }}>
                    <div className="w-40 h-40 bg-green-600"  ref={targetRef}/>
                    <div className="w-40 h-40 bg-green-600"  ref={target}/>

                </div>
                <Moveable
                    target={targetRef}
                    draggable={true}
                    rotatable={true}
                    scalable={true}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                ></Moveable>
                 
                
                <Moveable
                    target={target}
                    draggable={true}
                    rotatable={true}
                    scalable={true}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                ></Moveable>
            </div>
        </div>
    );
}