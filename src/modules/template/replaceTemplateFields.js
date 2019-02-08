import fieldCodes from './legalCodes';
const { legalCodes, keys, defaultValue } = fieldCodes;

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

export default replaceTemplateFields;