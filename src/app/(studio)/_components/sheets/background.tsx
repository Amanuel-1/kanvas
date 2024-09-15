"use client";
import { useState, useEffect, ChangeEvent, useContext } from "react";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEdgeStore } from "@/app/layouts/edgestoreProvider";
import { Element } from "@/types/canvasTypes";
import db from "@/lib/db";
import { sessionContext } from "@/app/layouts/sessionProvider";
import {
  CanvasSelector,
  useCanvasStore,
} from "@/app/lib/store/canvasStore";
import { useShallow } from "zustand/react/shallow";
import { record } from "zod";
import { AddToAsset, resizeImageUrl } from "@/actions/canvas.action";
// Define types for the Unsplash API response
interface UnsplashImage {
  id: string;
  urls: {
    thumb: string;
    full: string;
  };
  links: {
    download: string;
  };
}

interface UnsplashApiResponse {
  results: UnsplashImage[];
  total: number;
}

const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY";

const BackgroundsSheet = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [images, setImages] = useState<UnsplashImage[]>([] as UnsplashImage[]);
  const [imagePage, setImagePage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { edgestore } = useEdgeStore();
  const session = useContext(sessionContext);
  const { elements, setElements, recordChange,addElement,createElement } = useCanvasStore(
    useShallow(CanvasSelector)
  );
  useEffect(() => {
    const fetchImages = async () => {
      if (!searchTerm) return;
      const clientId = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!;
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>> ", clientId);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?client_id=${clientId}&query=${searchTerm}&per_page=20&page=${imagePage}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data: UnsplashApiResponse = await response.json();
        setImages([...images, ...data.results]);
        console.log("images", data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, imagePage]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImagePage(1);
    setImages([]);
    setSearchTerm(e.target.value);
   
  };

  const loadMoreImages = () => {

    setImagePage((prev) => prev + 1);
  }

  
  async function handleUploadAndChangeBackground(image: UnsplashImage) {
    try {
      // const imageResponse = await fetch(`${image.links.download}&client_id=${UNSPLASH_ACCESS_KEY}`);
  
      // if (!imageResponse.ok) {
      //   throw new Error(`Failed to download image: ${imageResponse.statusText}`);
      // }
  
      // const blob = await imageResponse.blob();
      // const imageFile = new File([blob], image.id, { type: blob.type });
  
      // const result = await edgestore.publicFiles.upload({
      //   file: imageFile,
      //   onProgressChange(progress) {
      //     // Handle progress bar
      //   },
      // });
  
      // if (!result.url) {
      //   throw new Error("Upload to EdgeStore failed. No URL returned.");
      // }
  
      const imageUrl = image.links.download;
      const asset = await AddToAsset(image.links.download, image.id, session?.user.id!);
      if(asset.success){
        alert("Asset created"+ JSON.stringify(asset))
      }
  
      // Set the background image to the frame canvas element
      const newElements = [...elements];
      const imageElement = addElement("image") as Element;
      imageElement.imgSrc = imageUrl;
      imageElement.style.width = "100%";
      imageElement.style.height = "100%";
      imageElement.style.top = "0";
      imageElement.style.left = "0";

      setElements([...newElements, imageElement]);
      recordChange();
    } catch (e) {
      console.error("Error uploading image:", e);
      alert(`Something went wrong: ${e}`);
      throw new Error("Failed to upload and change background image.");
    }
  }
  
  return (
    <ScrollArea className="sheet-container absolute -left-0 w-full h-full border-[#12161B] bg-[#080A0E] dark:border-[#0a0d10] dark:bg-gray-950">
      {/* header starts */}
      <div className="sheet-header flex flex-col gap-4 p-3">
        <p className="templates text-2xl font-sans text-[#A49DB5]">
          Backgrounds
        </p>

        <div className="search flex w-full">
          <input
            className="w-[90%] bg-[#0f1318] py-2 rounded-l-md focus:ring-0 text-[#A49DB5] px-3"
            type="text"
            name="search"
            id="search"
            placeholder="Search Unsplash..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button className="rounded-r-lg rounded-l-none">
            <FaSearch />
          </Button>
        </div>
      </div>
      {/* template list starts */}
      <div className="grid grid-cols-2 w-full gap-2 max-h-[80%] overflow-auto py-8 px-3">
        {isLoading && <p className="text-[#A49DB5]">Loading...</p>}
        {error && (
          <p className="text-[#FF6B6B]">Error fetching images: {error}</p>
        )}
        {images ? 
        (
         <>
          { images.map((image) => (
            <div
              key={image.id}
              onClick={(e) => handleUploadAndChangeBackground(image)}
              className="w-full h-[6rem] bg-cover bg-center rounded-lg cursor-pointer"
              style={{ backgroundImage: `url(${image.urls.thumb})` }}
            ></div>
          ))
          }
          <Button className="col-span-2" onClick={loadMoreImages}>load more ..</Button>
          </>
          
        ) : (
          <p className="text-[#A49DB5] w-full">
            No images found. Try searching for something else.
          </p>
        )}
      </div>
      {/* template list ends */}
    </ScrollArea>
  );
};

export default BackgroundsSheet;
