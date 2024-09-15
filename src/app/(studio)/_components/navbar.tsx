"use client";
import React, { useContext } from "react";
import Brand from "./brand";
import CanvasBreadCrumb from "./canvasBreadCrumb";
import { sessionContext } from "@/app/layouts/sessionProvider";
import AvatarDropdown, { UserType } from "./AvatarDropdown";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CanvasSnapShot from "./renderer";
import PreviewBtn from "./previewBtn";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from "downloadjs";
import { useCanvasStore, CanvasSelector } from "@/app/lib/store/canvasStore";
import { useShallow } from "zustand/react/shallow";
import { Element } from "@/types/canvasTypes";
const Navbar = () => {
  const session = useContext(sessionContext);
  const router = useRouter();
  const { setSelectedElement } = useCanvasStore(useShallow(CanvasSelector));
  const handleImageDownload = () => {
    
    setSelectedElement({} as Element)
    const node = document.getElementById("canvas");
    if(!node) return;
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        download(dataUrl, 'my-node.png');
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };
  return (
    <nav className=" flex gap-3 justify-between items-center w-full bg-[rgb(8,10,14)] text-[#bfb5da]  text-lg px-2 border-b border-b-[#110d16] py-1 ">
      <div className="flex gap-4 items-center">
        <Brand />
        <CanvasBreadCrumb />
      </div>
      <div className="actions flex gap-3 items-center px-4">
        <div className="action-buttons flex gap-3">
          <PreviewBtn />
          <button onClick={()=>handleImageDownload()} className="save bg-secondary px-2 rounded-sm">
            Download
          </button>
        </div>
        <div className="user-actions w-full h-full">
          {session?.user ? (
            <AvatarDropdown user={session?.user as UserType} />
          ) : (
            <Button
              onClick={() => {
                router.push("/signin");
              }}
            >
              log in
            </Button>
          )}
          {/* <div className='w-8 h-8  rounded-full bg-stone-700' /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
