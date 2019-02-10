import fieldCodes from './legalCodes';
const { legalCodes, keys, defaultValue, claimCodes } = fieldCodes;

const replaceTemplateFields = (template, values) => {
    // assumes valid field codes and template syntax
    let temp = '';
    for (let i = 0; i < legalCodes.length; i++) {
        let reg = new RegExp(`{${legalCodes[i]}}`, 'g');
        let replacement = values[keys[i]] ? values[keys[i]] : defaultValue;
        template = template.replace(reg, replacement);
    }
    return template;
};

const replaceClaimsFields = (template, claims) => {
    let temp = '';
    for (let i = 0; i < claimCodes.length; i++) {
        let reg = new RegExp(`{${claimCodes[i]}}`, 'g');
        let replacement = values[keys[i]] ? values[keys[i]] : defaultValue;
        template = template.replace(reg, replacement);
    }
    return template;
};

const replaceNonClaimsFields = (template, values) => {
    let temp = '';
    for (let i = 0; i < legalCodes.length; i++) {
        let reg = new RegExp(`{${legalCodes[i]}}`, 'g');
        let replacement = values[keys[i]] ? values[keys[i]] : defaultValue;
        template = template.replace(reg, replacement);
    }
    return template;
};

export default replaceTemplateFields;