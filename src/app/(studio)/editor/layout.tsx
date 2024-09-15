import LeftSidebar from "../_components/leftSidebar";
import Navbar from "../_components/navbar";
import RightSidebar from "../_components/rightSidebar";
import Statusbar from "../_components/statusbar";
import Toolbar from "../_components/toolbar";
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen bg-stone-600 font-sans">
      {/* <Navbar />
      <section className="flex w-full">
        <LeftSidebar />
        <div className="canvas-area w-full ">           */}
          {children}
        {/* </div>
        <RightSidebar />
      </section>
      <Statusbar /> */}
    </div>
  );
};

export default layout;
