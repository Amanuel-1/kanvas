import { create } from "zustand";
import { Element, ElementType } from '@/types/canvasTypes';
import { nanoid } from "nanoid";

// initial nodes and edges

const storedDiagram =
  typeof window !== "undefined" ? window.localStorage.getItem("Diagram") : null;

type HistoryState = {
  past: Array<Element[]>;
  future: Array<Element[]>;
};

const initialElements = [
  {
    id: "g9g6ljxhj",
    type: "frame",
    style: {
      position: "relative",
      display: "flex",
      left: 0,
      top: 0,
      resize: "both",
      overflow: "visible",
      cursor: "move",
      background: "#100c1d",
      width: 1200,
      height: 630
    }
  },
  // ... other initial elements ...
];

const initialSheetState = '<div>this is a test </div>';

export type CanvasState = {

  elements: Element[];
  setElements: (newElements: Element[]) => void;
  createElement: (element: Element) => void;
  addElement: (type: ElementType) => Element;
  getElement: (elementId: string) => Element | undefined;
  selectedElement: Element;
  setSelectedElement: (element: Element) => void;
  isRecordable: boolean;
  recordChange: () => void;
  setIsRecordable: (value: boolean) => void;
  isUndoable: boolean;
  isRedoable: boolean;
  setIsUndoable: (value: boolean) => void;
  setIsRedoable: (value: boolean) => void;
  undo: () => void;
  redo: () => void;
  history: HistoryState;
  zoomFactor: number;
  setZoomFactor: (factor: number) => void;
};

export type SheetState = {
  isSheetOpen: boolean;
  setSheetOpen: (value: boolean) => void;
  sheetContent: React.ReactNode;
  setSheetContent: (content: React.ReactNode) => void;
}

const useCanvasStore = create<CanvasState>((set, get) => ({
  elements: (storedDiagram ? JSON.parse(storedDiagram) : initialElements) as Element[],
  selectedElement: {} as Element,
  isRecordable: true,
  isUndoable: false,
  isRedoable: false,
  history: {
    past: [initialElements as Element[]],
    future: []
  },
  setElements: (newElements: Element[]) => set({ elements: newElements }),

  getElement: (elementId: string) => get().elements.find((elm) => elm.id === elementId) as Element,

  createElement: (newElement: Element) => {
    const existingElement = get().getElement(newElement.id);
    if (existingElement) {
      console.warn("an element already exists. overriding the element");
      get().elements.map((element: Element, index) => {
        if (element.id === newElement.id) {
          get().elements[index] = newElement;
        }
      });
    } else {
      set({ elements: [...get().elements, newElement] });
    }
  },

  setSelectedElement: (element: Element) => set({ selectedElement: element }),

  setIsRecordable: (value) => set({ isRecordable: value }),

  setIsUndoable: (value) => set({ isUndoable: value }),

  setIsRedoable: (value) => set({ isRedoable: value }),

  undo: () => {
    const { past, future } = get().history;
    if (past.length === 1) return;

    const previous = past[past.length - 2];
    set({
      elements: previous,
      history: {
        past: past.slice(0, past.length - 1),
        future: [get().elements, ...future]
      }
    });

    if (get().history.past.length === 1) {
      get().setIsUndoable(false);
    }
    if (get().history.future.length > 0) {
      get().setIsRedoable(true);
    }
   console.log("history-undo",get().history)

  },

  redo: () => {
    const { past, future } = get().history;
    if (future.length === 0) return;

    const next = future[0];
    set({
      elements: next,
      history: {
        past: [...past, next],
        future: future.slice(1)
      }
    });

    if (get().history.future.length === 0) {
      get().setIsRedoable(false);
    }
    if (get().history.past.length > 0) {
      get().setIsUndoable(true);
    }
    

    console.log("history-redo",get().history)

  },

  addElement: (type: ElementType) => {
    
    const newElement: Element = {
      id: `${type}-${nanoid(4)}`,
      type: type,
      text: type === "text" ? "Double click to edit" : "",
      visible:true,
      locked:false,
      isParametrized:false,
      contentEditable:false,
      style: {
        position: "absolute",
        display: 'flex',
        left: "50%",
        top: "50%",
        border: 'none',
        resize: 'none',
        overflow: 'visible',
        cursor: 'move',
        backgroundSize: 'contain',
        background: type === 'text' ? 'transparent' : 'green',
        color:'rgba(200,200,200,1)',
        width: type === 'text' ? 'auto' : '10%',
        height: type === 'text' ? 'auto' : '20%',
        padding:type==='text'?'24px':"0px",
        fontSize: (Math.random()*80+10) +'px',
        fontWeight:(Math.random()*900),
        fontFamily: 'Arial'
      }
    };
    get().setElements([...get().elements, newElement]);
    // get().setSelectedElement(newElement);
    // get().recordChange();

    return newElement;
  },

  recordChange: () => {
    const { isRecordable, elements, history } = get();
    if (history.past.length > 0) {
      get().setIsUndoable(true);
    }
    if (history.future.length > 0) {
      get().setIsRedoable(true);
    }
    if (isRecordable) {
      set((state) => ({
        history: {
          past: [...state.history.past, elements],
          future: [],
        },
      }));

      if (get().history.past.length > 0) {
        get().setIsUndoable(true);
      }
    }
  },

  zoomFactor:1,
  setZoomFactor(factor) {
    set({
      zoomFactor:factor
    })
  },


}));

const useSheetStore = create<SheetState>((set, get) => ({
  isSheetOpen: false,
  setSheetOpen: (value: boolean) => set({ isSheetOpen: value }),
  sheetContent: initialSheetState,
  setSheetContent: (content: React.ReactNode) => set({ sheetContent: content })
}));

export const CanvasSelector = (state: CanvasState) => ({
  elements: state.elements,
  setElements: state.setElements,
  createElement: state.createElement,
  addElement: state.addElement,
  getElement: state.getElement,
  selectedElement: state.selectedElement,
  setSelectedElement: state.setSelectedElement,
  isRecordable: state.isRecordable,
  setIsRecordable: state.setIsRecordable,
  isUndoable: state.isUndoable,
  isRedoable: state.isRedoable,
  setIsUndoable: state.setIsUndoable,
  setIsRedoable: state.setIsRedoable,
  undo: state.undo,
  redo: state.redo,
  history: state.history,
  recordChange: state.recordChange,
  zoomfactor:state.zoomFactor,
  setZoomFactor:state.setZoomFactor

});

export const SheetSelector = (state: SheetState) => ({
  isSheetOpen: state.isSheetOpen,
  setSheetOpen: state.setSheetOpen,
  sheetContent: state.sheetContent,
  setSheetContent: state.setSheetContent
});

export { useCanvasStore, useSheetStore };
