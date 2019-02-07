import fieldCodes from './legalCodes';
const { legalCodes } = fieldCodes;

const templateIsLegal = (template) => {
    return (
        templateNotEmpty(template) 
        && bracketsMatch(template)
        && fieldCodesLegal(template)
    );
}

const templateNotEmpty = (template) => {
    if (!template || template === '') {
        console.error('Template is null, undefined, or empty');
        return false;
    } else {
        return true;
    }
}

const bracketsMatch = (template) => {
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

const fieldCodesLegal = (template) => {
    // routine assumes that template has been checked for matching brackets
    let currentPosition = 0;
    let start = 0;
    while (template.indexOf('{', currentPosition) !== -1 ) {
        start = template.indexOf('{', currentPosition);
        currentPosition = template.indexOf('}', start);
        let codeFound = template.slice(start+1, currentPosition);
        if (!isLegalCode(codeFound, legalCodes) ) {
            console.error('Not a legal field code:', codeFound);
            return false;
        }
    }
    return true;
}

const isLegalCode = (code, codes) => {
    return codes.includes(code);
};

export default templateIsLegal;