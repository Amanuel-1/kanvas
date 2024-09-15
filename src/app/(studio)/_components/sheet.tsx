'use client'

import { SheetSelector, useSheetStore } from "@/app/lib/store/canvasStore"
import { Button } from "@/components/ui/button"
import { FaSearch } from "react-icons/fa"
import { useShallow } from "zustand/react/shallow"


const Sheet = () => {
    const { isSheetOpen, setSheetOpen, sheetContent, setSheetContent } = useSheetStore(
        useShallow(SheetSelector)
    )

    const handleSheetOpenClose = () => {
        setSheetOpen(!isSheetOpen)
    }

    return (
        <div
            className={`absolute left-3 w-[28rem] z-40  h-[calc(100%-15px)] rounded-md border-r-2 border-r-[#52447c] transition-all duration-500 ${
                isSheetOpen ? 'translate-x-0 ' : '-translate-x-[102.5%] pointer-events-none z-40'
            }`}
        >
            <div
                onClick={handleSheetOpenClose}
                className="flex justify-center absolute -right-4 top-1/2  -translate-y-1/2 w-4 h-14 bg-[#6a5e86] items-center text-center align-middle text-2xl font-extrabold text-[#1c1b1e] rounded-r-xl z-50 cursor-pointer hover:bg-stone-800"
            >
                :
            </div>
            {
                sheetContent
            }
            {/* sheet containers go here  */}
        </div>
    )
}

export default Sheet
