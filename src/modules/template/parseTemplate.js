import { open } from "inspector";

const templateIsLegal = (template) => {
    if (!template || template === '') {
        console.error('Template is null, undefined, or empty');
        return false;
    }
    if (!template.includes('{') && !template.includes('}')) {
        return true;
    }
    // check for matching brackets
    let openBracketFound = false;
    for (let ch of template.split('')) {
        if (openBracketFound) {
            if (ch === '{') {
                console.error('Nested brackets not allowed in template');
                return false;
            } else if (ch === '}') {
                openBracketFound = false;
            }
        } else { // openBracketFound === false
            if (ch === '{') {
                openBracketFound = true;
            } else if (ch === '}') {
                console.error('Closing bracket found without opening bracket.')
                return false;
            }
        }
    }
    return true;
}

export default templateIsLegal;