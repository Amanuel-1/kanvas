export function getRotationAngle(transform:string) {
    // Regular expression to match the rotate function and capture the angle
    const rotateRegex = /rotate\(([-+]?[0-9]*\.?[0-9]+)deg\)/;
    const match = transform.match(rotateRegex);

    // If a match is found, extract the angle value, otherwise return null
    if (match) {
        return parseFloat(match[1]);
    } else {
        return null;
    }
}

// Example usage
const transform = 'translate(196px, 152px) rotate(88.3597deg)';
const rotationAngle = getRotationAngle(transform);

console.log(rotationAngle); // Output: 88.3597


export function getTranslationValues(transform:string) {
    // Regular expression to match the translate function and capture the x and y values
    const translateRegex = /translate\(([-+]?[0-9]*\.?[0-9]+)(px)?,\s*([-+]?[0-9]*\.?[0-9]+)(px)?\)/;
    const translateXRegex = /translateX\(([-+]?[0-9]*\.?[0-9]+)(px)?\)/;
    const translateYRegex = /translateY\(([-+]?[0-9]*\.?[0-9]+)(px)?\)/;

    const match = transform.match(translateRegex);
    const matchX = transform.match(translateXRegex);
    const matchY = transform.match(translateYRegex);

    let x = 0;
    let y = 0;

    if (match) {
        x = parseFloat(match[1]);
        y = parseFloat(match[3]);
    } else {
        if (matchX) {
            x = parseFloat(matchX[1]);
        }
        if (matchY) {
            y = parseFloat(matchY[1]);
        }
    }

    return { x, y };
}

// Example usage
const transform1 = 'translate(196px, 152px) rotate(88.3597deg)';
const transform2 = 'translateX(196px) translateY(152px) rotate(88.3597deg)';
const transform3 = 'translateX(196px) rotate(88.3597deg)';

const translation1 = getTranslationValues(transform1);
const translation2 = getTranslationValues(transform2);
const translation3 = getTranslationValues(transform3);

console.log(translation1); // Output: { x: 196, y: 152 }
console.log(translation2); // Output: { x: 196, y: 152 }
console.log(translation3); // Output: { x: 196, y: 0 }


export const getRotationAngleInDegrees = (dist:any) => {
    // Assuming dist is a single number representing rotation in radians
    const angleInRadians = dist;
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
  };
  