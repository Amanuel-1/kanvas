import { Dialog, DialogContent, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import CanvasSnapShot from "./renderer";

export default function PreviewBtn() {
  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2">
        Preview
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-w-none p-0 bg-stone-950/25 backdrop-blur-sm">
        <DialogClose className="absolute top-4 right-4 flex gap-4 items-center justify-center z-50 px-3 py-1 text-white rounded">
          Close
        </DialogClose>
        <div className="w-full h-full flex items-center justify-center">
          <CanvasSnapShot />
        </div>
      </DialogContent>
    </Dialog>
  );
}