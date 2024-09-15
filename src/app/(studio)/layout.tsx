import { Inter } from "next/font/google";
import "@/app/globals.css";
import LeftSidebar from "./_components/leftSidebar";
import Navbar from "./_components/navbar";
import RightSidebar from "./_components/rightSidebar";
import Statusbar from "./_components/statusbar";
import Canvas from "./_components/canvas";
import Sheet from "./_components/sheet";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col h-screen overflow-hidden font-sans">
      <Navbar />
      <div className="flex flex-grow overflow-hidden max-w-[100vw]">
        <LeftSidebar />

        <div className="relative flex lg:flex-grow justify-center items-center max-w-[80vw]">
          <Sheet/>
          <Canvas/>
        </div>
        <RightSidebar />
      </div>
      <Statusbar />
    </div>
  );
};

export default layout;
