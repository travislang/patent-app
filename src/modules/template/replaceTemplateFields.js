const replaceTemplateFields = (template, codes, values) => {
    // assumes valid field codes and template syntax
    let temp = '';
    for (let i = 0; i < fieldCodes.length; i++) {
        let reg = new RegExp(codes[i], 'g');
        template = template.replace(reg, values[i])
    }
    return template;
};

export default replaceTemplateFields;