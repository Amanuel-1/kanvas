"use client";
import { useCanvasStore, CanvasSelector } from "@/app/lib/store/canvasStore";
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu";
import { DeleteElement, CopyElementProperties, CopyElement, PasteElementProperties, PasteElement, CutElement, DuplicateElement, BringForward, SendBackward,SendToBack,BringToFront } from "@/lib/canvasTools";
import { useShallow } from "zustand/react/shallow";
import CreateComponents from "./createComponent";
import { Element } from "@/types/canvasTypes";
export function ElementContextMenuWrapper({ element,children }: { element: Element,children:React.ReactNode }) {
  const { selectedElement, setSelectedElement } = useCanvasStore(
    useShallow(CanvasSelector)
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger className="">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => DeleteElement(element.id)} inset>
          Delete {element.type as string}
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Copy</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem onClick={() => CopyElementProperties(element)}>
              Copy Properties
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => CopyElement(element)}>
              Copy
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Paste</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem onClick={() => PasteElementProperties(element)}>
              Paste Properties
              <ContextMenuShortcut>⇧⌘+P</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => PasteElement(element)}>
              Paste
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuItem onClick={() => CutElement(element)} inset>
          Cut
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem onClick={() => DuplicateElement(element)} inset>
          Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem onClick={() => BringToFront(element)} inset>
          Bring to Front
        </ContextMenuItem>
        <ContextMenuItem onClick={() => SendToBack(element)} inset>
          Send to Back
        </ContextMenuItem>
        <ContextMenuItem onClick={() => BringForward(element)} inset>
          Bring Forward
        </ContextMenuItem>
        <ContextMenuItem onClick={() => SendBackward(element)} inset>
          Send Backward
        </ContextMenuItem>

        <ContextMenuSeparator />

        {/* <ContextMenuCheckboxItem
          checked={element.locked}
          onCheckedChange={() => element.locked ? UnlockElement(element) : LockElement(element)}
        >
          {element.locked ? 'Unlock' : 'Lock'}
        </ContextMenuCheckboxItem>

        <ContextMenuCheckboxItem
          checked={element.visible}
          onCheckedChange={() => element.visible ? hideElement(element) : showElement(element)}
        >
          {element.visible ? 'Hide' : 'Show'}
        </ContextMenuCheckboxItem> */}

        <ContextMenuSeparator />
{/* 
        <ContextMenuItem onClick={() => GroupElements([element])} inset>
          Group
        </ContextMenuItem>

        <ContextMenuItem onClick={() => UngroupElements([element])} inset>
          Ungroup
        </ContextMenuItem> */}
      </ContextMenuContent>
    </ContextMenu>
  );
}
