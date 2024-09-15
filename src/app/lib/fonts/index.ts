
// const sketch = require('./sketch.ttf');
export  const loadFonts   = async ()=>{
return [
   
  
    {
        name: 'Sketch',
        data:  await fetch(
            new URL("/public/Sketch.ttf", import.meta.url)),
        style: 'normal',
    }
]
} 