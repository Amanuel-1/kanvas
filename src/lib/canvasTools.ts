import { useCanvasStore } from "@/app/lib/store/canvasStore";
import { Element } from "@/types/canvasTypes";
import {nanoid} from 'nanoid'


export function DeleteElement(elementId: string) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();

    const newElements = elements.filter((el) => el.id !== elementId);
    setElements(newElements);
    recordChange();
}

export function CopyElementProperties(element: Element) {
    if (element && element.style) {
        
        navigator.clipboard.writeText(JSON.stringify(element.style)).then(() => {
            alert("Element properties copied to clipboard");
        }).catch(err => console.error("Failed to copy properties:", err));
    }
}

export function PasteElementProperties(element: Element) {
    //paste all the properties except positional properties of the copied element , 

    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();
      alert(JSON.stringify(element.style))

    navigator.clipboard.readText().then((text) => {
        try {
            const elementProperties = JSON.parse(text);
            const newElements = elements.map((el) =>
                el.id === element.id ? {
                     ...el, 
                     style:{
                        ...elementProperties,
                        top:element.style.top,
                        left:element.style.left
                     } } : el
            );
            setElements(newElements);
            recordChange();
        } catch (err) {
            console.error("Failed to paste properties:", err);
        }
    });
}

export function CopyElement(element: Element) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();

    navigator.clipboard.writeText(JSON.stringify(element)).catch(err =>
        console.error("Failed to copy element:", err)
    );
}

export function PasteElement(element: Element) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();
    navigator.clipboard.readText().then((text) => {
        try {
            const newElement = JSON.parse(text) as Element;
            newElement.id = `${element.type}-${nanoid(4)}`;
            setElements([...elements, newElement]);
            recordChange();
        } catch (err) {
            console.error("Failed to paste element:", err);
        }
    });
}


// TODO: Implement CutElement, DuplicateElement, BringToFront, SendToBack, BringForward, SendBackward
export function CutElement(element: Element) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();
    navigator.clipboard.writeText(JSON.stringify(element)).catch(err =>
        console.error("Failed to cut element:", err)
    );
    const newElements = elements.filter((el) => el.id !== element.id);
    setElements(newElements);
    recordChange();
}

export function DuplicateElement(element: Element) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();
    const newElement = { ...element, id: nanoid() };
    setElements([...elements, newElement]);
    recordChange();
    setSelectedElement(newElement)
}

export function BringForward(element: Element) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();
    const newElements =[...elements]
    const index =elements.findIndex((el) => el.id === element.id);
    if(index<elements.length-1){
        [newElements[index],newElements[index+1]]=[newElements[index+1],newElements[index]];
    }

    
    setElements(newElements);
    recordChange();
}


export function SendBackward(element: Element) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();
    const newElements =[...elements]
    const index =elements.findIndex((el) => el.id === element.id);
    if(index>1){
        [newElements[index],newElements[index-1]]=[newElements[index-1],newElements[index]];
    }
    setElements(newElements);
    recordChange();
}

export function BringToFront(element: Element) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();
    const newElements = elements.filter((el) => el.id !== element.id);
    setElements([...newElements, element]);
    recordChange();
}

export function SendToBack(element: Element) {
    const {
        elements,
        setElements,
        selectedElement,
        setSelectedElement,
        recordChange,
      } = useCanvasStore.getState();
    // the new set of elements excluding the current element and the main frame
    const newElements = elements.filter((el,ind) => (el.id !== element.id) && (ind!=0));
    
    setElements([elements[0],element,...newElements]);
    recordChange();
}





//##########################33 shapes control tools ####################
