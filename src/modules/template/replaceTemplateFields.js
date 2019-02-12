import fieldCodes from './legalCodes';
import { claimIsAre, claimOrClaims } from './claimsFields';
const { legalCodes, keys, defaultValue } = fieldCodes;

const replaceTemplateFields = (template, values) => {
    // assumes valid field codes and template syntax
    template = replaceClaimsFields(template, values.claims);
    template = replaceNonClaimsFields(template, values);
    return template;
};

const replaceClaimsFields = (template, claims) => {
    claims = claims || defaultValue;
    template = template.replace(
        new RegExp(/{claim\(s\)}/, 'g'), 
        claimOrClaims(claims)
    );
    template = template.replace(
        new RegExp(/{claim\(s\)is\/are}/, 'g'), 
        claimIsAre(claims)
    );
    return template;
};

const replaceNonClaimsFields = (template, values) => {
    for (let i = 0; i < legalCodes.length; i++) {
        let reg = new RegExp(`{${legalCodes[i]}}`, 'g');
        let replacement = values[keys[i]] ? values[keys[i]] : defaultValue;
        template = template.replace(reg, replacement);
    }
    return template;
};

export default replaceTemplateFields;