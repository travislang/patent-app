import fieldCodes from './legalCodes';
const { legalCodes, keys } = fieldCodes;

const replaceTemplateFields = (template, values) => {
    // assumes valid field codes and template syntax
    let temp = '';
    for (let i = 0; i < legalCodes.length; i++) {
        let reg = new RegExp(`{${legalCodes[i]}}`, 'g');
        template = template.replace(reg, values[keys[i]]);
    }
    return template;
};

export default replaceTemplateFields;