import fieldCodes from './legalCodes';
const { legalCodes, keys } = fieldCodes;

const replaceTemplateFields = (template, values) => {
    // assumes valid field codes and template syntax
    let temp = '';
    for (let i = 0; i < legalCodes.length; i++) {
        let reg = new RegExp(`{${legalCodes[i]}}`, 'g');
        console.log('field is:', legalCodes[i]);
        console.log('key is:', keys[i]);
        console.log('value is:', values[keys[i]]);
        template = template.replace(reg, values[keys[i]]);
    }
    return template;
};

export default replaceTemplateFields;